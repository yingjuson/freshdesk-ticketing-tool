import { STATUS_COLORS } from "@/constants/status-constants";
import UpdateableFormField from "@/components/custom/updateable-form-field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Circle } from "lucide-react";
import FormField from "@/components/custom/form-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TicketDetailsHeader = ({
    ticket,
    data,
    errors,
    setData,
    clearErrors,
}) => (
    <>
        <div className="flex items-center">
            <span className="font-bold">{`#${ticket.id}`}</span>
            <UpdateableFormField
                required
                hideLabel={true}
                label="Subject"
                htmlFor="subject"
                error={errors.subject}
                render={
                    <Input
                        id="subject"
                        editabledisplaymode
                        value={data.subject}
                        className="ml-2 my-3 font-bold text-base"
                        onChange={(e) => {
                            setData("subject", e.target.value);
                            clearErrors("subject");
                        }}
                    />
                }
            />
        </div>

        <div className="bg-slate-100 w-full py-2 px-4 rounded-md">
            <div className="grid grid-cols-2 gap-x-10 gap-y-1 w-[27rem] text-sm items-center">
                <div className="grid grid-cols-3 col-span-1 items-center gap-1">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2 flex gap-1">
                        <FormField
                            htmlFor="status"
                            error={errors.status}
                            render={
                                <Select
                                    id="status"
                                    defaultValue={ticket.status}
                                    onValueChange={(value) => {
                                        setData("status", value);
                                        clearErrors("status");
                                    }}
                                >
                                    <SelectTrigger className="w-full py-1 w-36 h-fit gap-1 bg-white">
                                        <Circle
                                            color={STATUS_COLORS[data.status]}
                                            fill={STATUS_COLORS[data.status]}
                                            size="12"
                                        />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">
                                            Open
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="resolved">
                                            Resolved
                                        </SelectItem>
                                        <SelectItem value="closed">
                                            Closed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 col-span-1">
                    <div className="col-span-1">Created at</div>
                    <div className="col-span-1">
                        {format(new Date(ticket.created_at), "yyyy-MM-dd")}
                    </div>
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[0.75em] font-bold bg-sky-500">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <p>Unassigned</p>
                </div>

                <div className="grid grid-cols-2 col-span-1">
                    <div className="col-span-1">Updated at</div>
                    <div className="col-span-1">
                        {format(new Date(ticket.updated_at), "yyyy-MM-dd")}
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default TicketDetailsHeader;
