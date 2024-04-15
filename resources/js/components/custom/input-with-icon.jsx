import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const InputWithIcon = ({ icon, className, ...props }) => {
    return (
        <div className="relative">
            <div className="absolute rounded-l-md bg-blue-500 inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-3">
                <Search color="white" size="16" />
            </div>
            <Input {...props} className={cn("w-96 pl-14", className)} />
        </div>
    );
};

export default InputWithIcon;
