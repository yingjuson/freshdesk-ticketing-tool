import { KEY_FLATTENED_CONCERN_TYPES } from "@/constants/concern-type-constants";
import { Badge } from "@/components/ui/badge";

/**
 *
 * @param {*} concernType
 * @returns Styled concern type badge
 */
export const getConcernTypeBadge = (concernType) => {
    const appRelatedConcerns = [
        "gpo_app_service",
        "suspended_gpo",
        "returned_application",
        "partially_approved_gpo",
        "displays_signup_page",
        "stuck_in_loading_screen",
        "cannot_view_gpo_logbook",
        "cannot_view_gpo_wallet_balance",
    ];

    if (appRelatedConcerns.includes(concernType)) {
        return <Badge>{KEY_FLATTENED_CONCERN_TYPES[concernType]}</Badge>;
    }

    return (
        <Badge variant="sky">{KEY_FLATTENED_CONCERN_TYPES[concernType]}</Badge>
    );
};

/**
 *
 * @param {*} concernType
 * @returns Styled status badge
 */
export const getStatusBadge = (status) => {
    let variant = "new";

    switch (status) {
        case "new":
            variant = "new";
            break;
        case "in_progress":
            variant = "inProgress";
            break;
        case "cancelled":
            variant = "secondary";
            break;
        case "resolved":
            variant = "resolved";
            break;
    }

    return <Badge variant={variant}>{status.replace("_", " ")}</Badge>;
};
