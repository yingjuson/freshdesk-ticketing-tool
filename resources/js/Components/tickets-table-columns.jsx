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

export const columns = [
    {
        accessorKey: "id",
        header: "Ticket number",
        cell: ({ row }) => {
            return (
                <a href="#" className="font-bold">
                    {`#0000${row.getValue("id")}`}
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "concern_type",
        header: "Concern",
        style: { textAlign: "center" },
        cell: ({ row }) => {
            const concernType = row.getValue("concern_type");
            switch (concernType) {
                case "gpo_app_service":
                    return <Badge className="m-0">GPO App Service</Badge>;
                case "webtool":
                    return (
                        <Badge className="m-0" variant="fuchsia">
                            Webtool
                        </Badge>
                    );
                case "reports":
                    return (
                        <Badge className="m-0" variant="success">
                            Reports
                        </Badge>
                    );
            }
        },
    },
    {
        accessorKey: "freshdesk_ticket_number",
        header: "Freshdesk ticket",
    },
    {
        accessorKey: "assigned_to",
        header: "Assigned to",
    },

    {
        accessorKey: "deadline",
        header: "Deadline",
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
            return <div>{format(new Date(rowDate), "yyyy-MM-dd")}</div>;
        },
    },

    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const payment = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel className="text-center">
    //                         Actions
    //                     </DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(payment.id)
    //                         }
    //                     >
    //                         View
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];
