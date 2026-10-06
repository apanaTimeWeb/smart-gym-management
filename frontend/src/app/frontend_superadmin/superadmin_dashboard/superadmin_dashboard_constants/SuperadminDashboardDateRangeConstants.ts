/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardDateRangeConstants owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Dashboard date-range and tenant-status identifiers.
export const SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  TRIAL: 'TRIAL',
  CANCELLED: 'CANCELLED',
} as const;

export const SUPERADMIN_DASHBOARD_TIME_RANGES = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom', 'this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year'] as const;
export const SUPERADMIN_DASHBOARD_CUSTOM_DATE_FIELDS = ['start', 'end'] as const;
