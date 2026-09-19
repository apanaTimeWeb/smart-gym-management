// RESPONSIBILITY: Owns reports date-range presets used by the reports toolbar.
export const MANAGER_REPORTS_DATE_RANGE_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' },
  { value: 'yearly', label: 'Yearly (All Time)' },
] as const;
export type ManagerReportsDateRange = typeof MANAGER_REPORTS_DATE_RANGE_OPTIONS[number]['value'];
