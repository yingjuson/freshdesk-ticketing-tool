import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { getConcernTypeBadge } from "@/utils/component-utils";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import UpdateableFormField from "@/components/custom/updateable-form-field";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, MoreHorizontal } from "lucide-react";
import { FileDropzone } from "@/components/custom/file-dropzone";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ChevronLeft } from "lucide-react";
import GpoAppServiceForm from "./forms/gpo-app-service-form";
import { STATUS_COLORS } from "@/constants/status-constants";
import { GROUPED_CONCERN_TYPES } from "@/constants/concern-type-constants";
import NonGpoAppServiceForm from "./forms/non-gpo-app-service-form";
import WebtoolConcernForm from "./forms/webtool-concern-form";
import ReportsConcernForm from "./forms/reports-concern-form";
import OtherRequestForm from "./forms/other-request-form";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import TicketDetailsHeader from "./ticket-details-header";

export default function Show2({ auth }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { toast } = useToast();
    const ticket = usePage().props.ticket;

    let ticketCopy = { ...ticket };

    for (const key in ticketCopy) {
        if (ticketCopy[key] === null) {
            ticketCopy[key] = "";
        }
    }

    // const ticketUpdateForm = useForm({
    //     ...ticketCopy,
    //     transaction_datetime: ticketCopy.transaction_datetime
    //         ? format(
    //               new Date(ticketCopy.transaction_datetime),
    //               "yyyy-MM-dd HH:mm"
    //           )
    //         : "",
    // });

    // const {
    //     data,
    //     setData,
    //     errors,
    //     put,
    //     delete: destroy,
    //     clearErrors,
    //     transform,
    // } = ticketUpdateForm;

    const [files, setFiles] = useState(ticket.attachments || []);

    // transform((currentTicketData) => {
    //     if (files.length > 0) {
    //         return currentTicketData;
    //     }

    //     return { ...currentTicketData, attachments: [] };
    // });

    // TO DO: Add to utils
    // const getForm = () => {
    //     if (!data.concern_type) {
    //         return null;
    //     }

    //     // Determine the group of the selected concern
    //     const selectedGroup = Object.keys(GROUPED_CONCERN_TYPES).find((group) =>
    //         GROUPED_CONCERN_TYPES[group].some(
    //             (item) => item.key === data.concern_type
    //         )
    //     );

    //     switch (selectedGroup) {
    //         case "App":
    //             return <GpoAppServiceForm editMode {...ticketUpdateForm} />;
    //         case "App Onboarding":
    //         case "App Connection":
    //             return <NonGpoAppServiceForm editMode {...ticketUpdateForm} />;
    //         case "Webtool":
    //             return <WebtoolConcernForm editMode {...ticketUpdateForm} />;
    //         case "Reports":
    //             return <ReportsConcernForm editMode {...ticketUpdateForm} />;
    //         case "Others":
    //         default:
    //             return null;
    //     }
    // };

    // const updateTicket = (e) => {
    //     e.preventDefault();

    //     put(route("tickets.update", { ticket: ticket.id }), {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             // reset();
    //             toast({
    //                 title: "Success",
    //                 description: "Ticket has been updated.",
    //                 variant: "success",
    //             });
    //         },
    //         onError: (errors) => {
    //             console.log({ errors });
    //             toast({
    //                 title: "Error",
    //                 description: "Failed to update ticket.",
    //                 variant: "destructive",
    //             });
    //         },
    //     });
    // };

    // const deleteTicket = (e) => {
    //     e.preventDefault();

    //     destroy(route("tickets.destroy", { id: ticket.id }), {
    //         preserveScroll: true,
    //         onSuccess: () => setIsDeleteModalOpen(false),
    //         onError: () => console.error("failed to delete ticket"),
    //         onFinish: () => console.log("redirect to index page"),
    //     });
    // };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ticket" />
            <div className="pt-3 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <Link
                        as="button"
                        variant="ghost"
                        className="text-sm text-primary font-medium flex items-center"
                        href={route("tickets.index")}
                    >
                        <ChevronLeft size="16" strokeWidth={3} />
                        Back
                    </Link>
                    <div className="p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                {getConcernTypeBadge(ticket.concern_type)}
                            </div>

                            <div className="flex items-center gap-1">
                                <Button
                                    type="submit"
                                    form="update-ticket-form"
                                    // disabled={!isDirty && !files.length}
                                    className="p-2 h-6 rounded"
                                >
                                    Save changes
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-6 w-6 p-0 rounded"
                                        >
                                            <span className="sr-only">
                                                Ticket actions
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className="text-center">
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="justify-center"
                                            // onClick={() =>
                                            //     setIsDeleteModalOpen(true)
                                            // }
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* <form
                            id="update-ticket-form"
                            onSubmit={updateTicket}
                            // className="flex flex-col flex-grow"
                        >
                            <TicketDetailsHeader
                                ticket={ticket}
                                {...ticketUpdateForm}
                            />

                            <Tabs
                                defaultValue="details"
                                className="w-full h-full"
                            >
                                <TabsList className="my-4">
                                    <TabsTrigger value="details">
                                        <span>Details</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="attachments">
                                        <span>Attachments</span>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="details"
                                    className="grid grid-cols-3 gap-5 h-full px-2"
                                >
                                    <div className="col-start-1 col-span-3">
                                        <UpdateableFormField
                                            required
                                            label="Description"
                                            htmlFor="issue_details"
                                            error={errors.issue_details}
                                            render={
                                                <Textarea
                                                    id="issue_details"
                                                    editabledisplaymode
                                                    className=""
                                                    value={data.issue_details}
                                                    placeholder="Click to enter description."
                                                    onChange={(e) => {
                                                        setData(
                                                            "issue_details",
                                                            e.target.value
                                                        );
                                                        clearErrors(
                                                            "issue_details"
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                    </div>

                                    {getForm()}
                                </TabsContent>
                                <TabsContent
                                    value="attachments"
                                    className="flex flex-wrap h-full w-full px-2"
                                >
                                    <FileDropzone
                                        files={files}
                                        setFiles={setFiles}
                                    />
                                </TabsContent>
                            </Tabs>
                        </form> */}

                        <Dialog
                            open={isDeleteModalOpen}
                            onOpenChange={setIsDeleteModalOpen}
                        >
                            <DialogContent>
                                {/* <form onSubmit={deleteTicket}> */}
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you sure you want to delete this
                                        ticket?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action is irreversible. This will
                                        delete the ticket here in the tool and
                                        its corresponding ticket in Freshdesk.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsDeleteModalOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        // onClick={deleteTicket}
                                    >
                                        Proceed
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
