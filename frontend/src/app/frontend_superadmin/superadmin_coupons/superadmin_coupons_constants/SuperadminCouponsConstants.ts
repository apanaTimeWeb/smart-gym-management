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
  { value: 'ALL', labelKey: 'ui.option_all_statuses' },
  { value: 'ACTIVE', labelKey: 'ui.option_active' },
  { value: 'INACTIVE', labelKey: 'ui.option_inactive' },
  { value: 'DELETED', labelKey: 'ui.option_deleted' },
] as const;

export const SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS = [
  { value: 'PERCENTAGE', labelKey: 'ui.option_percentage' },
  { value: 'EXACT', labelKey: 'ui.option_exact_amount' },
] as const;

export const SUPERADMIN_COUPONS_DATE_FILTER_OPTIONS = [
  { value: 'this_month', labelKey: 'ui.date_this_month' },
  { value: 'last_month', labelKey: 'ui.date_last_month' },
  { value: 'last_3_months', labelKey: 'ui.date_last_3_months' },
  { value: 'last_6_months', labelKey: 'ui.date_last_6_months' },
  { value: 'this_year', labelKey: 'ui.date_this_year' },
  { value: 'monthly', labelKey: 'ui.date_monthly_all_time' },
  { value: 'yearly', labelKey: 'ui.date_yearly_all_time' },
  { value: 'custom', labelKey: 'ui.date_custom_range' },
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
