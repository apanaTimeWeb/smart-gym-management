// RESPONSIBILITY: Owns Members UI status, cycle, and filter option constants.

/**
 * @description Provides the ManagerMembersUiConstants implementation for the members module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MEMBERS_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'bg-success-bg', text: 'text-success' },
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
  EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger' },
  FROZEN: { bg: 'bg-info-bg', text: 'text-info' },
  SUSPENDED: { bg: 'bg-danger-bg', text: 'text-danger' },
  BANNED: { bg: 'bg-danger-bg', text: 'text-danger' } };

export const MEMBERS_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: '1 Month',
 THREE_MONTHS: '3 Months',
 SIX_MONTHS: '6 Months',
 TWELVE_MONTHS: '12 Months',
 CUSTOM: 'Custom (Days)' };

export const MEMBER_STATUS_OPTIONS = [
  { label: 'All Status', value: 'All' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Expired', value: 'EXPIRED' },
  { label: 'Frozen', value: 'FROZEN' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Banned', value: 'BANNED' }
];

/** Gender filter options for the Members toolbar (Rule 3B — centralized for API query param support). */

export const MEMBER_GENDER_OPTIONS = [
  { label: 'All Genders', value: 'All' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

export const MEMBER_PAYMENT_METHOD_OPTIONS = [
  { value: 'UPI', labelKey: 'COPY_UPI' },
  { value: 'CARD', labelKey: 'COPY_CARD' },
  { value: 'CASH', labelKey: 'COPY_CASH' },
  { value: 'NET_BANKING', labelKey: 'COPY_NET_BANKING' },
] as const;

export const MEMBER_RENEW_PAYMENT_METHOD_OPTIONS = [
  { value: 'UPI', label: 'UPI' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Card' },
  { value: 'NetBanking', label: 'Net Banking' },
] as const;
