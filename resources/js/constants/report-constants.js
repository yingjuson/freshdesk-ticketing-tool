export const REPORT_TYPE = [
    {
        value: "daily_transaction_report",
        label: "Daily Transaction Report",
    },
    {
        value: "gpo_app_report",
        label: "GPO Application Report",
    },
    {
        value: "gpo_processed_app_report",
        label: "GPO Processed Application Report",
    },
    {
        value: "gpo_daily_wallet_balance",
        label: "GPO Daily Wallet Balance",
    },
    {
        value: "distro_wallet_balance",
        label: "Distributor Wallet Balance",
    },
    {
        value: "approved_app_summary",
        label: "Approved Applications Summary",
    },
    {
        value: "gpo_failed_txn_report",
        label: "GPO Failed Transactions Report",
    },

    {
        value: "gpo_weekly_comm_payout_report",
        label: "GPO Weekly Commission Payout Report",
    },

    {
        value: "distro_total_monthly_txn_report",
        label: "Distributor Total Monthly Transactions Report",
    },
];

export const REPORT_TYPE_SORTED_ASC = REPORT_TYPE.sort((a, b) => {
    let labelA = a.label.toLowerCase(),
        labelB = b.label.toLowerCase();

    if (labelA < labelB) {
        return -1;
    }

    if (labelA > labelB) {
        return 1;
    }

    return 0;
});
