// RESPONSIBILITY: Defines canonical Superadmin Dashboard date-range and tenant-status identifiers.
export const SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  TRIAL: 'TRIAL',
  CANCELLED: 'CANCELLED',
} as const;

export const SUPERADMIN_DASHBOARD_TIME_RANGES = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom', 'this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year'] as const;
export const SUPERADMIN_DASHBOARD_CUSTOM_DATE_FIELDS = ['start', 'end'] as const;
