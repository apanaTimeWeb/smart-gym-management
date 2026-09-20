// RESPONSIBILITY: Mock data, styles, and shared constants for the Manager Reports module.

export const REPORT_TABS = ['Revenue', 'Attendance', 'Members', 'Expenses'] as const;

export const REPORT_DATE_RANGE_OPTIONS = [
  { label: 'Last 7 Days',   value: '7d'  },
  { label: 'Last 30 Days',  value: '30d' },
  { label: 'Last 3 Months', value: '3m'  },
  { label: 'Last 6 Months', value: '6m'  },
  { label: 'Last 12 Months',value: '12m' },
];

export const EXPENSE_CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Rent:        { bg: 'bg-danger-bg',   text: 'text-danger'   },
  Salaries:    { bg: 'bg-warning-bg',  text: 'text-warning'  },
  Equipment:   { bg: 'bg-info-bg',     text: 'text-info'     },
  Utilities:   { bg: 'bg-primary-subtle',  text: 'text-primary'  },
  Marketing:   { bg: 'bg-success-bg',  text: 'text-success'  },
  Maintenance: { bg: 'bg-purple-bg',  text: 'text-purple-text'   },
  Other:       { bg: 'bg-input',text: 'text-secondary'} };


