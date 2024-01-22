import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Ticket({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket
                </h2>
            }
        >
            <Head title="Ticket" />

            <Dialog>
                <DialogTrigger asChild>
                    <Button>New ticket</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create new ticket</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Service type
                            </Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>GPO services</SelectLabel>
                                        <SelectItem value="cash-in">
                                            Cash in
                                        </SelectItem>
                                        <SelectItem value="cash-out">
                                            Cash out
                                        </SelectItem>
                                        <SelectItem value="bills pay">
                                            Bills pay
                                        </SelectItem>
                                        <SelectItem value="gpadala">
                                            GPadala
                                        </SelectItem>
                                        <SelectItem value="em-transfer">
                                            EM transfer
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="other-services">Others:</Label>
                            <Input
                                id="other-services"
                                value=""
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid w-full items-center gap-4">
                            <Label htmlFor="issue_details">Issue details</Label>
                            <Textarea
                                placeholder="Enter issue details here."
                                id="issue-details"
                            />
                            <p className="text-sm text-muted-foreground">
                                If error message is displayed, please specify.
                            </p>
                            {/* <p className="text-sm text-muted-foreground">
                                If for report generation, please specify date
                                range and status.
                            </p> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
