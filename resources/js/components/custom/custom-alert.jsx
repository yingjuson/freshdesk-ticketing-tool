import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const CustomAlert = ({ variant, title, description }) => (
    <Alert variant={variant} className="w-5/6 py-2">
        <ShieldAlert size="18" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
    </Alert>
);
