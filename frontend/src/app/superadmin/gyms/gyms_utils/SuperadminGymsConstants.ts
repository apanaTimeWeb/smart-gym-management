// RESPONSIBILITY: Centralized constants for the Superadmin Gyms module.
// No magic numbers or magic strings should exist in gyms_components — all live here.
// DATA FLOW: SuperadminGymsConstants → SuperadminGymsTable, SuperadminGymsToolbar, useSuperadminGymsTable

/** Number of gym rows displayed per page in the SuperadminGymsTable. */
export const GYMS_TABLE_PAGE_SIZE = 10;

/** Minimum search query length before triggering a filter. */
export const GYMS_SEARCH_MIN_LENGTH = 1;

/** Status label map for gym tenant status badges. */
export const GYMS_STATUS_LABELS = {
  ACTIVE: 'Active',
  SUSPENDED: 'Suspended',
  TRIAL: 'Trial',
  EXPIRED: 'Expired',
} as const;

/** Plan badge color map — used in SuperadminGymsTable plan badge rendering. */
export const GYMS_PLAN_COLORS = {
  ENTERPRISE: 'bg-purple-bg text-purple border border-purple',
  PRO: 'bg-primary-subtle text-primary border border-primary',
  STARTER: 'bg-success-bg text-success border border-success',
  BASIC: 'bg-success-bg text-success border border-success',
  DEFAULT: 'bg-input text-secondary border border-border',
} as const;
