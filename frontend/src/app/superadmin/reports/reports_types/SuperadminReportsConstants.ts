// RESPONSIBILITY: Static hardcoded data and style constants for the Reports module.
// All mock data lives here so the client component stays pure UI. Replace with API calls tomorrow.
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
// Removed REVENUE_DATA, CANCELLATIONS_DATA, and HEALTH_DATA to enforce dynamic API usage.
export const GRADE_STYLES: Record<string, string> = {
    A: 'bg-success-bg text-success border border-border',
    B: 'bg-primary-subtle text-primary border border-border',
    C: 'bg-warning-bg text-warning border border-border',
    D: 'bg-danger-bg text-danger border border-border',
    F: 'bg-danger-bg text-danger border border-border font-bold',
};
export const PAYMENT_HEALTH_STYLES: Record<string, string> = {
    GOOD: 'text-success',
    AT_RISK: 'text-warning',
    OVERDUE: 'text-danger',
};
/** Threshold above which support ticket count is shown in danger color. */
export const TICKET_DANGER_THRESHOLD = 10;
/** Threshold above which support ticket count is shown in warning color. */
export const TICKET_WARNING_THRESHOLD = 5;
