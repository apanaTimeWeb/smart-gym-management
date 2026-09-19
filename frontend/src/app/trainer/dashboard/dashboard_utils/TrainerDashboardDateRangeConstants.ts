// RESPONSIBILITY: Dashboard-owned date-range UI configuration. It is not global business configuration.
export const TRAINER_DASHBOARD_DATE_RANGE_OPTIONS = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'Last 3 Months', value: 'last_3_months' },
  { label: 'Last 6 Months', value: 'last_6_months' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Custom', value: 'custom' },
] as const;
export type TrainerDashboardDateRange = (typeof TRAINER_DASHBOARD_DATE_RANGE_OPTIONS)[number]['value'];
