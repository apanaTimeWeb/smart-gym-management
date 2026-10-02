/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCouponsConstants owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static status and date-filter configuration for the Superadmin Coupons feature.
export const SUPERADMIN_COUPON_STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'DELETED', label: 'Deleted' },
] as const;

export const SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS = [
  { value: 'PERCENTAGE', label: 'Percentage' },
  { value: 'EXACT', label: 'Exact Amount' },
] as const;

export const SUPERADMIN_COUPONS_DATE_FILTER_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' },
  { value: 'yearly', label: 'Yearly (All Time)' },
  { value: 'custom', label: 'Custom Range' },
] as const;

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_COUPON_STATUS_CODES = Object.freeze({
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
  DEPLETED: 'DEPLETED',
  EXPIRED: 'EXPIRED',

} as const);

export const SUPERADMIN_COUPONS_KPI_TYPES = ['ALL', 'ACTIVE', 'REDEEMED'] as const;
