import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
                success:
                    "success group border-green-600 bg-green-600 text-neutral-50",
                amber: "amber group border-amber-500 bg-amber-500 text-neutral-50",
                sky: "group bg-sky-800 border-sky-800 text-neutral-50",

                // status
                new: "bg-red-100 border-red-100 hover:bg-red-200 hover:border-red-200 text-black font-medium",
                inProgress:
                    "bg-yellow-100 border-yellow-100 hover:bg-yellow-200 hover:border-yellow-200 text-black font-medium",
                // cancelled:
                //     "bg-yellow-100 hover:bg-yellow-200 text-black font-medium",
                resolved:
                    "bg-lime-200 border-lime-100 hover:bg-lime-300 hover:border-lime-300 text-black font-medium",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
