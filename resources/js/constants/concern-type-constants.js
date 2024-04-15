// export const CONCERN_TYPES = {
//     gpo_app_service: "GPO App Service",
//     gpo_onboarding: "GPO Onboarding",
//     gpo_connection: "GPO Connection",
//     webtool: "Webtool",
//     inaccessible_report: "Inaccessible Report",
//     gpo_service_variance: "GPO Service Variance",
//     additional_recipient: "Additional Recipient",
//     data_request: "Data Request",
//     gpo_bulk_distro_transfer: "GPO Bulk Distro Transfer",
//     distro_mapping_update: "Distro Mapping Update",
//     distro_deactivation_request: "Distro Deactivation Request",
//     gpo_mobtel_remap: "GPO Mobtel Remap",
// };

export const CONCERN_TYPES = [
    {
        group: "App",
        key: "gpo_app_service",
        value: "GPO App Service",
    },
    {
        group: "App Onboarding",
        key: "partially_approved_gpo",
        value: "Partially Approved GPO",
    },
    {
        group: "App Onboarding",
        key: "suspended_gpo",
        value: "Suspended GPO",
    },
    {
        group: "App Onboarding",
        key: "returned_application",
        value: "Returned Application",
    },
    {
        group: "App Connection",
        key: "displays_signup_page",
        value: "Displays Signup Page",
    },
    {
        group: "App Connection",
        key: "stuck_in_loading_screen",
        value: "Stuck in Loading Screen",
    },
    {
        group: "App Connection",
        key: "cannot_view_gpo_logbook",
        value: "Unable to View GPO Logbook",
    },
    {
        group: "App Connection",
        key: "cannot_view_gpo_wallet_balance",
        value: "Unable to View GPO Wallet Balance",
    },
    {
        group: "Webtool",
        key: "webtool",
        value: "Webtool",
    },
    {
        group: "Reports",
        key: "inaccessible_report",
        value: "Inaccessible Report",
    },
    {
        group: "Reports",
        key: "gpo_service_variance",
        value: "GPO Service Variance",
    },
    {
        group: "Reports",
        key: "additional_recipient",
        value: "Additional Recipient",
    },
    {
        group: "Others",
        key: "gpo_bulk_distro_transfer",
        value: "GPO Bulk Distro Transfer",
    },
    {
        group: "Others",
        key: "distro_mapping_update",
        value: "Distro Mapping Update",
    },
    {
        group: "Others",
        key: "distro_deactivation_request",
        value: "Distro Deactivation Request",
    },
    {
        group: "Others",
        key: "gpo_mobtel_remap",
        value: "GPO Mobtel Remap",
    },
    // exception
    {
        group: "Others",
        key: "data_request",
        value: "Data Request",
    },
];

export const KEY_FLATTENED_CONCERN_TYPES = CONCERN_TYPES.reduce(
    (newArray, type) => {
        newArray[type.key] = type.value;
        return newArray;
    },
    []
);

export const GROUPED_CONCERN_TYPES = CONCERN_TYPES.reduce((groups, type) => {
    const { group, key, value } = type;

    if (!groups[group]) {
        groups[group] = [];
    }

    groups[group].push({ key, value });
    return groups;
}, []);
