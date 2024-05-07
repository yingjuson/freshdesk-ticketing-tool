import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import FormField from "@/components/custom/form-field";
import { FileDropzone } from "@/components/custom/file-dropzone";

import { getConcernTypeBadge } from "@/utils/component-utils";
import WebtoolConcernForm from "./forms/webtool-concern-form";
import ReportsConcernForm from "./forms/reports-concern-form";
import OtherRequestForm from "./forms/other-request-form";

import GpoAppServiceForm from "./forms/gpo-app-service-form";
import NonGpoAppServiceForm from "./forms/non-gpo-app-service-form";
import {
    CONCERNS_REQUIRING_ATTACHMENT,
    GROUPED_CONCERN_TYPES,
} from "@/constants/concern-type-constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ShieldAlert, RotateCcw } from "lucide-react";
import { isFileSizeTooLarge } from "@/utils/file-utils";
import { CustomAlert } from "@/components/custom/custom-alert";
import { cn } from "@/lib/utils";

export const CreateTicketDialog = ({
    isOpen,
    setIsOpen,
    selectedConcern,
    ...props
}) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        setError,
        reset,
    } = props;

    const { toast } = useToast();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setData("attachments", files);

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
    }, [files]);

    console.log({ errors });

    const detailsTabHasError = () => {
        if (errors.length === 0) return false;
        const { issue_details, subject, attachments, ...remainingErrors } =
            errors;

        const errorInDetails = Object.keys(remainingErrors).filter(
            (key) => !key.startsWith("attachment")
        );

        return errorInDetails.length > 0;
    };

    const handleCancelClick = () => {
        setIsOpen(false);
        reset();
        clearErrors();
    };

    const handleResetFields = (e) => {
        e.preventDefault();

        reset(
            "service_type",
            "subject",
            "issue_details",
            "customer_mobile_number",
            "gpo_mobile_number",
            "biller_name",
            "biller_ref_number",
            "device_type",
            "device_model",
            "device_os_version",
            "gpadala_ref_number",
            "transaction_amount",
            "transaction_datetime",
            "created_by",
            "assignee_id",
            "webtool_role",
            "portal_type",
            "report_type",
            "report_date",
            "gpo_id",
            "ext_transaction_id",
            "reference_number"
        );
        clearErrors();
        setFiles([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("tickets.store"), {
            onSuccess: () => {
                handleCancelClick();
                toast({
                    title: "Success",
                    description: "Ticket has been created.",
                    variant: "success",
                });
            },
            onError: (errors) => {
                if (errors.create) {
                    toast({
                        title: "Error",
                        description: errors.create,
                        variant: "destructive",
                    });
                }
            },
        });
    };

    const getHelperText = () => {
        return data.concern_type === "additional_recipient"
            ? "Please provide the email(s) to be added, and the GPO report(s) to receive"
            : "If error message is displayed, please specify";
    };

    // Determine the group of the selected concern
    const selectedGroup = Object.keys(GROUPED_CONCERN_TYPES).find((group) =>
        GROUPED_CONCERN_TYPES[group].some(
            (item) => item.key === selectedConcern
        )
    );

    // TO DO: Add to utils
    const getForm = (selectedConcern) => {
        if (!selectedConcern) {
            return null;
        }

        switch (selectedGroup) {
            case "App":
                return <GpoAppServiceForm {...props} />;
            case "App Onboarding":
            case "App Connection":
                return <NonGpoAppServiceForm {...props} />;
            case "Webtool":
                return <WebtoolConcernForm {...props} />;
            case "Reports":
                return <ReportsConcernForm {...props} />;
            case "Others":
                // distro_mapping_update;
                return <OtherRequestForm {...props} />;
            default:
                return null;
        }
    };

    const getTabClass = (tabName) => {
        let cName = "";

        switch (tabName) {
            case "attachments":
                cName = errors.attachments
                    ? "text-rose-700 data-[state=active]:text-rose-700"
                    : "";
                break;
            case "details":
                cName = detailsTabHasError()
                    ? "text-rose-700 data-[state=active]:text-rose-700"
                    : "";
                break;
        }

        if (selectedConcern === "additional_recipient") {
            cn(cName, "hidden");
        }

        return cName;
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="absolute right-[20px] flex flex-col"
        >
            <DialogContent className="sm:max-w-[825px] p-4 flex h-[85vh] flex-col">
                <form
                    id="create-ticket-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-grow"
                >
                    <DialogHeader>
                        <DialogTitle className="flex flex-row items-center gap-2">
                            Create new ticket
                            {getConcernTypeBadge(selectedConcern)}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="my-2">
                        <FormField
                            htmlFor="subject"
                            error={errors.subject}
                            className="min-h-14"
                            render={
                                <Input
                                    id="subject"
                                    value={data.subject}
                                    className="font-semibold placeholder:font-normal"
                                    placeholder="Enter short subject or title"
                                    onChange={(e) => {
                                        setData("subject", e.target.value);
                                        clearErrors("subject");
                                    }}
                                />
                            }
                        />
                    </div>

                    <Tabs
                        defaultValue={
                            selectedConcern === "additional_recipient"
                                ? "more-details"
                                : "details"
                        }
                        className="flex flex-col"
                    >
                        <TabsList className="my-2">
                            <TabsTrigger
                                value="details"
                                className={getTabClass("details")}
                            >
                                Details
                            </TabsTrigger>

                            {selectedGroup !== "Others" && (
                                <TabsTrigger
                                    value="more-details"
                                    {...(errors.issue_details && {
                                        className:
                                            "text-rose-700 data-[state=active]:text-rose-700",
                                    })}
                                >
                                    More Details
                                </TabsTrigger>
                            )}

                            <TabsTrigger
                                value="attachments"
                                className={getTabClass("attachments")}
                            >
                                Attachments
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-full max-h-[45vh] p-3">
                            <TabsContent
                                value="details"
                                className="w-full px-1"
                            >
                                <div className="grid grid-cols-2 gap-x-10 gap-y-3.5 h-full">
                                    {getForm(selectedConcern)}
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="more-details"
                                className="flex justify-center px-1"
                            >
                                <FormField
                                    required
                                    label="Issue details"
                                    htmlFor="issue_details"
                                    error={errors.issue_details}
                                    render={
                                        <Textarea
                                            id="issue_details"
                                            value={data.issue_details}
                                            helperText={getHelperText()}
                                            {...(data.concern_type ===
                                                "webtool" && {
                                                helperText2:
                                                    "If for report generation, please specify the date range and status",
                                            })}
                                            placeholder="Enter more details regarding your request or concern."
                                            onChange={(e) => {
                                                setData(
                                                    "issue_details",
                                                    e.target.value
                                                );
                                                clearErrors("issue_details");
                                            }}
                                        />
                                    }
                                />
                            </TabsContent>

                            <TabsContent
                                value="attachments"
                                className="flex flex-col justify-center items-center gap-2 px-1"
                            >
                                {!errors.attachments &&
                                    CONCERNS_REQUIRING_ATTACHMENT.includes(
                                        selectedConcern
                                    ) && (
                                        <CustomAlert
                                            variant="warning"
                                            title="Attachment required"
                                            description="Please attach necessary file(s)"
                                        />
                                    )}

                                {errors.attachments && (
                                    <CustomAlert
                                        variant="destructive"
                                        title="Attachment error"
                                        description={errors.attachments}
                                    />
                                )}

                                <FileDropzone
                                    concernType={data.concern_type}
                                    files={files}
                                    setFiles={setFiles}
                                    setError={setError}
                                />
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </form>

                <DialogFooter>
                    <div
                        id="mandatory-footnote"
                        className="flex flex-grow items-center justify-center text-xs font-semibold"
                    >
                        <p className="w-full text-center py-2 bg-yellow-50 border border-solid border-yellow-400 rounded-md">
                            All mandatory fields
                            <span className="text-sm text-rose-700">
                                *
                            </span>{" "}
                            must be filled out before submitting
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        disabled={processing}
                        className="flex gap-1 text-primary hover:bg-color-none hover:text-primary"
                        onClick={handleResetFields}
                    >
                        <RotateCcw size="16" />
                        Reset all fields
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        disabled={processing}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="create-ticket-form"
                        disabled={
                            processing || Object.values(errors).length > 0
                        }
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
