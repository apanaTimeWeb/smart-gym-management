/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsDateRangeConstants owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Analytics date-range and boundary identifiers.
export const SUPERADMIN_ANALYTICS_DATE_RANGES = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom', 'this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year'] as const;
export const SUPERADMIN_ANALYTICS_DATE_FILTER_BOUNDARIES = ['start', 'end'] as const;
export const SUPERADMIN_ANALYTICS_TIME_RANGES = ['this_week', 'this_month', 'this_year', 'custom'] as const;
