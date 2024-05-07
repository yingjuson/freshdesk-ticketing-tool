import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                // main
                default:
                    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
                success:
                    "success group border-green-600 bg-green-600 text-neutral-50",

                // custom concern variants
                amber: "amber group border-amber-500 bg-amber-500 text-neutral-50",
                indigo: "group bg-indigo-300 border-indigo-300 text-black font-medium shadow",
                blue: "border-transparent bg-blue-300 text-black font-medium shadow hover:bg-blue-400",

                // custom status variants
                open: "bg-red-100 border-red-100 hover:bg-red-200 hover:border-red-200 text-black font-medium",
                closed: "bg-slate-200 border-slate-200 hover:bg-slate-300 hover:border-slate-300 text-black font-medium",
                pending:
                    "bg-yellow-100 border-yellow-100 hover:bg-yellow-200 hover:border-yellow-200 text-black font-medium",
                resolved:
                    "bg-green-200 border-green-100 hover:bg-green-300 hover:border-green-300 text-black font-medium",
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
