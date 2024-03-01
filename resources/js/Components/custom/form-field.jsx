import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TooltipIcon } from "./tooltip-icon";
import { HelpCircle } from "lucide-react";

const FormField = ({
    label,
    htmlFor,
    render,
    error,
    tooltipContent,
    required,
    className,
}) => {
    return (
        <div
            className={cn(
                "grid w-full gap-0.5",
                error &&
                    "child-input:border-rose-700 child-input-focus:border-2 child-input-focus:border-rose-700 child-input-focus-visible:outline-none child-input-focus-visible:ring-0 child-button:border-rose-700 child-button-focus:border-2 child-button-focus:border-rose-700 child-button-focus-visible:outline-none child-button-focus-visible:ring-0 child-textarea:border-rose-700 child-textarea-focus:border-2 child-textarea-focus:border-rose-700 child-textarea-focus-visible:outline-none child-textarea-focus-visible:ring-0",
                className
            )}
        >
            <div className="flex gap-1">
                <Label htmlFor={htmlFor} className="leading-5">
                    {label}
                    {required && (
                        <span className="text-sm text-rose-700 ml-1">*</span>
                    )}
                </Label>
                {tooltipContent && (
                    <TooltipIcon
                        icon={
                            <HelpCircle size="18" color="white" fill="gray" />
                        }
                        content={tooltipContent}
                    />
                )}
            </div>
            {render}
            <p className="text-sm text-rose-700">{error}</p>
        </div>
    );
};

export default FormField;
