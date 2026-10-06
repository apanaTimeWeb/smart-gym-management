// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
import type { ReportDateRange, ReportTab } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';


export const REPORT_TABS: { value: ReportTab; labelKey: string }[] = [
  { value: 'revenue', labelKey: 'reports.static.revenue' },
  { value: 'membership', labelKey: 'reports.static.membership_growth' },
  { value: 'attendance', labelKey: 'reports.static.attendance' },
  { value: 'payroll', labelKey: 'reports.static.payroll' },
  { value: 'pnl', labelKey: 'reports.static.p_l' },
];

export const DATE_RANGE_OPTIONS: { value: ReportDateRange; labelKey: string }[] = [
  { value: 'this_month', labelKey: 'reports.static.this_month' },
  { value: 'last_month', labelKey: 'reports.static.last_month' },
  { value: 'last_3_months', labelKey: 'reports.static.last_3_months' },
  { value: 'last_6_months', labelKey: 'reports.static.last_6_months' },
  { value: 'this_year', labelKey: 'reports.static.this_year' },
  { value: 'custom', labelKey: 'reports.static.custom_range' },
];

export const REPORTS_ITEMS_PER_PAGE = 10;

export const EXPORT_FORMAT_OPTIONS: { value: import('@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes').AdminReportsExportFormat; labelKey: string }[] = [
  { value: 'pdf', labelKey: 'reports.static.export_as_pdf' },
  { value: 'csv', labelKey: 'reports.static.export_as_csv' },
];
