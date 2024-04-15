import { cn } from "@/lib/utils";
import ReactPhoneInput from "react-phone-number-input/input";

const CHAR_MAX_LENGTH = 13; // 11 digits plus 2 spaces for formatting
const DEFAULT_COUNTRY = "PH";

const PhoneInput = ({ className, editabledisplaymode = false, ...props }) => (
    <ReactPhoneInput
        maxLength={CHAR_MAX_LENGTH}
        country={DEFAULT_COUNTRY}
        className={cn(
            "flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            editabledisplaymode &&
                "p-1 border-transparent hover:border-solid hover:border-gray-200 shadow-none [&>svg]:display-none",
            className
        )}
        {...props}
    />
);

export default PhoneInput;
