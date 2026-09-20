import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
export interface SuperadminReportsRevenueTabProps { revenueData: RevenueRow[]; }
export interface SuperadminReportsCancellationsTabProps { cancellationsData: CancellationsRecord[]; filteredCancellationsData: CancellationsRecord[]; totalCancelledRevenue: number; avgDaysActive: number; }
export interface SuperadminReportsHealthTabProps { sortedHealthData: TenantHealthScore[]; }
export interface SuperadminReportsSummaryCardsProps { totalMRR: number; totalCancelledRevenue: number; cancellationsCount: number; avgHealthScore: number; healthDataLength: number; incomeChangePercent: number | null; dateSuffix?: string; }

export type SuperadminReportsTab = 'revenue' | 'cancellations' | 'health';
