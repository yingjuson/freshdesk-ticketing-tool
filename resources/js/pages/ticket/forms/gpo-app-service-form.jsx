import { useEffect, useState } from "react";
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
import PhoneInput from "@/components/custom/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { deviceOSTooltip } from "@/utils/component-utils";
import NumericInput from "@/components/custom/numeric-input";

export default function GpoAppServiceForm({
    editMode = false,
    data,
    setData,
    errors,
    reset,
    setError,
    clearErrors,
}) {
    const isCustomerMobtelRequired = [
        "cash_in_via_mobtel",
        // "cash_in_via_code",
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

    const showCustomerMobtel =
        data.service_type !== "bills_pay" &&
        data.service_type !== "gpo_insure" &&
        data.service_type !== "dagdag_pondo" &&
        data.service_type !== "cash_in_via_code" &&
        data.service_type !== "claim_padala";

    return (
        <>
            <div className="align-top min-h-20">
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
                        <PhoneInput
                            id="gpo_mobile_number"
                            editabledisplaymode={editMode}
                            placeholder="ex: 0999 123 4567"
                            value={data.gpo_mobile_number}
                            onBlur={() => {
                                if (
                                    data.gpo_mobile_number &&
                                    !isValidPhoneNumber(data.gpo_mobile_number)
                                ) {
                                    setError(
                                        "gpo_mobile_number",
                                        "Invalid phone number"
                                    );
                                }
                            }}
                            onChange={(inputValue) => {
                                setData("gpo_mobile_number", inputValue);
                                clearErrors("gpo_mobile_number");
                            }}
                        />
                    }
                />
            </div>

            {showCustomerMobtel && (
                <div className="align-top min-h-20">
                    <FormField
                        required={isCustomerMobtelRequired}
                        label="Customer mobile number"
                        htmlFor="customer_mobile_number"
                        error={errors.customer_mobile_number}
                        render={
                            <PhoneInput
                                id="customer_mobile_number"
                                editabledisplaymode={editMode}
                                placeholder="ex: 0999 123 4567"
                                value={data.customer_mobile_number}
                                onBlur={() => {
                                    if (
                                        data.customer_mobile_number &&
                                        !isValidPhoneNumber(
                                            data.customer_mobile_number
                                        )
                                    ) {
                                        setError(
                                            "customer_mobile_number",
                                            "Invalid phone number"
                                        );
                                    }
                                }}
                                onChange={(inputValue) => {
                                    setData(
                                        "customer_mobile_number",
                                        inputValue
                                    );
                                    clearErrors("customer_mobile_number");
                                }}
                            />
                        }
                    />
                </div>
            )}

            {data.service_type === "cash_in_via_code" && (
                <div className="align-top min-h-20">
                    <FormField
                        required
                        label="Cash in code"
                        htmlFor="cash_in_code"
                        error={errors.cash_in_code}
                        render={
                            <NumericInput
                                value={data.cash_in_code}
                                decimalScale={0}
                                maxLength={8}
                                editabledisplaymode={editMode}
                                placeholder="ex: 12345678 (8 digits)"
                                onValueChange={(values) => {
                                    setData("cash_in_code", values.value);
                                    clearErrors("cash_in_code");
                                }}
                            />
                        }
                    />
                </div>
            )}

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
                            <NumericInput
                                value={data.gpadala_ref_number}
                                decimalScale={0}
                                maxLength={13}
                                editabledisplaymode={editMode}
                                placeholder="ex: 1234567890123 (13 digits)"
                                onValueChange={(values) => {
                                    setData("gpadala_ref_number", values.value);
                                    clearErrors("gpadala_ref_number");
                                }}
                            />
                        }
                    />
                </div>
            )}

            <div className="align-top min-h-20">
                <FormField
                    required
                    label="Device type"
                    htmlFor="device_type"
                    error={errors.device_type}
                    render={
                        <Select
                            id="device_type"
                            defaultValue={data.device_type}
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
                                <SelectItem value="android">Android</SelectItem>
                                <SelectItem value="ios">iOS</SelectItem>
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
                            placeholder="ex: Samsung - Galaxy Z Fold5"
                            editabledisplaymode={editMode}
                            onChange={(e) => {
                                setData("device_model", e.target.value);
                                clearErrors("device_model");
                            }}
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
                            placeholder="ex: 1.6.2 (refer to the tooltip)"
                            editabledisplaymode={editMode}
                            onChange={(e) => {
                                setData("device_os_version", e.target.value);
                                clearErrors("device_os_version");
                            }}
                        />
                    }
                />
            </div>

            {data.service_type !== "gpo_insure" && (
                <div className="align-top min-h-20">
                    <FormField
                        required
                        label="Transaction amount"
                        htmlFor="transaction_amount"
                        error={errors.transaction_amount}
                        render={
                            <NumericInput
                                value={data.transaction_amount}
                                thousandSeparator
                                decimalScale={2}
                                placeholder="ex: 1250.05"
                                editabledisplaymode={editMode}
                                onValueChange={(values) => {
                                    setData("transaction_amount", values.value);
                                    clearErrors("transaction_amount");
                                }}
                            />
                        }
                    />
                </div>
            )}

            <div className="align-top min-h-20">
                <FormField
                    required
                    label={
                        data.service_type !== "gpo_insure"
                            ? "Transaction date and time"
                            : "Date and Time"
                    }
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
        </>
    );
}
