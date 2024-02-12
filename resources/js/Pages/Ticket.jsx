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
import GpoAppServiceConcernForm from "./Ticket/Forms/GpoAppServiceConcernForm";
import WebtoolConcernForm from "./Ticket/Forms/WebtoolConcernForm";
import ReportsConcernForm from "./Ticket/Forms/ReportsConcernForm";

import { useToast } from "@/Components/ui/use-toast";
import { DataTable } from "@/Components/custom/data-table";
import { columns } from "@/Components/tickets-table-columns";

import { Badge } from "@/components/ui/badge";
import NonGpoServiceConcernForm from "./Ticket/Forms/NonGpoServiceConcernForm";
import DataRequestConcernForm from "./Ticket/Forms/DataRequestConcernForm";

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
        device_type: "",
        device_model: "",
        gpadala_ref_number: "",
        transaction_amount: "",
        transaction_datetime: "",
        // status: "backlog",
        created_by: "",
        assignee_id: "",

        webtool_role: "",
        portal_type: "",

        report_type: "",
        report_date: "",
        gpo_id: "",
        partner_ref_number: "",
        transaction_id: "",
        msisdn: "",

        media: [],
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
            case "gpo_app_service":
                return <GpoAppServiceConcernForm {...ticketForm} />;
            case "gpo_onboarding":
            case "gpo_connection":
                return (
                    <NonGpoServiceConcernForm
                        {...ticketForm}
                        concern={selectedConcern}
                    />
                );
            case "webtool":
                return <WebtoolConcernForm {...ticketForm} />;
            case "inaccessible_report":
            case "gpo_service_variance":
            case "additional_recipient":
                return <ReportsConcernForm {...ticketForm} />;
            case "data_request":
                return <DataRequestConcernForm {...ticketForm} />;
        }
    };

    const getBadge = () => {
        switch (selectedConcern) {
            case "gpo_app_service":
                return <Badge className="m-0">GPO App Service</Badge>;
            case "gpo_onboarding":
                return <Badge className="m-0">GPO Onboarding</Badge>;
            case "gpo_connection":
                return <Badge className="m-0">GPO Connection</Badge>;
            case "webtool":
                return (
                    <Badge className="m-0" variant="fuchsia">
                        Webtool
                    </Badge>
                );
            case "inaccessible_report":
                return (
                    <Badge className="m-0" variant="success">
                        Inaccessible Report
                    </Badge>
                );
            case "gpo_service_variance":
                return (
                    <Badge className="m-0" variant="success">
                        GPO Service Variance
                    </Badge>
                );
            case "additional_recipient":
                return (
                    <Badge className="m-0" variant="success">
                        Additional Recipient
                    </Badge>
                );
            case "data_request":
                return (
                    <Badge className="m-0" variant="amber">
                        Data Request
                    </Badge>
                );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            //         Ticket
            //     </h2>
            // }
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
                                        className="w-30"
                                        onClick={handleConcernClick}
                                    >
                                        <DropdownMenuLabel disabled>
                                            GPO App
                                        </DropdownMenuLabel>
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem value="gpo_app_service">
                                                Services
                                            </DropdownMenuItem>
                                            <DropdownMenuItem value="gpo_onboarding">
                                                Onboarding
                                            </DropdownMenuItem>
                                            <DropdownMenuItem value="gpo_connection">
                                                Connection
                                            </DropdownMenuItem>
                                            {/* <DropdownMenuItem value="reports">
                                                Reports
                                            </DropdownMenuItem> */}
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel disabled>
                                            Webtool
                                        </DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem value="webtool">
                                                Webtool
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel disabled>
                                            Reports
                                        </DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem value="inaccessible_report">
                                                Inaccessible Report
                                            </DropdownMenuItem>
                                            <DropdownMenuItem value="gpo_service_variance">
                                                GPO Service Variance
                                            </DropdownMenuItem>
                                            <DropdownMenuItem value="additional_recipient">
                                                Additional Recipient
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel disabled>
                                            Others
                                        </DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem value="data_request">
                                                Data Request
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogPortal>
                                    <DialogContent className="sm:max-w-[825px] p-4 h-[85vh]">
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
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    disabled={
                                                        ticketForm.processing
                                                    }
                                                    onClick={handleModalClose}
                                                >
                                                    Cancel
                                                </Button>
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

                            <div className="container mx-auto">
                                <DataTable
                                    columns={columns}
                                    data={tickets.data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
