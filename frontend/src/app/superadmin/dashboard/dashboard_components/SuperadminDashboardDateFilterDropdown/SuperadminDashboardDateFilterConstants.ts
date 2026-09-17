// RESPONSIBILITY: Defines the time range preset options for the Dashboard date filter dropdown.
export const DASHBOARD_DATE_FILTER_OPTIONS = [
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'this_year', label: 'This Year' },
    { value: 'monthly', label: 'Monthly (All Time)' },
    { value: 'yearly', label: 'Yearly (All Time)' },
    { value: 'custom', label: 'Custom Range' },
] as const;
