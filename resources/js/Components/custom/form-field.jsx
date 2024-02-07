import { Label } from "@/components/ui/label";

const FormField = ({ label, htmlFor, render, error, required, muted }) => {
    return (
        <div className="grid w-full gap-0.5">
            <Label
                htmlFor={htmlFor}
                className="leading-5"
                // className={error ? "text-rose-600 font-bold" : ""}
            >
                {label}
                {required && (
                    <span className="text-sm text-rose-600 ml-1">*</span>
                )}
            </Label>
            {render}
            {error && <p className="text-xs text-rose-600">{error}</p>}
        </div>
    );
};

export default FormField;
