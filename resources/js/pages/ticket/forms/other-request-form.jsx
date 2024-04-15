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
import {
    CSX_PORTAL_ROLES,
    DISTRO_PORTAL_ROLES,
    FINANCE_PORTAL_ROLES,
    PORTAL_TYPES,
} from "@/constants/webtool-constants";
import { useEffect } from "react";
import { FileDropzone } from "@/components/custom/file-dropzone";

export default function OtherRequestForm({
    data,
    setData,
    errors,
    reset,
    clearErrors,
}) {
    return (
        <>
            {/* <div className="align-top min-h-20">
                <FormField
                    required
                    label="Start date"
                    htmlFor="data_req_start_date"
                    error={errors.data_req_start_date}
                    render={
                        <Input
                            id="data_req_start_date"
                            type="date"
                            value={data.data_req_start_date}
                            onChange={(e) => {
                                setData(
                                    "data_req_start_date",
                                    format(
                                        new Date(e.target.value),
                                        "yyyy-MM-dd"
                                    )
                                );
                                clearErrors("data_req_start_date");
                            }}
                        />
                    }
                />
            </div>

            <div className="align-top min-h-20">
                <FormField
                    required
                    label="End date"
                    htmlFor="data_req_end_date"
                    error={errors.data_req_end_date}
                    render={
                        <Input
                            id="data_req_end_date"
                            type="date"
                            value={data.data_req_end_date}
                            onChange={(e) => {
                                setData(
                                    "data_req_end_date",
                                    format(
                                        new Date(e.target.value),
                                        "yyyy-MM-dd"
                                    )
                                );
                                clearErrors("data_req_end_date");
                            }}
                        />
                    }
                />
            </div> */}

            <div className="align-top col-span-3 flex">
                <FormField
                    required
                    label="Request details"
                    htmlFor="issue_details"
                    error={errors.issue_details}
                    render={
                        <Textarea
                            id="issue_details"
                            value={data.issue_details}
                            placeholder="Example: Kindly update the Distributor mapping as of MM/DD/YYYY"
                            onChange={(e) => {
                                setData("issue_details", e.target.value);
                                clearErrors("issue_details");
                            }}
                        />
                    }
                />
            </div>
        </>
    );
}
