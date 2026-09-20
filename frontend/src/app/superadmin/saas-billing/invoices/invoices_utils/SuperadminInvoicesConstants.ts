// RESPONSIBILITY: Owns static status and date-filter configuration for the Superadmin Invoices feature.
export const SUPERADMIN_INVOICE_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'OVERDUE', label: 'Overdue' },
  { value: 'FAILED', label: 'Failed' },
] as const;

export const SUPERADMIN_INVOICES_DATE_FILTER_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' },
  { value: 'yearly', label: 'Yearly (All Time)' },
  { value: 'custom', label: 'Custom Range' },
] as const;
