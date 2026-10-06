// RESPONSIBILITY: Owns the exact Admin Reports HTTP contract; preserves the documented browser Blob export as a host-transport exception until apiFetch exposes Blob decoding.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_REPORTS_API } from '@/app/frontend_admin/admin_reports/admin_reports_url_config';
import type { AdminReportsExportParams, ReportData, RevenueReportData, AttendanceReportData, MembershipReportData, PayrollReportData, PnLReportData } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';
import { reportRevenueDataSchema, reportAttendanceDataSchema, reportMembershipDataSchema, reportPayrollDataSchema, reportPnLDataSchema } from '@/app/frontend_admin/admin_reports/admin_reports_schemas/AdminReportsSchemas';

/** Serializes the documented from/to/branchId contract without introducing module-specific URL literals outside URL config. */
function buildQuery(params: { from: string; to: string; branchId?: string }): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export const AdminReportsApi = {
  fetchRevenueReport: async (params: { from: string; to: string; branchId?: string }) => apiFetch<ApiResponse<RevenueReportData>>(`${ADMIN_REPORTS_API.revenue}${buildQuery(params)}`, { method: 'GET', dataSchema: reportRevenueDataSchema }),
  fetchAttendanceReport: async (params: { from: string; to: string; branchId?: string }) => apiFetch<ApiResponse<AttendanceReportData>>(`${ADMIN_REPORTS_API.attendance}${buildQuery(params)}`, { method: 'GET', dataSchema: reportAttendanceDataSchema }),
  fetchMembershipReport: async (params: { from: string; to: string; branchId?: string }) => apiFetch<ApiResponse<MembershipReportData>>(`${ADMIN_REPORTS_API.members}${buildQuery(params)}`, { method: 'GET', dataSchema: reportMembershipDataSchema }),
  fetchPayrollReport: async (params: { from: string; to: string; branchId?: string }) => apiFetch<ApiResponse<PayrollReportData>>(`${ADMIN_REPORTS_API.payroll}${buildQuery(params)}`, { method: 'GET', dataSchema: reportPayrollDataSchema }),
  fetchPnLReport: async (params: { from: string; to: string; branchId?: string }) => apiFetch<ApiResponse<PnLReportData>>(`${ADMIN_REPORTS_API.pnl}${buildQuery(params)}`, { method: 'GET', dataSchema: reportPnLDataSchema }),
  fetchReportData: async (params: { from: string; to: string; branchId?: string }): Promise<ApiResponse<ReportData>> => {
    const [revenue, attendance, membership, payroll, pnl] = await Promise.all([
      AdminReportsApi.fetchRevenueReport(params),
      AdminReportsApi.fetchAttendanceReport(params),
      AdminReportsApi.fetchMembershipReport(params),
      AdminReportsApi.fetchPayrollReport(params),
      AdminReportsApi.fetchPnLReport(params),
    ]);
    return {
      success: true,
      message: revenue.message,
      data: {
        revenueByGym: revenue.data!.revenueByGym,
        revenueByMethod: revenue.data!.revenueByMethod,
        revenueByPlan: revenue.data!.revenueByPlan,
        monthlyRevenue: revenue.data!.monthlyRevenue,
        membershipGrowth: membership.data!.membershipGrowth,
        attendanceSummary: attendance.data!.attendanceSummary,
        attendanceHeatmap: attendance.data!.attendanceHeatmap,
        payrollSummary: payroll.data!.payrollSummary,
        pnlSummary: pnl.data!.pnlSummary,
        kpis: revenue.data!.kpis,
      },
    };
  },
  exportReport: async (params: AdminReportsExportParams, locale = 'en'): Promise<Blob> => {
    const query = new URLSearchParams({ type: params.type, format: params.format, from: params.from, to: params.to });
    if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
    const response = await fetch(`${ADMIN_REPORTS_API.export}?${query.toString()}`, { method: 'GET', headers: { Accept: 'text/csv', 'Accept-Language': locale }, credentials: 'include' });
    if (!response.ok) throw new Error(`Report export failed with status ${response.status}`);
    return response.blob();
  },
};
