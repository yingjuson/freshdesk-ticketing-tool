import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { getConcernTypeBadge } from "@/utils/component-utils";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import UpdateableFormField from "@/components/custom/updateable-form-field";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, MoreHorizontal } from "lucide-react";
import { FileDropzone } from "@/components/custom/file-dropzone";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { ChevronLeft } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import TicketDetailsHeader from "./ticket-details-header";

export default function TestShow({ auth }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ticket" />
            <div className="pt-3 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <Link
                        as="button"
                        variant="ghost"
                        className="text-sm text-primary font-medium flex items-center"
                        href={route("tickets.index")}
                    >
                        <ChevronLeft size="16" strokeWidth={3} />
                        Back
                    </Link>
                    <div className="p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Button
                                    type="submit"
                                    form="update-ticket-form"
                                    className="p-2 h-6 rounded"
                                >
                                    Save changes
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-6 w-6 p-0 rounded"
                                        >
                                            <span className="sr-only">
                                                Ticket actions
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className="text-center">
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="justify-center">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <Dialog
                            open={isDeleteModalOpen}
                            onOpenChange={setIsDeleteModalOpen}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you sure you want to delete this
                                        ticket?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action is irreversible. This will
                                        delete the ticket here in the tool and
                                        its corresponding ticket in Freshdesk.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsDeleteModalOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="destructive">
                                        Proceed
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
