// RESPONSIBILITY: Owns static White-labeling UI configuration such as status options and DNS guidance.
export const SUPERADMIN_WHITE_LABELING_SEARCH_DEBOUNCE_MS = 300;

export type SuperadminWhiteLabelingStatusFilter = 'all' | 'pending' | 'active' | 'failed';

export const SUPERADMIN_WHITE_LABELING_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'failed', label: 'Failed' },
] as const;

export const SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE = {
  recordType: 'CNAME',
  recordName: '@',
  recordValue: 'proxy.gymsmart360.com',
  propagationMessage: 'DNS propagation may take up to 48 hours.',
} as const;
