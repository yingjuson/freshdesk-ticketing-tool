import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { getConcernTypeBadge } from "@/utils/component-utils";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import UpdateableFormField from "@/components/custom/updateable-form-field";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDropzone } from "@/components/custom/file-dropzone";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import GpoAppServiceForm from "./forms/gpo-app-service-form";
import { GROUPED_CONCERN_TYPES } from "@/constants/concern-type-constants";
import NonGpoAppServiceForm from "./forms/non-gpo-app-service-form";
import WebtoolConcernForm from "./forms/webtool-concern-form";
import ReportsConcernForm from "./forms/reports-concern-form";
import { useToast } from "@/components/ui/use-toast";
import TicketDetailsHeader from "./ticket-details-header";

export default function ShowEdit({ auth }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

    const { data, setData, errors, put, clearErrors, processing } =
        ticketUpdateForm;

    const [files, setFiles] = useState(ticket.attachments || []);

    useEffect(() => {
        setData("attachments", files);
    }, [files]);

    // TO DO: Add to utils
    const getForm = () => {
        if (
            !data.concern_type ||
            data.concern_type === "additional_recipient"
        ) {
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
            default:
                return null;
        }
    };

    const updateTicket = (e) => {
        e.preventDefault();

        put(route("tickets.update", { ticket: ticket.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Ticket has been updated.",
                    variant: "success",
                });
            },
            onError: (errors) => {
                console.log({ errors });
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
                            {getConcernTypeBadge(ticket.concern_type)}

                            <Button
                                type="submit"
                                form="update-ticket-form"
                                disabled={processing}
                                // disabled={!isDirty && !files.length}
                            >
                                Save changes
                            </Button>
                        </div>

                        <form
                            id="update-ticket-form"
                            onSubmit={updateTicket}
                            // className="flex flex-col flex-grow"
                        >
                            <TicketDetailsHeader
                                editMode
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
                                    <TabsTrigger
                                        value="attachments"
                                        className={
                                            ticket.concern_type ===
                                            "additional_recipient"
                                                ? "hidden"
                                                : ""
                                        }
                                    >
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
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
