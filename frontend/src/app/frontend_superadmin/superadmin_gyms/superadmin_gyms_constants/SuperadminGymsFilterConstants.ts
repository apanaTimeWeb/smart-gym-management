/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsFilterConstants owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static filter/view option configuration used by the Superadmin Gyms toolbar and status tabs.
// DATA FLOW: SuperadminGymsFilterConstants → SuperadminGymsMain/SuperadminGymsToolbar → URL/UI filter state.

export const SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'TRIAL', label: 'Trial' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const;

export const SUPERADMIN_GYMS_STATUS_SELECT_OPTIONS = SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label === 'All' ? 'All Statuses' : option.label,
}));

export const SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS = [
  { value: 'All', label: 'All Plans' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'PRO', label: 'Pro' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
] as const;

export const SUPERADMIN_GYMS_VIEW_MODE_OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'calendar', label: 'Calendar' },
] as const;
