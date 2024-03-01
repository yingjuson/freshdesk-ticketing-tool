import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CustomRadioGroup = ({ options, onChange, defaultValue }) => {
    return (
        <RadioGroup
            className="my-2"
            onValueChange={onChange}
            defaultValue={defaultValue}
        >
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                        htmlFor={option.value}
                        className="text-sm font-normal"
                    >
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
};

export default CustomRadioGroup;
