import * as React from "react";

import { cn } from "@/lib/utils";

const MAX_INPUT_LENGTH = 10000;

const Textarea = React.forwardRef(
    ({ className, helperText, helperText2, ...props }, ref) => {
        return (
            <>
                <textarea
                    className={cn(
                        "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-40",
                        props.editabledisplaymode
                            ? "p-1 border-transparent hover:border-solid hover:border-gray-200 shadow-none resize-none"
                            : "",
                        className
                    )}
                    ref={ref}
                    maxLength={MAX_INPUT_LENGTH}
                    {...props}
                />
                <div id="textarea-helpers" className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        {helperText && (
                            <p className="text-sm text-muted-foreground">
                                {helperText}
                            </p>
                        )}
                        {helperText2 && (
                            <p className="text-sm text-muted-foreground">
                                {helperText2}
                            </p>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground text-right min-w-24">
                        {`${props.value.length} / ${MAX_INPUT_LENGTH}`}
                    </p>
                </div>
            </>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
