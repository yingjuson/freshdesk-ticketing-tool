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
import {
    CSX_PORTAL_ROLES,
    DISTRO_PORTAL_ROLES,
    FINANCE_PORTAL_ROLES,
    PORTAL_TYPES,
} from "@/Constants/webtoolConstants";
import { useEffect, useState } from "react";
import { FileDropzone } from "@/Components/custom/file-dropzone";

export default function WebtoolConcernForm({
    data,
    setData,
    errors,
    reset,
    clearErrors,
}) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Make sure to revoke the file URIs to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const isWebtoolDisabled =
        data.portal_type !== "csx_portal" &&
        data.portal_type !== "finance_portal" &&
        data.portal_type !== "distributor_portal";

    const getRoles = () => {
        switch (data.portal_type) {
            case "csx_portal":
                return CSX_PORTAL_ROLES;
            case "finance_portal":
                return FINANCE_PORTAL_ROLES;
            case "distributor_portal":
                return DISTRO_PORTAL_ROLES;
            default:
                return [];
        }
    };

    return (
        <Tabs defaultValue="details" className="w-full h-full">
            <TabsList className="my-5">
                <TabsTrigger value="details">
                    <span>Details</span>
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
                        label="Portal type"
                        htmlFor="portal_type"
                        error={errors.portal_type}
                        render={
                            <Combobox
                                id="portal_type"
                                name="portal_type"
                                value={data.portal_type}
                                placeholder="Select a service"
                                searchPlaceholder="Enter service name"
                                options={PORTAL_TYPES}
                                onChange={setData}
                            />
                        }
                    />
                </div>

                <div className="align-top">
                    <FormField
                        label="Role"
                        htmlFor="webtool_role"
                        error={errors.webtool_role}
                        render={
                            <Select
                                id="webtool_role"
                                name="webtool_role"
                                disabled={isWebtoolDisabled}
                                onValueChange={(value) => {
                                    setData("webtool_role", value);
                                    clearErrors("webtool_role");
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getRoles().map((role) => (
                                        <SelectItem
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            // <Combobox
                            //     id="webtool_role"
                            //     name="webtool_role"
                            //     disabled={isWebtoolDisabled}
                            //     value={data.webtool_role}
                            //     placeholder="Select a role"
                            //     searchPlaceholder="Enter service name"
                            //     options={getRoles()}
                            //     onChange={setData}
                            // />
                        }
                    />
                </div>

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

            <TabsContent value="attachments" className="flex justify-center">
                <FileDropzone files={files} setFiles={setFiles} />
            </TabsContent>
        </Tabs>
    );
}
