<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Ticket;

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

        $closed_tickets_this_week = Ticket::query()
            ->whereDate('created_at', '>=', $weekStartDate)
            ->whereDate('created_at', '<=', $weekEndDate)
            ->count();

        $ongoing_tickets = Ticket::where('status', 'in progress')->count();

        $unassigned_tickets = Ticket::whereNull('assignee_id')->count();

        return Inertia::render('ticket/index', [
            'newTicketsThisWeek'    => $new_tickets_this_week,
            'closedTicketsThisWeek' => $new_tickets_this_week,
            'ongoingTickets'        => $ongoing_tickets,
            'unassignedTickets'     => $unassigned_tickets,
        ]);
    }
}
