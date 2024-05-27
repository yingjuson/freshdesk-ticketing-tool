<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Ticket;
use GuzzleHttp\Client;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Attachment;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class TicketController extends Controller
{
    protected $ticketService;
    protected $freshdeskClient;

    const PRIORITY = [
        'low'       => 1,
        'medium'    => 2,
        'high'      => 3,
        'urgent'    => 4,
    ];

    const STATUS = [
        'open'      => 2,
        'pending'   => 3,
        'resolved'  => 4,
        'closed'    => 5,
    ];

    public function __construct(TicketService $ticketService)
    {
        $this->freshdeskClient = new Client([
            'base_uri' => "https://" . env('FRESHDESK_DOMAIN') . ".freshdesk.com/api/v2/",
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode(env('FRESHDESK_API_KEY') . ':X'),
                'Content-Type' => 'multipart/form-data',
                'Accept' => 'application/json',
            ]
        ]);

        $this->ticketService = $ticketService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tickets = Ticket::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('subject', 'like', '%' . $search . '%')
                ->orWhere('concern_type', 'like', '%' . $search . '%')
                ->orWhere('id', 'like', '%' . $search . '%');
            })
            ->with('creator')
            ->orderBy("created_at", 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('ticket/index', [
          'tickets' => $tickets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $user = Auth::user();
        $payload = $request->validated();

        DB::beginTransaction();

        try {
            $freshdeskAttachments = [];

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $attachment) {
                    $freshdeskAttachments[] = [
                        'file_name' => $attachment->getClientOriginalName(),
                        'file' => file_get_contents($attachment->getRealPath()),
                    ];
                }
            }

            $formattedDescription = $this->ticketService->formatDescription($payload);

            $freshdeskPayload = [
                'subject' => $request->input('subject'),
                'description' => $formattedDescription,
                'attachments' => $freshdeskAttachments,
                'email' => $user->email,
                "priority" => self::PRIORITY['low'],
                "status" => self::STATUS['open'],
            ];

            $attachments = [];

            // Send ticket creation request to Freshdesk
            $response = $this->freshdeskClient->post('tickets', [
                'multipart' => $this->ticketService->buildMultipartData($freshdeskPayload),
            ]);

            if ($response->getStatusCode() === Response::HTTP_CREATED) {
                $responseData = json_decode($response->getBody(), true);

                // keep a copy of the Freshdesk ticket number
                $payload['freshdesk_id'] = $responseData['id'];
                $payload['created_by'] = $user->id;

                $ticket = Ticket::create($payload);

                /**
                 * Instead of using our own S3 Bucket to store the same files as what we have uploaded
                 * to Freshdesk, let's just store the basic attachment details and keep a reference to
                 * the attachment uploaded to Freshdesk
                 */
                foreach ($responseData['attachments'] as $fdAttachment) {
                    $attachments[] = [
                        'freshdesk_id' => $fdAttachment['id'],
                        'name' => $fdAttachment['name'],
                        'size' => $fdAttachment['size'],
                        'content_type' => $fdAttachment['content_type'],
                        'attachment_url' => $fdAttachment['attachment_url'],
                    ];
                }

                $ticket->attachments()->createMany($attachments);
                
                DB::commit();

                return Redirect::route('tickets.index');
            } else {
                throw new \Exception();
            }
            
        } catch (\Exception $e) {
            dd($e->getMessage());
            DB::rollBack();
            return redirect()->back()->withErrors([
                'create' => "An error occurred while performing this request."
            ]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket->load('attachments');

        return Inertia::render('ticket/show', [
          'ticket' => $ticket
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        try {
            $validatedRequest = $request->validated();

            $new_attachments = [];
            $existing_attachments = [];
            
            DB::beginTransaction();

            if ($request->has('existing_attachments')) {
                $existing_attachments = $validatedRequest['existing_attachments'];
            }

            // handle new attachments (adding)
            if ($request->hasFile('new_attachments')) {
                foreach ($request->file('new_attachments') as $attachment) {
                    $new_attachments[] = [
                        'file_name' => $attachment->getClientOriginalName(),
                        'file' => file_get_contents($attachment->getRealPath()),
                    ];
                }
            }
            
            // handle removing/deleting of attachments from our database
            $attachment_ids_to_be_removed = $ticket->attachments()->pluck('id')->diff(collect($existing_attachments));

            // handle removing/deleting of attachments from Freshdesk
            $attachment_models_for_removal = Attachment::findMany($attachment_ids_to_be_removed);
            
            // dd($attachment_models_for_removal, $attachment_ids_to_be_removed);

            foreach ($attachment_models_for_removal as $attachment_model) {
                // dd('here');
                $response = $this->freshdeskClient->delete("attachments/{$attachment_model->freshdesk_id}");
                if ($response->getStatusCode() != Response::HTTP_NO_CONTENT) {
                    throw new \Exception("Failed to delete attachment id {$attachment_model->freshdesk_id} in Freshdesk");
                }
            }
            
            $ticket->attachments()->whereIn('id', $attachment_ids_to_be_removed)->delete();

            // dd($new_attachments, $existing_attachments);

            $freshdeskPayload = [
                'status' => self::STATUS[$validatedRequest['status']],
                'subject' => $validatedRequest['subject'],
                'description' => $this->ticketService->formatDescription($validatedRequest),
                'attachments' => $new_attachments // only pass the new attachments; this will be uploaded on top of the existing ones in Freshdesk
            ];

            if ($validatedRequest['status'] == 'resolved' || $validatedRequest['status'] == 'closed') {
                $validatedRequest['closed_at'] = now();
            } else {
                $validatedRequest['closed_at'] = NULL;
            }

            // send update ticket request to Freshdesk
            $response = $this->freshdeskClient->put('tickets/' . intval($ticket->freshdesk_id), [
                'multipart' => $this->ticketService->buildMultipartData($freshdeskPayload),
            ]);

            if ($response->getStatusCode() != Response::HTTP_OK) {
                throw new \Exception('Failed to update ticket in Freshdesk');
            }

            $responseData = json_decode($response->getBody(), true);

            $attachments = [];

            /**
             * Instead of using our own S3 Bucket to store the same files as what we have uploaded
             * to Freshdesk, let's just store the basic attachment details and keep a reference to
             * the attachment uploaded to Freshdesk
             */
            foreach ($responseData['attachments'] as $fdAttachment) {
                if (!Attachment::where('freshdesk_id', $fdAttachment['id'])->exists()) {
                    $attachments[] = [
                        'name' => $fdAttachment['name'],
                        'size' => $fdAttachment['size'],
                        'freshdesk_id' => $fdAttachment['id'],
                        'content_type' => $fdAttachment['content_type'],
                        'attachment_url' => $fdAttachment['attachment_url'],
                    ];
                }
            }

            $ticket->attachments()->createMany($attachments);

            $ticket->update($validatedRequest);
            
            DB::commit();

            return Redirect::route('tickets.show', [
                'ticket' => $ticket
            ]);

        } catch (\Exception $e) {
            dd($e->getMessage());   
            DB::rollBack();

            return redirect()->back()->withErrors([
                'update' => "An error occurred while updating the ticket."
            ]);
        }
    }
}
