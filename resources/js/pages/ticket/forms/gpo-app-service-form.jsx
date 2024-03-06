import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import FormField from "@/components/custom/form-field";
import { Combobox } from "@/components/custom/combobox";
import { GPO_APP_SERVICES } from "@/constants/gpo-app-constants";
import { TooltipIcon } from "@/components/custom/tooltip-icon";
import { Info } from "lucide-react";

const deviceOSTooltip = (
    <div className="text-sm">
        <p>
            <strong>Android</strong>
            {": Go to Settings > About Phone > Android version"}
        </p>
        <p>
            <strong>iOS</strong>
            {": Go to Settings > General > About"}
        </p>
    </div>
);

export default function GpoAppServiceForm({
    editMode = false,
    data,
    setData,
    errors,
    reset,
    clearErrors,
}) {
    const isCustomerMobtelRequired = [
        "cash_in_via_mobtel",
        "cash_in_via_code",
        "cash_out",
        "pa_konsulta",
        "send_load",
    ].includes(data.service_type);

    useEffect(() => {
        if (!data.service_type) {
            return;
        }

        if (!!errors.service_type) {
            clearErrors("service_type");
        }

        if (!!errors.customer_mobile_number && !isCustomerMobtelRequired) {
            clearErrors("customer_mobile_number");
        }
    }, [data.service_type]);

    const getTransactionAmount = () => {
        const lastChar = data.transaction_amount.slice(
            data.transaction_amount.length - 1
        );

        if (lastChar === ".") {
            return Number(data.transaction_amount).toLocaleString().lastChar;
        }

        return Number(data.transaction_amount).toLocaleString();
    };

    const handleTransactionAmount = (inputAmount) => {
        const [baseVal, decimalVal] = inputAmount.split(".");

        if (decimalVal && decimalVal.length > 2) return;

        let amount = inputAmount.replaceAll(",", "");

        setData("transaction_amount", amount);
        clearErrors("transaction_amount");
    };

    return (
        <>
            <div className="align-top min-h-20 col-span-1">
                <FormField
                    required
                    label="Service type"
                    htmlFor="service_type"
                    error={errors.service_type}
                    render={
                        <Combobox
                            id="service_type"
                            name="service_type"
                            value={data.service_type}
                            editabledisplaymode={editMode}
                            placeholder="Select a service"
                            searchPlaceholder="Enter service name"
                            options={GPO_APP_SERVICES}
                            onChange={setData}
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
                        <Input
                            id="gpo_mobile_number"
                            value={data.gpo_mobile_number}
                            editabledisplaymode={editMode}
                            onChange={(e) => {
                                setData("gpo_mobile_number", e.target.value);
                                clearErrors("gpo_mobile_number");
                            }}
                        />
                    }
                />
            </div>

            <div className="align-top min-h-20">
                <FormField
                    required={isCustomerMobtelRequired}
                    label="Affected customer mobile number"
                    htmlFor="customer_mobile_number"
                    error={errors.customer_mobile_number}
                    render={
                        <Input
                            type="tel"
                            id="customer_mobile_number"
                            value={data.customer_mobile_number}
                            editabledisplaymode={editMode}
                            onChange={(e) => {
                                setData(
                                    "customer_mobile_number",
                                    e.target.value
                                );
                                clearErrors("customer_mobile_number");
                            }}
                        />
                    }
                />
            </div>

            <div className="align-top min-h-20">
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
                            <SelectTrigger
                                className="w-full"
                                editabledisplaymode={editMode}
                            >
                                <SelectValue placeholder="Select device type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ios">iOS</SelectItem>
                                <SelectItem value="android">Android</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                />
            </div>

            <div className="align-top min-h-20">
                <FormField
                    required
                    label="Device model"
                    htmlFor="device_model"
                    error={errors.device_model}
                    render={
                        <Input
                            id="device_model"
                            value={data.device_model}
                            editabledisplaymode={editMode}
                            onChange={(e) =>
                                setData("device_model", e.target.value)
                            }
                        />
                    }
                />
            </div>

            <div className="align-top min-h-20">
                <FormField
                    required
                    label="Device OS version"
                    htmlFor="device_os_version"
                    error={errors.device_os_version}
                    tooltipContent={deviceOSTooltip}
                    render={
                        <Input
                            id="device_os_version"
                            value={data.device_os_version}
                            editabledisplaymode={editMode}
                            onChange={(e) =>
                                setData("device_os_version", e.target.value)
                            }
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
                        <Input
                            id="transaction_amount"
                            editabledisplaymode={editMode}
                            value={getTransactionAmount()}
                            onChange={(e) =>
                                handleTransactionAmount(e.target.value)
                            }
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
                            editabledisplaymode={editMode}
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
                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="Biller name"
                            htmlFor="biller_name"
                            error={errors.biller_name}
                            render={
                                <Input
                                    id="biller_name"
                                    value={data.biller_name}
                                    editabledisplaymode={editMode}
                                    onChange={(e) => {
                                        setData("biller_name", e.target.value);
                                        clearErrors("biller_name");
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="align-top min-h-20">
                        <FormField
                            required
                            label="Reference number"
                            htmlFor="biller_ref_number"
                            error={errors.biller_ref_number}
                            render={
                                <Input
                                    id="biller_ref_number"
                                    value={data.biller_ref_number}
                                    editabledisplaymode={editMode}
                                    onChange={(e) => {
                                        setData(
                                            "biller_ref_number",
                                            e.target.value
                                        );
                                        clearErrors("biller_ref_number");
                                    }}
                                />
                            }
                        />
                    </div>
                </>
            )}

            {data.service_type === "claim_padala" && (
                <div className="align-top min-h-20">
                    <FormField
                        required
                        label="GPadala reference number"
                        htmlFor="gpadala_ref_number"
                        error={errors.gpadala_ref_number}
                        render={
                            <Input
                                id="gpadala_ref_number"
                                value={data.gpadala_ref_number}
                                editabledisplaymode={editMode}
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
        </>
    );
}
