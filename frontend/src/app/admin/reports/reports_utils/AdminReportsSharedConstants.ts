// RESPONSIBILITY: Centralized constants, mock data, and shared config for the Reports module.
import type { ReportData, ReportDateRange, ReportTab } from '@/app/admin/reports/reports_types/reports_types';

export const REPORT_TABS: { value: ReportTab; label: string }[] = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'membership', label: 'Membership Growth' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'pnl', label: 'P&L' },
  { value: 'tax', label: 'Tax Liability Report' },
];

export const DATE_RANGE_OPTIONS: { value: ReportDateRange; label: string }[] = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export const REPORTS_ITEMS_PER_PAGE = 10;

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');
export const formatPercent = (n: number) => `${n.toFixed(1)}%`;


