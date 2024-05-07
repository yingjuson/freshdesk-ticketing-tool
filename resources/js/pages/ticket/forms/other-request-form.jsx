import FormField from "@/components/custom/form-field";
import { Textarea } from "@/components/ui/textarea";

export default function OtherRequestForm({
    data,
    setData,
    errors,
    reset,
    clearErrors,
}) {
    const getPlaceholderText = () => {
        switch (data.concern_type) {
            case "gpo_bulk_distro_transfer":
                return "Requesting to transfer the following GPOs to *Name of Distro*";
            case "distro_deactivation_request":
                return "Please provide the following: \n1. Official Entity Name of Distributor for Deactivation \n2. Distributor Code and ID \n3. Location \n4. Reason(s) for deactivation";
            case "gpo_mobtel_remap":
                return "Please provide the following: \nGPO Mobile Number: \nGPO ID: \nNew Gcash Account: \nOwner's Name: \nSSS Name: \nDistributor: \nGPO Status:";
            case "data_request":
                return "Please provide the required details (what should be included in the extracted data), date range, and a template/sample file in the attachments.";
            default:
                return "Please provide details of your request";
        }
    };

    return (
        <div className="align-top col-span-3 flex">
            <FormField
                required
                label="Request details"
                htmlFor="issue_details"
                error={errors.issue_details}
                render={
                    <Textarea
                        id="issue_details"
                        className="min-h-48"
                        value={data.issue_details}
                        placeholder={getPlaceholderText()}
                        onChange={(e) => {
                            setData("issue_details", e.target.value);
                            clearErrors("issue_details");
                        }}
                    />
                }
            />
        </div>
    );
}
