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
import { GPO_APP_SERVICES, services } from "@/Constants/gpoServiceConstants";

export default function NonGpoServiceConcernForm({
    data,
    setData,
    errors,
    clearErrors,
    concern,
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

    return (
        <>
            <Tabs defaultValue="details" className="w-full h-full">
                <TabsList className="my-5">
                    <TabsTrigger value="details">
                        <span>Details</span>
                    </TabsTrigger>
                    <TabsTrigger value="more-details">
                        <span
                        // className={
                        //     moreDetailsTabHasErrors() ? "text-rose-600" : ""
                        // }
                        >
                            More details
                        </span>
                    </TabsTrigger>
                    <TabsTrigger value="details">
                        <span>Attachments</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="details"
                    className="grid grid-cols-2 gap-5 h-full"
                >
                    <div className="align-top">
                        <div>
                            <FormField
                                label="Service type"
                                htmlFor="service_type"
                                error={errors.service_type}
                                render={
                                    <Combobox
                                        id="service_type"
                                        name="service_type"
                                        value={data.service_type}
                                        placeholder="Select a service"
                                        searchPlaceholder="Enter service name"
                                        options={GPO_APP_SERVICES}
                                        onChange={setData}
                                    />
                                }
                            />
                        </div>
                    </div>

                    <div className="align-top">
                        <FormField
                            label="Other service"
                            htmlFor="other_service"
                            error={errors.other_service}
                            render={
                                <Input
                                    id="other_service"
                                    value={data.other_service}
                                    onChange={(e) => {
                                        setData(
                                            "other_service",
                                            e.target.value
                                        );
                                        clearErrors("other_service");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top">
                        <FormField
                            required
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
                            required
                            label="Device type"
                            htmlFor="device_type"
                            error={errors.device_type}
                            render={
                                <Select
                                    id="device_type"
                                    onValueChange={(value) => {
                                        setData("device_type", value);
                                        clearErrors("device_type");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select device type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ios">iOS</SelectItem>
                                        <SelectItem value="android">
                                            Android
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-subgrid col-span-2 align-top">
                        <div className="col-start-1">
                            <FormField
                                label="Customer mobile number"
                                htmlFor="customer_mobile_number"
                                error={errors.customer_mobile_number}
                                render={
                                    <Input
                                        id="customer_mobile_number"
                                        value={data.customer_mobile_number}
                                        onChange={(e) =>
                                            setData(
                                                "customer_mobile_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                }
                            />
                        </div>
                    </div>

                    <div className="align-top">
                        <FormField
                            required={!!data.service_type}
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
                            required
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

                    {data.service_type === "bills_pay" && (
                        <>
                            <div className="align-top">
                                <FormField
                                    required
                                    label="Biller"
                                    htmlFor="biller_name"
                                    error={errors.biller_name}
                                    render={
                                        <Input
                                            id="biller_name"
                                            value={data.biller_name}
                                            onChange={(e) => {
                                                setData(
                                                    "biller_name",
                                                    e.target.value
                                                );
                                                clearErrors("biller_name");
                                            }}
                                        />
                                    }
                                />
                            </div>

                            <div className="align-top">
                                <FormField
                                    required
                                    label="Biller reference number"
                                    htmlFor="biller_ref_number"
                                    error={errors.biller_ref_number}
                                    render={
                                        <Input
                                            id="biller_ref_number"
                                            value={data.biller_ref_number}
                                            onChange={(e) => {
                                                setData(
                                                    "biller_ref_number",
                                                    e.target.value
                                                );
                                                clearErrors(
                                                    "biller_ref_number"
                                                );
                                            }}
                                        />
                                    }
                                />
                            </div>
                        </>
                    )}

                    {data.service_type === "gpadala" && (
                        <div className="align-top">
                            <FormField
                                required
                                label="GPadala reference number"
                                htmlFor="gpadala_ref_number"
                                error={errors.gpadala_ref_number}
                                render={
                                    <Input
                                        id="gpadala_ref_number"
                                        value={data.gpadala_ref_number}
                                        onChange={(e) => {
                                            setData(
                                                "gpadala_ref_number",
                                                e.target.value
                                            );
                                            clearErrors("gpadala_ref_number");
                                        }}
                                    />
                                }
                            />
                        </div>
                    )}
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
            </Tabs>
        </>
    );
}
