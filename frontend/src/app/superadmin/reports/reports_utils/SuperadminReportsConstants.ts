// RESPONSIBILITY: Owns static UI configuration for Superadmin report filters. Server data never belongs here.
export const SUPERADMIN_REPORT_PLAN_OPTIONS = [
  { value: 'ALL', label: 'All Plans' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'PRO', label: 'Pro' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'BASIC', label: 'Basic' },
] as const;

export const SUPERADMIN_REPORTS_DATE_PRESET_OPTIONS = [
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'LAST_MONTH', label: 'Last Month' },
  { value: 'LAST_3_MONTHS', label: 'Last 3 Months' },
  { value: 'LAST_6_MONTHS', label: 'Last 6 Months' },
  { value: 'THIS_YEAR', label: 'This Year' },
  { value: 'CUSTOM', label: 'Custom Range' },
] as const;
