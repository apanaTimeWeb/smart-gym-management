import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
export interface SuperadminReportsRevenueTabProps { revenueData: RevenueRow[]; currency?: string; }
export interface SuperadminReportsCancellationsTabProps { cancellationsData: CancellationsRecord[]; filteredCancellationsData: CancellationsRecord[]; totalCancelledRevenue: number; avgDaysActive: number; currency?: string; }
export interface SuperadminReportsHealthTabProps { sortedHealthData: TenantHealthScore[]; }
export interface SuperadminReportsSummaryCardsProps { totalMRR: number; totalCancelledRevenue: number; cancellationsCount: number; avgHealthScore: number; healthDataLength: number; incomeChangePercent: number | null; dateSuffix?: string; currency?: string; }

export type SuperadminReportsTab = 'revenue' | 'cancellations' | 'health';
