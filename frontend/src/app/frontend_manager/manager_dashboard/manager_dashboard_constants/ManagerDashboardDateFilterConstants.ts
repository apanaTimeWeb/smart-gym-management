// RESPONSIBILITY: Owns dashboard date-range presets used by the dashboard toolbar.
/**
 * @description Provides the ManagerDashboardDateFilterConstants implementation for the dashboard module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_DASHBOARD_DATE_RANGE_OPTIONS = [
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;

export type ManagerDashboardDateRange = typeof MANAGER_DASHBOARD_DATE_RANGE_OPTIONS[number]['value'];
export type ManagerDashboardDateField = 'startDate' | 'endDate';
