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
import { GROUPED_CONCERN_TYPES } from "@/constants/concern-type-constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ShieldAlert, RotateCcw } from "lucide-react";

export const CreateTicketDialog = ({
    isOpen,
    setIsOpen,
    selectedConcern,
    ...props
}) => {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        props;

    const { toast } = useToast();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setData("attachments", files);
    }, [files]);

    const detailsTabHasError = () => {
        if (errors.length === 0) return false;
        const { issue_details, subject, ...errorsCopy } = errors;
        return Object.keys(errorsCopy).length > 0;
    };

    const handleCancelClick = () => {
        setIsOpen(false);
        reset();
        clearErrors();
    };

    const handleResetFields = (e) => {
        e.preventDefault();

        reset();
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
        if (data.concern_type === "additional_recipient") {
            return "Please provide the email(s) to be added, and the GPO report(s) to receive";
        }

        return "If error message is displayed, please specify";
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

                    <Tabs defaultValue="details" className="flex flex-col">
                        <TabsList className="my-2">
                            <TabsTrigger
                                value="details"
                                {...(detailsTabHasError() && {
                                    className:
                                        "text-rose-700 data-[state=active]:text-rose-700",
                                })}
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
                                {...(errors.attachments && {
                                    className:
                                        "text-rose-700 data-[state=active]:text-rose-700",
                                })}
                            >
                                Attachments
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-full max-h-[45vh] p-3">
                            <TabsContent
                                value="details"
                                className="w-full px-1"
                            >
                                <div className="grid grid-cols-3 gap-5 h-full">
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
                                className="flex flex-col justify-center items-center gap- px-1"
                            >
                                {selectedConcern ===
                                    "distro_mapping_update" && (
                                    <Alert
                                        variant={
                                            errors.attachments
                                                ? "destructive"
                                                : "warning"
                                        }
                                        className="w-fit py-2"
                                    >
                                        <ShieldAlert size="18" />
                                        <AlertTitle>
                                            Attachment required
                                        </AlertTitle>
                                        <AlertDescription>
                                            Please provide the updated file of
                                            the distro mapping
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <FileDropzone
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </form>

                <div>
                    <DialogFooter>
                        <div
                            id="mandatory-footnote"
                            className="flex flex-grow items-center justify-center text-xs font-bold"
                        >
                            <p className="w-5/6 text-center py-2 bg-yellow-50 border border-solid border-yellow-400 rounded-md">
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
                            disabled={processing}
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
