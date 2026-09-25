// RESPONSIBILITY: Type contract extracted from SuperadminInvoicesStatsBar.tsx; no business behavior.


export interface SuperadminInvoicesStatsBarProps {
    totalRevenue: number;
    failedRevenue: number;
    pendingRevenue: number;
    overdueCount: number;
    currency?: string;
}
