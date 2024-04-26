import { STATUS_COLORS } from "@/constants/status-constants";
import UpdateableFormField from "@/components/custom/updateable-form-field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Circle } from "lucide-react";

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
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-96 text-sm">
                <div className="grid grid-cols-3 col-span-1">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2 flex items-center gap-1">
                        <Circle
                            color={
                                ticket.status === "in_progress"
                                    ? "lightgray"
                                    : STATUS_COLORS[ticket.status]
                            }
                            fill={STATUS_COLORS[ticket.status]}
                            size="12"
                        />
                        <div>{ticket.status}</div>
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
