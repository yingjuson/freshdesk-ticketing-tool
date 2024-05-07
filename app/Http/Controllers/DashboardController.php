<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Ticket;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function index() {
        $now = Carbon::now();
        $weekStartDate = $now->startOfWeek()->format('Y-m-d H:i');
        $weekEndDate = $now->endOfWeek()->format('Y-m-d H:i');

        $new_tickets_this_week = Ticket::query()
            ->whereDate('created_at', '>=', $weekStartDate)
            ->whereDate('created_at', '<=', $weekEndDate)
            ->count();

        $resolved_tickets_this_week = Ticket::where('status', 'resolved')
            ->whereDate('closed_at', '>=', $weekStartDate)
            ->whereDate('closed_at', '<=', $weekEndDate)
            ->count();

        $pending_tickets = Ticket::where('status', 'pending')->count();

        $unassigned_tickets = Ticket::whereNull('assignee_id')->count();

        return Inertia::render('dashboard', [
            'newTicketsThisWeek'        => $new_tickets_this_week,
            'resolvedTicketsThisWeek'   => $resolved_tickets_this_week,
            'pendingTickets'            => $pending_tickets,
            'unassignedTickets'         => $unassigned_tickets,
        ]);
    }

    public function test_tickets(Request $request)
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
}
