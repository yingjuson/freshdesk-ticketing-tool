import React, { useState } from "react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, useForm, usePage } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "@/components/custom/tickets-table-columns";

import { CreateTicketDialog } from "./create-ticket-dialog";
import { GROUPED_CONCERN_TYPES } from "@/constants/concern-type-constants";

export default function TicketIndex({ auth }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedConcern, setSlectedConcern] = useState(null);

    const tickets = usePage().props.tickets;

    const ticketForm = useForm({
        concern_type: selectedConcern,
        service_type: "",
        subject: "",
        issue_details: "",
        customer_mobile_number: "",
        gpo_mobile_number: "",
        biller_name: "",
        biller_ref_number: "",
        device_type: "",
        device_model: "",
        device_os_version: "",
        gpadala_ref_number: "",
        transaction_amount: "",
        transaction_datetime: "",
        created_by: "",
        assignee_id: "",

        webtool_role: "",
        portal_type: "",

        report_type: "",
        report_date: "",
        gpo_id: "",
        ext_transaction_id: "",

        reference_number: "",

        attachments: [],
    });

    const handleConcernClick = (e) => {
        const concernType = e.target.attributes.value?.value;

        if (!concernType) return;

        setSlectedConcern(concernType);
        ticketForm.setData("concern_type", concernType);
        setIsDialogOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ticket" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-scroll shadow-sm sm:rounded-lg">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>New Ticket</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48"
                                align="start"
                                onClick={handleConcernClick}
                            >
                                <ScrollArea className="h-72">
                                    {Object.keys(GROUPED_CONCERN_TYPES).map(
                                        (group) => (
                                            <React.Fragment key={group}>
                                                <DropdownMenuLabel disabled>
                                                    {group}
                                                </DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    {GROUPED_CONCERN_TYPES[
                                                        group
                                                    ].map((item) => (
                                                        <DropdownMenuItem
                                                            key={item.key}
                                                            value={item.key}
                                                        >
                                                            {item.value}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                            </React.Fragment>
                                        )
                                    )}
                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DataTable columns={columns} {...tickets} />

                        {isDialogOpen && (
                            <CreateTicketDialog
                                isOpen={isDialogOpen}
                                setIsOpen={setIsDialogOpen}
                                selectedConcern={selectedConcern}
                                {...ticketForm}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
