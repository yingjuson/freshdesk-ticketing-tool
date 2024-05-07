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
        return (
            <Badge variant="blue">
                {KEY_FLATTENED_CONCERN_TYPES[concernType]}
            </Badge>
        );
    }

    return (
        <Badge variant="indigo">
            {KEY_FLATTENED_CONCERN_TYPES[concernType]}
        </Badge>
    );
};

/**
 *
 * @param {*} concernType
 * @returns Styled status badge
 */
export const getStatusBadge = (status) => {
    const badgeLabel = status.charAt(0).toUpperCase() + status.slice(1);

    return <Badge variant={status}>{badgeLabel}</Badge>;
};

/**
 * Returns tooltip on how to get Device OS version
 */
export const deviceOSTooltip = (
    <div className="text-sm">
        <p>
            <strong>Android</strong>
            {": Go to Settings > About Phone > Android version"}
        </p>
        <p>
            <strong>iOS</strong>
            {": Go to Settings > General > About"}
        </p>
    </div>
);
