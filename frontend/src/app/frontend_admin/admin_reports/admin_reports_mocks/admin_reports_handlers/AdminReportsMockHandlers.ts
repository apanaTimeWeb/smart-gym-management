// RESPONSIBILITY: Owns MSW handlers for the exact Admin Reports read/export contract.
import { StatusCodes } from 'http-status-codes';
// DATA FLOW: reports API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { getAdminReportsFixture } from '@/app/frontend_admin/admin_reports/admin_reports_mocks/admin_reports_fixtures/AdminReportsMockFixtures';
import type { ReportDateRange } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';

const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data });

function fixtureFor(request: Request) {
  const url = new URL(request.url);
  return getAdminReportsFixture({
    gymId: url.searchParams.get('branchId') ?? 'all',
    dateRange: 'custom' as ReportDateRange,
  });
}

export const adminReportsMockHandlers = [
  http.get('*/admin/reports/revenue', ({ request }) => {
    const data = fixtureFor(request);
    return ok({ revenueByGym: data.revenueByGym, revenueByMethod: data.revenueByMethod, revenueByPlan: data.revenueByPlan, monthlyRevenue: data.monthlyRevenue, kpis: data.kpis });
  }),
  http.get('*/admin/reports/attendance', ({ request }) => {
    const data = fixtureFor(request);
    return ok({ attendanceSummary: data.attendanceSummary, attendanceHeatmap: data.attendanceHeatmap ?? [] });
  }),
  http.get('*/admin/reports/members', ({ request }) => {
    const data = fixtureFor(request);
    return ok({ membershipGrowth: data.membershipGrowth });
  }),
  http.get('*/admin/reports/payroll', ({ request }) => {
    const data = fixtureFor(request);
    return ok({ payrollSummary: data.payrollSummary });
  }),
  http.get('*/admin/reports/pnl', ({ request }) => {
    const data = fixtureFor(request);
    return ok({ pnlSummary: data.pnlSummary, kpis: { totalRevenue: data.kpis.totalRevenue, totalExpenses: data.kpis.totalExpenses, netProfit: data.kpis.netProfit, totalPayroll: data.kpis.totalPayroll } });
  }),
  http.get('*/admin/reports/export', ({ request }) => {
    const url = new URL(request.url);
    const format = url.searchParams.get('format') === 'csv' ? 'csv' : 'pdf';
    const content = format === 'csv' ? 'Gym,Revenue\nDowntown Main,1500000\n' : '%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n';
    return new HttpResponse(new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/pdf' }), { status: StatusCodes.OK, headers: { 'Content-Type': format === 'csv' ? 'text/csv' : 'application/pdf', 'Content-Disposition': `attachment; filename="admin-report.${format}"` } });
  }),
];
