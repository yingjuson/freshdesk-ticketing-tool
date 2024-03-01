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
import FormField from "@/Components/custom/form-field";
import { Combobox } from "@/Components/custom/combobox";
import { GPO_APP_SERVICES } from "@/Constants/gpo-app-constants";

export default function NonGpoAppServiceForm({
    data,
    setData,
    errors,
    clearErrors,
    editMode = false,
}) {
    return (
        <>
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
        </>
    );
}
