<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use Illuminate\Http\Request;
use App\Models\Ticket;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $tickets = Ticket::orderBy("created_at", 'desc')->get();
        $tickets = Ticket::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Ticket', [
          'tickets' => $tickets
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $payload = $request->validated();
        $user = Auth::user();

        try {
            $payload['created_by'] = $user->id;
            
            Ticket::create($payload);
        } catch (\Exception $e) {
            dd($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
