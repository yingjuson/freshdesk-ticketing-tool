import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import FormField from "@/Components/custom/form-field";
import { Combobox } from "@/Components/custom/combobox";
import { services } from "@/Constants/gpoServiceConstants";
import { REPORT_TYPE } from "@/Constants/reportConstants";
import { useEffect, useState } from "react";
import { FileDropzone } from "@/Components/custom/file-dropzone";

export default function ReportsConcernForm({
    data,
    setData,
    errors,
    clearErrors,
}) {
    // const detailsTabHasErrors =
    //     errors.includes("issue_details") || errors.includes("media");

    // const moreDetailsTabHasErrors =
    //     errors.includes("service_type") ||
    //     errors.includes("other_service") ||
    //     errors.includes("gpo_mobile_number") ||
    //     errors.includes("device_type") ||
    //     errors.includes("transaction_amount") ||
    //     errors.includes("transaction_datetime") ||
    //     errors.includes("biller_name") ||
    //     errors.includes("biller_ref_number");

    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Make sure to revoke the file URIs to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <>
            <Tabs defaultValue="details" className="w-full h-full">
                <TabsList className="my-5">
                    <TabsTrigger value="details">
                        <span>Details</span>
                    </TabsTrigger>
                    <TabsTrigger value="more-details">
                        <span>More details</span>
                    </TabsTrigger>
                    <TabsTrigger value="attachments">
                        <span>Attachments</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="details"
                    className="grid grid-cols-2 gap-5 h-full"
                >
                    <div className="align-top">
                        <FormField
                            required
                            label="Report type"
                            htmlFor="report_type"
                            error={errors.report_type}
                            render={
                                <Combobox
                                    id="report_type"
                                    name="report_type"
                                    value={data.report_type}
                                    placeholder="Select report type"
                                    searchPlaceholder="Enter report type name"
                                    options={REPORT_TYPE}
                                    onChange={setData}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            required
                            label="Report date"
                            htmlFor="report_date"
                            error={errors.report_date}
                            render={
                                <Input
                                    id="report_date"
                                    type="date"
                                    value={data.report_date}
                                    onChange={(e) => {
                                        setData(
                                            "report_date",
                                            format(
                                                new Date(e.target.value),
                                                "yyyy-MM-dd"
                                            )
                                        );
                                        clearErrors("report_date");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="GPO ID"
                            htmlFor="gpo_id"
                            error={errors.gpo_id}
                            render={
                                <Input
                                    id="gpo_id"
                                    value={data.gpo_id}
                                    onChange={(e) => {
                                        setData("gpo_id", e.target.value);
                                        clearErrors("gpo_id");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="GPO mobile number"
                            htmlFor="gpo_mobile_number"
                            error={errors.gpo_mobile_number}
                            render={
                                <Input
                                    id="gpo_mobile_number"
                                    value={data.gpo_mobile_number}
                                    onChange={(e) => {
                                        setData(
                                            "gpo_mobile_number",
                                            e.target.value
                                        );
                                        clearErrors("gpo_mobile_number");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Transaction ID"
                            htmlFor="transaction_id"
                            error={errors.transaction_id}
                            render={
                                <Input
                                    id="transaction_id"
                                    value={data.transaction_id}
                                    onChange={(e) => {
                                        setData(
                                            "transaction_id",
                                            e.target.value
                                        );
                                        clearErrors("transaction_id");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Transaction amount"
                            htmlFor="transaction_amount"
                            error={errors.transaction_amount}
                            render={
                                <Input
                                    id="transaction_amount"
                                    type="number"
                                    min="0.00"
                                    value={data.transaction_amount}
                                    onChange={(e) => {
                                        setData(
                                            "transaction_amount",
                                            e.target.value
                                        );
                                        clearErrors("transaction_amount");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Transaction date and time"
                            htmlFor="transaction_datetime"
                            error={errors.transaction_datetime}
                            render={
                                <Input
                                    id="transaction_datetime"
                                    type="datetime-local"
                                    value={data.transaction_datetime}
                                    onChange={(e) => {
                                        setData(
                                            "transaction_datetime",
                                            format(
                                                new Date(e.target.value),
                                                "yyyy-MM-dd HH:mm"
                                            )
                                        );
                                        clearErrors("transaction_datetime");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Partner reference number"
                            htmlFor="partner_ref_number"
                            error={errors.partner_ref_number}
                            render={
                                <Input
                                    id="partner_ref_number"
                                    value={data.partner_ref_number}
                                    onChange={(e) => {
                                        setData(
                                            "partner_ref_number",
                                            e.target.value
                                        );
                                        clearErrors("partner_ref_number");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Transaction ID"
                            htmlFor="transaction_id"
                            error={errors.transaction_id}
                            render={
                                <Input
                                    id="transaction_id"
                                    value={data.transaction_id}
                                    onChange={(e) => {
                                        setData(
                                            "transaction_id",
                                            e.target.value
                                        );
                                        clearErrors("transaction_id");
                                    }}
                                />
                            }
                        />
                    </div>
                </TabsContent>
                <TabsContent
                    value="more-details"
                    className="grid grid-cols-2 gap-5 h-full"
                >
                    <div className="align-top col-span-2">
                        <FormField
                            required
                            label="Issue details"
                            htmlFor="issue_details"
                            error={errors.issue_details}
                            render={
                                <>
                                    <Textarea
                                        id="issue_details"
                                        value={data.issue_details}
                                        placeholder="Enter issue details here."
                                        className="min-h-28 max-h-56"
                                        onChange={(e) => {
                                            setData(
                                                "issue_details",
                                                e.target.value
                                            );
                                            clearErrors("issue_details");
                                        }}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        If error message is displayed, please
                                        specify
                                    </p>
                                </>
                            }
                        />
                    </div>
                </TabsContent>

                <TabsContent
                    value="attachments"
                    className="flex justify-center"
                >
                    <FileDropzone files={files} setFiles={setFiles} />
                </TabsContent>
            </Tabs>
        </>
    );
}
