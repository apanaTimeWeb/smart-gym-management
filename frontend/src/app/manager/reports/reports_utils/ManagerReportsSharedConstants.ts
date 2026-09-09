// RESPONSIBILITY: Mock data, styles, and shared constants for the Manager Reports module.
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';

export const REPORT_TABS = ['Revenue', 'Attendance', 'Members', 'Expenses'] as const;

export const REPORT_DATE_RANGE_OPTIONS = [
  { label: 'Last 7 Days',   value: '7d'  },
  { label: 'Last 30 Days',  value: '30d' },
  { label: 'Last 3 Months', value: '3m'  },
  { label: 'Last 6 Months', value: '6m'  },
  { label: 'Last 12 Months',value: '12m' },
];

export const EXPENSE_CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Rent:        { bg: 'bg-danger/10',   text: 'text-danger'   },
  Salaries:    { bg: 'bg-warning/10',  text: 'text-warning'  },
  Equipment:   { bg: 'bg-info/10',     text: 'text-info'     },
  Utilities:   { bg: 'bg-primary/10',  text: 'text-primary'  },
  Marketing:   { bg: 'bg-success/10',  text: 'text-success'  },
  Maintenance: { bg: 'bg-purple/10',   text: 'text-purple'   },
  Other:       { bg: 'bg-secondary/10',text: 'text-secondary'},
};


