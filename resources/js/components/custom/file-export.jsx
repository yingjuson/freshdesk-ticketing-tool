import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download } from "lucide-react";

export const FileExport = () => (
    <Popover>
        <PopoverTrigger asChild>
            <Button
                variant="ghost"
                className="gap-2 ml-4 text-primary font-semibold"
            >
                <Download size="16" />
                Export
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h3 className="font-medium leading-none">Data export</h3>
                    <p className="text-sm text-muted-foreground">
                        Select the date range and the fields you wish to
                        include.
                    </p>
                </div>
                <form
                    id="export-form"
                    action={route("files.export")}
                    method="GET"
                    target="_blank"
                >
                    <div className="grid gap-3">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="file_type">File type</Label>
                            <RadioGroup
                                id="file_type"
                                className="flex"
                                name="file_type"
                                defaultValue="csv"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="csv" id="csv_type" />
                                    <Label htmlFor="csv_type">csv</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="excel"
                                        id="excel_type"
                                    />
                                    <Label htmlFor="excel_type">excel</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="start_date">Start date</Label>
                            <Input
                                required
                                id="start_date"
                                name="start_date"
                                type="date"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="end_date">End date</Label>
                            <Input
                                required
                                id="end_date"
                                name="end_date"
                                type="date"
                                className="col-span-2 h-8"
                            />
                        </div>

                        <Button>Export</Button>
                    </div>
                </form>
            </div>
        </PopoverContent>
    </Popover>
);
