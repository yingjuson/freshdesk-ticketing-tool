import { useEffect, useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getConcernTypeBadge } from "@/Utils/component-utils";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import UpdateableFormField from "@/Components/custom/updateable-form-field";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, MoreHorizontal } from "lucide-react";
import { FileDropzone } from "@/Components/custom/file-dropzone";
import { Input } from "@/Components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import { Button } from "@/Components/ui/button";

import { ChevronLeft } from "lucide-react";
import GpoAppServiceForm from "./Forms/gpo-app-service-form";
import { STATUS_COLORS } from "@/Constants/status-constants";
import { GROUPED_CONCERN_TYPES } from "@/Constants/concern-type-constants";
import NonGpoAppServiceForm from "./Forms/non-gpo-app-service-form";
import WebtoolConcernForm from "./Forms/webtool-concern-form";
import ReportsConcernForm from "./Forms/reports-concern-form";
import DataRequestConcernForm from "./Forms/DataRequestConcernForm";
import { useToast } from "@/components/ui/use-toast";

export default function ShowEdit({ auth }) {
    const { toast } = useToast();
    const ticket = usePage().props.ticket;

    let ticketCopy = { ...ticket };

    for (const key in ticketCopy) {
        if (ticketCopy[key] === null) {
            ticketCopy[key] = "";
        }
    }

    const ticketUpdateForm = useForm({
        ...ticketCopy,
        transaction_datetime: ticketCopy.transaction_datetime
            ? format(
                  new Date(ticketCopy.transaction_datetime),
                  "yyyy-MM-dd HH:mm"
              )
            : "",
    });

    const { data, setData, errors, put, clearErrors, transform } =
        ticketUpdateForm;

    const [files, setFiles] = useState(ticket.attachments || []);

    transform((currentTicketData) => {
        if (files.length > 0) {
            return currentTicketData;
        }

        return { ...currentTicketData, attachments: [] };
    });

    // TO DO: Add to utils
    const getForm = () => {
        if (!data.concern_type) {
            return null;
        }

        // Determine the group of the selected concern
        const selectedGroup = Object.keys(GROUPED_CONCERN_TYPES).find((group) =>
            GROUPED_CONCERN_TYPES[group].some(
                (item) => item.key === data.concern_type
            )
        );

        switch (selectedGroup) {
            case "App":
                return <GpoAppServiceForm editMode {...ticketUpdateForm} />;
            case "App Onboarding":
            case "App Connection":
                return <NonGpoAppServiceForm editMode {...ticketUpdateForm} />;
            case "Webtool":
                return <WebtoolConcernForm editMode {...ticketUpdateForm} />;
            case "Reports":
                return <ReportsConcernForm editMode {...ticketUpdateForm} />;
            case "Others":
                return (
                    <DataRequestConcernForm editMode {...ticketUpdateForm} />
                );
            default:
                return null;
        }
    };

    const updateTicket = (e) => {
        e.preventDefault();

        put(route("tickets.update", { ticket: ticket.id }), {
            preserveScroll: true,
            onSuccess: () => {
                // reset();
                toast({
                    title: "Success",
                    description: "Ticket has been updated.",
                    variant: "success",
                });
            },
            onError: (errors) => {
                toast({
                    title: "Error",
                    description: "Failed to update ticket.",
                    variant: "destructive",
                });
            },
        });
    };

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
                                        <DropdownMenuItem className="justify-center">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <form
                            id="update-ticket-form"
                            onSubmit={updateTicket}
                            // className="flex flex-col flex-grow"
                        >
                            <div className="flex items-center">
                                <span className="font-bold">{`#${ticket.id}`}</span>
                                <UpdateableFormField
                                    required
                                    hideLabel={true}
                                    label="Subject"
                                    htmlFor="subject"
                                    error={errors.subject}
                                    render={
                                        <Input
                                            id="subject"
                                            editabledisplaymode
                                            value={data.subject}
                                            className="ml-2 my-3 font-bold text-base"
                                            onChange={(e) => {
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                );
                                                clearErrors("subject");
                                            }}
                                        />
                                    }
                                />
                            </div>

                            <div className="bg-slate-100 w-full py-2 px-4 rounded-md">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-96 text-sm">
                                    <div className="grid grid-cols-3 col-span-1">
                                        <div className="col-span-1">Status</div>
                                        <div className="col-span-2 flex items-center gap-1">
                                            <Circle
                                                color={
                                                    ticket.status ===
                                                    "in_progress"
                                                        ? "lightgray"
                                                        : STATUS_COLORS[
                                                              ticket.status
                                                          ]
                                                }
                                                fill={
                                                    STATUS_COLORS[ticket.status]
                                                }
                                                size="12"
                                            />
                                            <div>{ticket.status}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 col-span-1">
                                        <div className="col-span-1">
                                            Created at
                                        </div>
                                        <div className="col-span-1">
                                            {format(
                                                new Date(ticket.created_at),
                                                "yyyy-MM-dd"
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[0.75em] font-bold bg-sky-500">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>Unassigned</p>
                                    </div>

                                    <div className="grid grid-cols-2 col-span-1">
                                        <div className="col-span-1">
                                            Updated at
                                        </div>
                                        <div className="col-span-1">
                                            {format(
                                                new Date(ticket.updated_at),
                                                "yyyy-MM-dd"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                    <div className="grid grid-cols-subgrid col-span-3">
                                        <div className="col-start-1 col-span-2">
                                            <UpdateableFormField
                                                required
                                                label="Description"
                                                htmlFor="issue_details"
                                                error={errors.issue_details}
                                                render={
                                                    <>
                                                        <Textarea
                                                            id="issue_details"
                                                            editabledisplaymode
                                                            className=""
                                                            value={
                                                                data.issue_details
                                                            }
                                                            placeholder="Click to enter description."
                                                            onChange={(e) => {
                                                                setData(
                                                                    "issue_details",
                                                                    e.target
                                                                        .value
                                                                );
                                                                clearErrors(
                                                                    "issue_details"
                                                                );
                                                            }}
                                                        />
                                                    </>
                                                }
                                            />
                                        </div>
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
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
