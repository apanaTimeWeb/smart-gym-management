// RESPONSIBILITY: Defines all TypeScript types for the Reports module. Single source of truth for all report data shapes.
import type { QueryStatus } from '@tanstack/react-query';

export type ReportTab = 'revenue' | 'membership' | 'attendance' | 'payroll' | 'pnl';
export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminReportsExportFormat = 'pdf' | 'csv';
export type AdminReportsTrendDirection = 'up' | 'down' | 'flat';

export interface ReportsContextType {
  activeTab: ReportTab;
  setActiveTab: (tab: ReportTab) => void;
  dateRange: ReportDateRange;
  setDateRange: (range: ReportDateRange) => void;
  startDate: string;
  endDate: string;
  setCustomDateRange: (start: string, end: string) => void;
  selectedGymId: string;
  setSelectedGymId: (id: string) => void;
  reportData: ReportData | null;
  status: QueryStatus;
}

export interface RevenueByGym {
  gymId: string;
  gymName: string;
  revenue: number;
  expenses: number;
  profit: number;
  trend: AdminReportsTrendDirection;
  trendPercent: number;
}

export interface RevenueByMethod {
  method: string;
  amount: number;
  count: number;
}

export interface RevenueByPlan {
  planName: string;
  amount: number;
  count: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface MembershipGrowthRow {
  gymId: string;
  gymName: string;
  newMembers: number;
  renewals: number;
  exits: number;
  netGrowth: number;
  activeMembers: number;
}

export interface AttendanceHeatmapCell {
  gymId: string;
  gymName: string;
  day: string;
  count: number;
  rate: number;
}

export interface AttendanceSummaryRow {
  gymId: string;
  gymName: string;
  avgDailyAttendance: number;
  peakDay: string;
  attendanceRate: number;
  totalCheckIns: number;
}

export interface PayrollSummaryRow {
  gymId: string;
  gymName: string;
  totalStaff: number;
  totalPayroll: number;
  paid: number;
  pending: number;
  advances: number;
}

export interface PnLRow {
  gymId: string;
  gymName: string;
  revenue: number;
  membershipRevenue: number;
  storeRevenue: number;
  totalExpenses: number;
  staffCost: number;
  operationalCost: number;
  netProfit: number;
  profitMargin: number;
}

export interface AdminReportsQueryParams {
  from: string;
  to: string;
  branchId?: string;
}

export interface AdminReportsExportParams extends AdminReportsQueryParams {
  type: ReportTab;
  format: AdminReportsExportFormat;
}

export interface RevenueReportData {
  revenueByGym: RevenueByGym[];
  revenueByMethod: RevenueByMethod[];
  revenueByPlan: RevenueByPlan[];
  monthlyRevenue: MonthlyRevenue[];
  kpis: ReportData['kpis'];
}

export interface AttendanceReportData {
  attendanceSummary: AttendanceSummaryRow[];
  attendanceHeatmap: AttendanceHeatmapCell[];
}

export interface MembershipReportData {
  membershipGrowth: MembershipGrowthRow[];
}

export interface PayrollReportData {
  payrollSummary: PayrollSummaryRow[];
}

export interface PnLReportData {
  pnlSummary: PnLRow[];
  kpis: Pick<ReportData['kpis'], 'totalRevenue' | 'totalExpenses' | 'netProfit' | 'totalPayroll'>;
}

export interface ReportData {
  revenueByGym: RevenueByGym[];
  revenueByMethod: RevenueByMethod[];
  revenueByPlan: RevenueByPlan[];
  monthlyRevenue: MonthlyRevenue[];
  membershipGrowth: MembershipGrowthRow[];
  attendanceSummary: AttendanceSummaryRow[];
  attendanceHeatmap?: AttendanceHeatmapCell[];
  payrollSummary: PayrollSummaryRow[];
  pnlSummary: PnLRow[];
  kpis: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    totalMembers: number;
    newMembers: number;
    avgAttendanceRate: number;
    totalPayroll: number;
  };
}
