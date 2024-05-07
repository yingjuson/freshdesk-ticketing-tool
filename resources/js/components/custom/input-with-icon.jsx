import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const InputWithIcon = ({ icon, className, ...props }) => {
    return (
        <div className="relative">
            <div className="absolute rounded-l-md h-9 bg-transparent inset-y-0 start-2 flex items-center ps-3 pointer-events-none p-3">
                <Search className="text-primary" size="16" strokeWidth={2} />
            </div>
            <Input
                {...props}
                className={cn(
                    "w-96 pl-12 focus:border-primary focus:border-[1px] focus:outline-none",
                    className
                )}
            />
        </div>
    );
};

export default InputWithIcon;
