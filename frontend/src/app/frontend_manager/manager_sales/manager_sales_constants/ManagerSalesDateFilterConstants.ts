// RESPONSIBILITY: Owns sales date-range presets used by the sales toolbar.
/**
 * @description Provides the ManagerSalesDateFilterConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_SALES_DATE_RANGE_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;
export type ManagerSalesDateRange = typeof MANAGER_SALES_DATE_RANGE_OPTIONS[number]['value'];
