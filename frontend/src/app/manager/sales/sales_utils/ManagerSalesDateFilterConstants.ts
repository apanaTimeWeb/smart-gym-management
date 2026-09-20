// RESPONSIBILITY: Owns sales date-range presets used by the sales toolbar.
export const MANAGER_SALES_DATE_RANGE_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;
export type ManagerSalesDateRange = typeof MANAGER_SALES_DATE_RANGE_OPTIONS[number]['value'];
