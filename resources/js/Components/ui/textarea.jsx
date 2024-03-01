import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
    ({ className, helperText, helperText2, ...props }, ref) => {
        return (
            <>
                <textarea
                    className={cn(
                        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-40",
                        props.editabledisplaymode
                            ? "p-1 border-transparent hover:border-solid hover:border-gray-200 shadow-none resize-none"
                            : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
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
            </>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
