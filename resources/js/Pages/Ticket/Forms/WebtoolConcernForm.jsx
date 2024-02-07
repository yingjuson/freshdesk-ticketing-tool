import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function WebtoolConcernForm({
    data,
    setData,
    errors,
    clearErrors,
}) {
    return (
        <>
            <div className="grid grid-cols-2 items-center">
                <div className="gap-1">
                    <Label htmlFor="portal-type">Portal type</Label>
                    <Select
                        id="portal-type"
                        onValueChange={(value) => {
                            clearErrors("portal_type");
                            setData("portal_type", value);
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select portal type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="distributor_portal">
                                    Distributor portal
                                </SelectItem>
                                <SelectItem value="onboarding_portal">
                                    Onboarding portal
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.portal_type && (
                        <p className="text-sm text-red-500 ml-2">
                            {errors.portal_type}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-1">
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Input
                        id="role"
                        name="role"
                        className="col-span-2"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                    />
                    {errors.role && (
                        <p className="text-sm text-red-500 ml-2">
                            {errors.role}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid w-full items-center gap-1">
                <Label htmlFor="issue-details">Issue details</Label>
                <Textarea
                    placeholder="Enter issue details here."
                    id="issue-details"
                    name="issue_details"
                    value={data.issue_details}
                    onChange={(e) => setData("issue_details", e.target.value)}
                    className={errors.issue_details ? "border-red-500" : ""}
                />
                <Label className="text-sm font-normal text-slate-400 ml-2">
                    If error message is displayed, please specify.
                </Label>
                {errors.issue_details && (
                    <p className="text-sm text-red-500 ml-2">
                        {errors.issue_details}
                    </p>
                )}
            </div>
        </>
    );
}
