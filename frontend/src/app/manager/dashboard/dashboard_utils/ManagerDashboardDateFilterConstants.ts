// RESPONSIBILITY: Owns dashboard date-range presets used by the dashboard toolbar.
export const MANAGER_DASHBOARD_DATE_RANGE_OPTIONS = [
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;

export type ManagerDashboardDateRange = typeof MANAGER_DASHBOARD_DATE_RANGE_OPTIONS[number]['value'];
export type ManagerDashboardDateField = 'startDate' | 'endDate';
