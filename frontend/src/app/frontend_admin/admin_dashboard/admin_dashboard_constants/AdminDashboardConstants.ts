// RESPONSIBILITY: Owns the dashboard date-filter keys and their localized message-key mapping.
export const ADMIN_DASHBOARD_DATE_FILTER_PRESETS = [
  { value: 'this_month', messageKey: 'thisMonth' },
  { value: 'last_month', messageKey: 'lastMonth' },
  { value: 'last_3_months', messageKey: 'last3Months' },
  { value: 'last_6_months', messageKey: 'last6Months' },
  { value: 'this_year', messageKey: 'thisYear' },
  { value: 'monthly', messageKey: 'monthlyAllTime' },
  { value: 'yearly', messageKey: 'yearlyAllTime' },
  { value: 'custom', messageKey: 'customRange' },
] as const;
