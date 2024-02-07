import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import { format } from "date-fns";
import { useState } from "react";
import { DialogPortal } from "@radix-ui/react-dialog";
import GpoAppConcernForm from "./Ticket/Forms/GpoAppConcernForm";
import WebtoolConcernForm from "./Ticket/Forms/WebtoolConcernForm";
import ReportsConcernForm from "./Ticket/Forms/ReportsConcernForm";

import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/Components/custom/data-table";
import { columns } from "@/Components/tickets-table-columns";

import { Badge } from "@/components/ui/badge";

const sampleData = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "asd@example.com",
    },
    {
        id: "728ed522",
        amount: 100,
        status: "pending",
        email: "zxc@example.com",
    },
    {
        id: "728ed33f",
        amount: 100,
        status: "completed",
        email: "aas@example.com",
    },
    {
        id: "728edw3f",
        amount: 1040,
        status: "backlog",
        email: "cca@example.com",
    },
    {
        id: "724222f",
        amount: 10230,
        status: "closed",
        email: "asqw@example.com",
    },
    {
        id: "728edzz2f",
        amount: 100,
        status: "pending",
        email: "ggre@example.com",
    },

    {
        id: "728edw3f",
        amount: 1040,
        status: "backlog",
        email: "xw@example.com",
    },
    {
        id: "724222f",
        amount: 10230,
        status: "closed",
        email: "fgnfghn@example.com",
    },
    {
        id: "728edzz2f",
        amount: 100,
        status: "pending",
        email: "ghjghj@example.com",
    },

    {
        id: "728edw3f",
        amount: 1040,
        status: "backlog",
        email: "aqwwe@example.com",
    },
    {
        id: "724222f",
        amount: 10230,
        status: "closed",
        email: "asqwerw@example.com",
    },
    {
        id: "728edzz2f",
        amount: 100,
        status: "pending",
        email: "ttt@example.com",
    },
];

export default function Ticket({ auth }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedConcern, setSlectedConcern] = useState(null);

    const tickets = usePage().props.tickets;

    console.log({ tickets });

    const { toast } = useToast();

    const ticketForm = useForm({
        concern_type: selectedConcern,
        service_type: "",
        other_service: "",
        issue_details: "",
        customer_mobile_number: "",
        gpo_mobile_number: "",
        biller_name: "",
        biller_ref_number: "",
        gpadala_ref_number: "",
        transaction_amount: "",
        transaction_datetime: "",
        status: "backlog",
        created_by: "",
        assigned_by: "",
        assignee_id: "",

        role: "",
        portal_type: "",

        report_type: "",
        email_subject: "",
        report_date: "",
        gpo_id: "",
        partner_ref_number: "",
        transaction_id: "",
        msisdn: "",
    });

    const handleModalClose = () => {
        setIsDialogOpen(false);
        ticketForm.reset();
        ticketForm.clearErrors();
    };

    const handleConcernClick = (e) => {
        const concernType = e.target.attributes.value?.value;

        if (!concernType) {
            return;
        }

        setSlectedConcern(concernType);
        ticketForm.setData("concern_type", concernType);
        setIsDialogOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();

        ticketForm.post(route("tickets.store"), {
            onSuccess: () => {
                handleModalClose();
                toast({
                    title: "Success!",
                    description: "Ticket has been created.",
                    variant: "success",
                });
            },
        });
    };

    const getForm = () => {
        switch (selectedConcern) {
            case "gpo_app":
                return <GpoAppConcernForm {...ticketForm} />;
            case "webtool":
                return <WebtoolConcernForm {...ticketForm} />;
            case "reports":
                return <ReportsConcernForm {...ticketForm} />;
        }
    };

    const getBadge = () => {
        switch (selectedConcern) {
            case "gpo_app":
                return <Badge className="m-0">GPO App</Badge>;
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
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket
                </h2>
            }
        >
            <Head title="Ticket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                className="absolute right-[20px]"
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button>New Ticket</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-20 text-center"
                                        onClick={handleConcernClick}
                                    >
                                        <DropdownMenuLabel disabled>
                                            Concern
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                value="gpo_app"
                                                className="justify-center"
                                            >
                                                GPO App
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                value="webtool"
                                                className="justify-center"
                                            >
                                                Webtool
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                value="reports"
                                                className="justify-center"
                                            >
                                                Reports
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogPortal className="h-[90vh]">
                                    <DialogContent className="sm:max-w-[825px] p-4  min-h-[55vh] max-h-[85vh]">
                                        <form onSubmit={submit}>
                                            <DialogHeader>
                                                <DialogTitle className="flex flex-row items-center gap-2">
                                                    Create new ticket
                                                    {getBadge()}
                                                </DialogTitle>
                                            </DialogHeader>

                                            <ScrollArea className="h-5/6 my-2">
                                                <div className="ml-1 mr-3">
                                                    {getForm()}
                                                </div>
                                            </ScrollArea>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={
                                                            handleModalClose
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        ticketForm.processing
                                                    }
                                                >
                                                    Submit
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </DialogPortal>
                            </Dialog>

                            <div className="container mx-auto py-10">
                                <DataTable
                                    columns={columns}
                                    // data={sampleData}
                                    data={tickets}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
