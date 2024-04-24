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
import FormField from "@/components/custom/form-field";
import { Combobox } from "@/components/custom/combobox";
import { REPORT_TYPE_SORTED_ASC } from "@/constants/report-constants";
import { useEffect, useState } from "react";
import { FileDropzone } from "@/components/custom/file-dropzone";
import { NumericFormat } from "react-number-format";
import PhoneInput from "@/components/custom/phone-input";

export default function ReportsConcernForm({
    data,
    setData,
    errors,
    clearErrors,
    editMode = false,
}) {
    useEffect(() => {
        clearErrors("report_type");
    }, [data.report_type]);

    return (
        <>
            <div className="align-top min-h-20">
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
                            className="max-w-[248px]"
                            placeholder="Select report type"
                            searchPlaceholder="Enter report type name"
                            editabledisplaymode={editMode}
                            options={REPORT_TYPE_SORTED_ASC}
                            onChange={setData}
                        />
                    }
                />
            </div>

            <div className="align-top min-h-20">
                <FormField
                    required={data.concern_type !== "additional_recipient"}
                    label="Report date"
                    htmlFor="report_date"
                    error={errors.report_date}
                    render={
                        <Input
                            id="report_date"
                            type="date"
                            value={data.report_date}
                            editabledisplaymode={editMode}
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

            {data.concern_type === "gpo_service_variance" && (
                <>
                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="GPO ID"
                            htmlFor="gpo_id"
                            error={errors.gpo_id}
                            render={
                                <Input
                                    id="gpo_id"
                                    value={data.gpo_id}
                                    editabledisplaymode={editMode}
                                    onChange={(e) => {
                                        setData("gpo_id", e.target.value);
                                        clearErrors("gpo_id");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="GPO mobile number"
                            htmlFor="gpo_mobile_number"
                            error={errors.gpo_mobile_number}
                            render={
                                <PhoneInput
                                    id="gpo_mobile_number"
                                    editabledisplaymode={editMode}
                                    placeholder="ex: 0999 123 4567"
                                    value={data.gpo_mobile_number}
                                    onBlur={() => {
                                        if (
                                            data.gpo_mobile_number &&
                                            !isValidPhoneNumber(
                                                data.gpo_mobile_number
                                            )
                                        ) {
                                            setError(
                                                "gpo_mobile_number",
                                                "Invalid phone number"
                                            );
                                        }
                                    }}
                                    onChange={(inputValue) => {
                                        setData(
                                            "gpo_mobile_number",
                                            inputValue
                                        );
                                        clearErrors("gpo_mobile_number");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="Transaction amount"
                            htmlFor="transaction_amount"
                            error={errors.transaction_amount}
                            render={
                                <NumericFormat
                                    value={data.transaction_amount}
                                    thousandSeparator
                                    decimalScale={2}
                                    customInput={Input}
                                    placeholder="ex: 1250.05"
                                    onValueChange={(values) => {
                                        setData(
                                            "transaction_amount",
                                            values.value
                                        );
                                        clearErrors("transaction_amount");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="Transaction date and time"
                            htmlFor="transaction_datetime"
                            error={errors.transaction_datetime}
                            render={
                                <Input
                                    id="transaction_datetime"
                                    type="datetime-local"
                                    value={data.transaction_datetime}
                                    editabledisplaymode={editMode}
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

                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="External Transaction ID"
                            htmlFor="ext_transaction_id"
                            error={errors.ext_transaction_id}
                            render={
                                <Input
                                    id="ext_transaction_id"
                                    value={data.ext_transaction_id}
                                    editabledisplaymode={editMode}
                                    onChange={(e) => {
                                        setData(
                                            "ext_transaction_id",
                                            e.target.value
                                        );
                                        clearErrors("ext_transaction_id");
                                    }}
                                />
                            }
                        />
                    </div>
                </>
            )}
        </>
    );
}
