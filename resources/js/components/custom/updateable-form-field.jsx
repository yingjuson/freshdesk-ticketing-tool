import { Label } from "@/components/ui/label";

const UpdateableFormField = ({
    label,
    htmlFor,
    render,
    error,
    required,
    hideLabel,
}) => {
    return (
        <div className="grid w-full gap-0.5">
            {!hideLabel && (
                <Label htmlFor={htmlFor} className="leading-5 font-bold">
                    {label}
                    {required && (
                        <span className="text-sm text-rose-700 ml-1">*</span>
                    )}
                </Label>
            )}

            {render}
            {error && <p className="text-xs text-rose-700">{error}</p>}
        </div>
    );
};

export default UpdateableFormField;
