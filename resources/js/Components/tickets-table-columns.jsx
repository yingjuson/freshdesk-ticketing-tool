import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

import { Link } from "@inertiajs/react";
import { getConcernTypeBadge, getStatusBadge } from "@/utils/component-utils";

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const ticketId = row.getValue("id");

            return (
                <Link
                    href={route("tickets.show", { id: ticketId })}
                    className="text-blue-500"
                >{`#${ticketId}`}</Link>
            );
        },
    },
    {
        accessorKey: "freshdesk_ticket_number",
        header: "Freshdesk ticket",
        cell: ({ row }) => {
            const fdTicketNumber = row.getValue("freshdesk_ticket_number");
            return (
                <a
                    className="text-blue-500"
                    href={`https://j6w.freshdesk.com/a/tickets/${fdTicketNumber}`}
                    target="_blank"
                >
                    {fdTicketNumber}
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
        accessorKey: "concern_type",
        header: "Concern",
        style: { textAlign: "center" }, // TO DO: set min width
        cell: ({ row }) => (
            <div className="min-w-40">
                {getConcernTypeBadge(row.getValue("concern_type"))}
            </div>
        ),
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
            <div className="w-64">
                <p
                    className="text-ellipsis overflow-hidden"
                    style={{ whiteSpace: "nowrap" }}
                >
                    {row.getValue("subject")}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "assigned_to",
        header: "Assigned to",
    },

    {
        accessorKey: "creator",
        header: "Created by",
        cell: ({ row }) => {
            const creator = row.getValue("creator");
            return <div>{`${creator.first_name} ${creator.last_name}`}</div>;
        },
    },

    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "desc")
                    }
                >
                    Creation date
                    <ArrowUpDown className="ml-2" size={14} />
                </Button>
            );
        },
        cell: ({ row }) => {
            const rowDate = row.getValue("created_at");
            return (
                <div className="text-center">
                    {format(new Date(rowDate), "yyyy-MM-dd")}
                </div>
            );
        },
    },

    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const payment = row.original;

    // return (
    //     <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //                 <span className="sr-only">Open menu</span>
    //                 <MoreHorizontal className="h-4 w-4" />
    //             </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //             <DropdownMenuLabel className="text-center">
    //                 Actions
    //             </DropdownMenuLabel>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem
    //                 onClick={() =>
    //                     navigator.clipboard.writeText(payment.id)
    //                 }
    //             >
    //                 View
    //             </DropdownMenuItem>
    //             <DropdownMenuItem>Edit</DropdownMenuItem>
    //         </DropdownMenuContent>
    //     </DropdownMenu>
    // );
    //     },
    // },
];
