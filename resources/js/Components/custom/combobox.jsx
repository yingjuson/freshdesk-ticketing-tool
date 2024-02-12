import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { toLowerCaseUnderscoreSeparated } from "@/Utils/stringUtils";

export function Combobox({
    options,
    placeholder,
    searchPlaceholder,
    disabled,
    name,
    onChange,
    value,
}) {
    const [open, setOpen] = useState(false);

    const displaySelected = () => {
        if (!value) {
            return placeholder;
        }

        const selectedOption = options.find(
            (option) => toLowerCaseUnderscoreSeparated(option.label) === value
        );

        return selectedOption?.label;
    };

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="min-w-fit justify-between"
                >
                    {displaySelected()}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit max-w-72 px-0 py-1">
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder || "Search options"}
                        className="h-9 m-1"
                    />
                    <ScrollArea className="h-52 scroll-auto ">
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={toLowerCaseUnderscoreSeparated(
                                        option.label
                                    )}
                                    onSelect={(currentValue) => {
                                        onChange(name, currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
