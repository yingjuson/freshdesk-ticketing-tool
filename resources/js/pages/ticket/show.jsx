import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { getConcernTypeBadge } from "@/utils/component-utils";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
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
import { isFileSizeTooLarge } from "@/utils/file-utils";
import FormField from "@/components/custom/form-field";

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
        new_attachments: [],
        existing_attachments: [],
        transaction_datetime: ticketCopy.transaction_datetime
            ? format(
                  new Date(ticketCopy.transaction_datetime),
                  "yyyy-MM-dd HH:mm"
              )
            : "",
    });

    const {
        data,
        setData,
        errors,
        post,
        setError,
        clearErrors,
        processing,
        transform,
    } = ticketUpdateForm;

    const [files, setFiles] = useState(ticket.attachments || []);

    const updateAttachments = () => {
        let newAttachments = [];
        let existingAttachments = [];

        files.forEach((attachment) => {
            if (attachment instanceof File) {
                newAttachments.push(attachment);
            } else {
                // array of existing attachment IDs
                existingAttachments.push(attachment.id);
            }
        });

        setData((currentData) => ({
            ...currentData,
            attachments: files,
            new_attachments: newAttachments,
            existing_attachments: existingAttachments,
        }));
    };

    useEffect(() => {
        updateAttachments();
    }, []);

    useEffect(() => {
        const totalFileSizeInBytes = files.reduce(
            (accu, { size }) => accu + size,
            0
        );

        if (isFileSizeTooLarge(totalFileSizeInBytes, 20)) {
            setError("attachments", "Total file size exceeds 20MB");
        } else {
            if (errors.attachments) {
                clearErrors("attachments");
            }
        }

        updateAttachments();
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

        // transform the data before sending the request
        // transform((formData) => {
        //     let newAttachments = [];
        //     let existingAttachments = [];

        //     formData.attachments.forEach((attachment) => {
        //         if (attachment instanceof File) {
        //             newAttachments.push(attachment);
        //         } else {
        //             // array of existing attachment IDs
        //             existingAttachments.push(attachment.id);
        //         }
        //     });

        //     console.log(
        //         "attachments",
        //         formData.attachments,
        //         existingAttachments,
        //         newAttachments
        //     );

        //     return {
        //         ...formData,
        //         new_attachments: newAttachments,
        //         existing_attachments: existingAttachments,
        //     };
        // });

        // let newAttachments = [];
        // let existingAttachments = [];

        // data.attachments.forEach((attachment) => {
        //     if (attachment instanceof File) {
        //         newAttachments.push(attachment);
        //     } else {
        //         // array of existing attachment IDs
        //         existingAttachments.push(attachment.id);
        //     }
        // });

        // setData((currentData) => ({
        //     ...currentData,
        //     new_attachments: newAttachments,
        //     existing_attachments: existingAttachments,
        // }));

        console.log("updating...", data);

        /**
         * Uploading files using a multipart/form-data request is not natively supported
         * in some languages for the PUT, PATCH, or DELETE methods. The workaround here
         * is to simply upload files using POST instead, but _method attribute has to be
         * included in the data request and set it to PUT, PATCH or DELETE.
         *
         * sources:
         * https://legacy.inertiajs.com/file-uploads#multipart-limitations
         * https://github.com/inertiajs/inertia/issues/495
         */
        post(
            route("tickets.update", {
                ticket: ticket.id,
                _method: "put",
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Ticket has been updated.",
                        variant: "success",
                    });
                },
                onError: (errors) => {
                    console.log({ errors, data });
                    toast({
                        title: "Error",
                        description: "Failed to update ticket.",
                        variant: "destructive",
                    });
                },
            }
        );
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
                                disabled={processing || errors.attachments}
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
                                    className="grid grid-cols-2 gap-5 h-full px-2"
                                >
                                    <div className="col-start-1 col-span-2">
                                        <FormField
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
