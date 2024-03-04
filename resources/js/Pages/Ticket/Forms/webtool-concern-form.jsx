import FormField from "@/Components/custom/form-field";
import CustomRadioGroup from "@/Components/custom/custom-radio-group";
import {
    CSX_PORTAL_ROLES,
    DISTRO_PORTAL_ROLES,
    FINANCE_PORTAL_ROLES,
    PORTAL_TYPES,
} from "@/constants/webtool-constants";

export default function WebtoolConcernForm({
    data,
    setData,
    errors,
    clearErrors,
}) {
    const showRoleField =
        data.portal_type === "csx_portal" ||
        data.portal_type === "finance_portal" ||
        data.portal_type === "distributor_portal";

    const getRoles = () => {
        switch (data.portal_type) {
            case "csx_portal":
                return CSX_PORTAL_ROLES;
            case "finance_portal":
                return FINANCE_PORTAL_ROLES;
            case "distributor_portal":
                return DISTRO_PORTAL_ROLES;
            default:
                return [];
        }
    };

    const handlePortalTypeChange = (value) => {
        setData("portal_type", value);
        clearErrors("portal_type");
    };

    const handleRoleChange = (value) => {
        setData("webtool_role", value);
        clearErrors("webtool_role");
    };

    return (
        <>
            <div className="align-top">
                <FormField
                    label="Portal type"
                    htmlFor="portal_type"
                    error={errors.portal_type}
                    render={
                        <CustomRadioGroup
                            options={PORTAL_TYPES}
                            onChange={handlePortalTypeChange}
                            defaultValue={data.portal_type}
                        />
                    }
                />
            </div>

            {showRoleField && (
                <div className="align-top">
                    <FormField
                        label="Role"
                        htmlFor="webtool_role"
                        error={errors.webtool_role}
                        render={
                            <CustomRadioGroup
                                options={getRoles()}
                                onChange={handleRoleChange}
                                defaultValue={data.webtool_role}
                            />
                        }
                    />
                </div>
            )}
        </>
    );
}
