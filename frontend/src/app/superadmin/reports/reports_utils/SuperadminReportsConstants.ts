// RESPONSIBILITY: Owns static UI configuration for Superadmin report filters. Server data never belongs here.
export const SUPERADMIN_REPORT_PLAN_OPTIONS = [
  { value: 'ALL', label: 'All Plans' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'PRO', label: 'Pro' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'BASIC', label: 'Basic' },
] as const;
