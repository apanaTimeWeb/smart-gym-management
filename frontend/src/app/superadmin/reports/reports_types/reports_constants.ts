// RESPONSIBILITY: Static hardcoded data and style constants for the Reports module.
// All mock data lives here so the client component stays pure UI. Replace with API calls tomorrow.

import type { RevenueRow, ChurnRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/reports_types';

/** Premium gold gradient applied to all KPI stat cards. Design §5a. */
export const KPI_CARD_GRADIENT = 'linear-gradient(180deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))';

// Removed REVENUE_DATA, CHURN_DATA, and HEALTH_DATA to enforce dynamic API usage.

export const GRADE_STYLES: Record<string, string> = {
  A: 'bg-success/10 text-success border border-success/30',
  B: 'bg-primary/10 text-primary border border-primary/30',
  C: 'bg-warning/10 text-warning border border-warning/30',
  D: 'bg-danger/10 text-danger border border-danger/30',
  F: 'bg-danger/20 text-danger border border-danger/50 font-bold',
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
