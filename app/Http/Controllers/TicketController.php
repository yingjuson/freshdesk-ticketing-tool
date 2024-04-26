<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Ticket;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
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
        $payload = $request->validated();
        $user = Auth::user();

        $client = new Client([
            'base_uri' => "https://" . env('FRESHDESK_DOMAIN') . ".freshdesk.com/api/v2/",
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode(env('FRESHDESK_API_KEY') . ':X'),
                'Content-Type' => 'multipart/form-data',
                'Accept' => 'application/json',
            ]
        ]);

        DB::beginTransaction();

        try {
            $attachments = [];
            $freshdeskAttachments = [];

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $attachment) {
                    // store files in the database
                    // $ticket->attachments()->create([
                    //     // 'filename' => $attachment->store('attachments', 'public'),
                    //     'filename' => $attachment->getClientOriginalName(),
                    //     'mime_type' => $attachment->getClientMimeType(),
                    //     'file_dir' => $attachment->store('public_attachments', 'public'),
                    // ]);

                    $attachments[] = [
                        // 'filename' => $attachment->store('attachments', 'public'),
                        'filename' => $attachment->getClientOriginalName(),
                        'mime_type' => $attachment->getClientMimeType(),
                        // 'file_dir' => $attachment->store('public'),
                        'file_dir' => '',
                    ];

                    $freshdeskAttachments[] = [
                        'file_name' => $attachment->getClientOriginalName(),
                        'file' => file_get_contents($attachment->getRealPath()),
                    ];
                }
            }

            $custom_fields = [
                'portal type' => $request->input('portal_type'),
                'role' => $request->input('webtool_role')
            ];

            $description = '';

            foreach ($payload as $key => $value) {
                if ($key != 'attachments' && !!$value) {
                    $new_value = $value;
                    $new_key = str_replace(' ', '_', $key);

                    if ($key == 'concern_type') {
                        $new_value = ucwords(str_replace(' ', '_', $value));
                    }

                    $description .= '<b>' . $new_key . '</b>: ' . $new_value . "<br />";
                }
            }

            $description .= "<br /><br />-- additional details --<br /><br />" . $request->input('issue_details');

            // Prepare ticket data
            $freshdeskTicketData = [
                'subject' => $request->input('subject'),
                'description' => $description,
                'attachments' => $freshdeskAttachments,
                'email' => $user->email,
                "priority" => 1,
                "status" => 2,
            ];

            // Send request
            $response = $client->post('tickets', [
                'multipart' => $this->buildMultipartData($freshdeskTicketData),
            ]);

            if ($response->getStatusCode() === 201) {
                $responseData = json_decode($response->getBody(), true);
                // create Ticket here with Freshdesk Ticket number
                $payload['freshdesk_ticket_number'] = $responseData['id'];
                $payload['created_by'] = $user->id;
                $ticket = Ticket::create($payload);

                $ticket->attachments()->createMany($attachments);
                
                DB::commit();

                return Redirect::route('tickets.index');
            } else {
                throw new \Exception();
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'create' => "An error occurred while performing this request."
            ]);
        }
    }

    private function buildMultipartData(array $data)
    {
        $multipart = [];

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $item) {
                    $multipart[] = [
                        'name' => $key . '[]',
                        'contents' => $item['file'],
                        'filename' => $item['file_name']
                    ];
                }
            } else {
                $multipart[] = [
                    'name' => $key,
                    'contents' => $value
                ];
            }
        }

        return $multipart;
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
    public function update(StoreTicketRequest $request, Ticket $ticket)
    {
        try {
            $ticket->update($request->validated());

            return Redirect::route('tickets.show', [
                'ticket' => $ticket
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'create' => "An error occurred while updating the ticket."
            ]);
        }

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        // just change the status to closed or cancelled.
    }
}
