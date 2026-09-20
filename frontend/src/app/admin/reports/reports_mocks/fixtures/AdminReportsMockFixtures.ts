// RESPONSIBILITY: Owns module-specific MSW fixture data and deterministic filtering for the Admin reports feature.
// DATA FLOW: Base fixtures → requested gym/date range → shaped demo response → module API contract.

import type { ReportData, ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

export const ADMIN_REPORTS_DEMO_PDF_URL = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA1IDAgUiA+PiA+PiAvQ29udGVudHMgNCAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCAxMTggPj4Kc3RyZWFtCkJUCi9GMSAxOCBUZgo3MiA3MjAgVGQKKEFkbWluIFJlcG9ydHMgRGVtbyBFeHBvcnQpIFRqCi9GMSAxMCBUZgowIC0yNCBUZAooR2VuZXJhdGVkIGJ5IGZyb250ZW5kIGRlbW8gdHJhbnNwb3J0KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2NCAwMDAwMCBuIAowMDAwMDAwMTIxIDAwMDAwIG4gCjAwMDAwMDAyNDcgMDAwMDAgbiAKMDAwMDAwMDQxNSAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDYgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjQ4NQolJUVPRgo=';
export const ADMIN_REPORTS_DEMO_XLSX_URL = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQAAAAIAMSVMV0KCHnMCwEAAKgCAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbA==';

export const MOCK_ADMIN_REPORTS: ReportData = {
  revenueByGym: [
    { gymId: 'g1', gymName: 'Downtown Main', revenue: 1500000, expenses: 800000, profit: 700000, trend: 'up', trendPercent: 5 },
    { gymId: 'g2', gymName: 'Westside Gym', revenue: 800000, expenses: 600000, profit: 200000, trend: 'up', trendPercent: 2 },
    { gymId: 'g3', gymName: 'Northside Arena', revenue: 400000, expenses: 350000, profit: 50000, trend: 'down', trendPercent: -3 },
  ],
  revenueByMethod: [
    { method: 'UPI', amount: 1200000, count: 450 },
    { method: 'Card', amount: 800000, count: 200 },
    { method: 'Cash', amount: 400000, count: 150 },
    { method: 'NetBanking', amount: 300000, count: 100 },
  ],
  revenueByPlan: [
    { planName: 'Annual Pro', amount: 1500000, count: 300 },
    { planName: 'Quarterly Classic', amount: 800000, count: 400 },
    { planName: 'Monthly Basic', amount: 400000, count: 400 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 2000000, expenses: 1500000, profit: 500000 },
    { month: 'Feb', revenue: 2200000, expenses: 1500000, profit: 700000 },
    { month: 'Mar', revenue: 2100000, expenses: 1600000, profit: 500000 },
    { month: 'Apr', revenue: 2500000, expenses: 1600000, profit: 900000 },
    { month: 'May', revenue: 2400000, expenses: 1500000, profit: 900000 },
    { month: 'Jun', revenue: 2700000, expenses: 1750000, profit: 950000 },
  ],
  membershipGrowth: [
    { gymId: 'g1', gymName: 'Downtown Main', newMembers: 120, renewals: 450, exits: 45, netGrowth: 75, activeMembers: 4500 },
    { gymId: 'g2', gymName: 'Westside Gym', newMembers: 80, renewals: 320, exits: 30, netGrowth: 50, activeMembers: 3200 },
    { gymId: 'g3', gymName: 'Northside Arena', newMembers: 55, renewals: 180, exits: 25, netGrowth: 30, activeMembers: 1800 },
  ],
  attendanceSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', avgDailyAttendance: 850, peakDay: 'Monday', attendanceRate: 75.5, totalCheckIns: 25500 },
    { gymId: 'g2', gymName: 'Westside Gym', avgDailyAttendance: 620, peakDay: 'Tuesday', attendanceRate: 68.2, totalCheckIns: 18600 },
    { gymId: 'g3', gymName: 'Northside Arena', avgDailyAttendance: 410, peakDay: 'Wednesday', attendanceRate: 61.4, totalCheckIns: 12300 },
  ],
  attendanceHeatmap: [
    ...[
      ['g1', 'Downtown Main', 850, 75.5],
      ['g2', 'Westside Gym', 620, 68.2],
      ['g3', 'Northside Arena', 410, 61.4],
    ].flatMap(([gymId, gymName, base, rate]) => ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, index) => ({
      gymId: String(gymId), gymName: String(gymName), day,
      count: Number(base) + (index - 3) * 24,
      rate: Math.max(35, Math.min(92, Number(rate) + (index % 3 - 1) * 7)),
    }))),
  ],
  payrollSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', totalStaff: 45, totalPayroll: 850000, paid: 850000, pending: 0, advances: 50000 },
    { gymId: 'g2', gymName: 'Westside Gym', totalStaff: 30, totalPayroll: 620000, paid: 600000, pending: 20000, advances: 15000 },
    { gymId: 'g3', gymName: 'Northside Arena', totalStaff: 22, totalPayroll: 410000, paid: 390000, pending: 20000, advances: 8000 },
  ],
  pnlSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', revenue: 1500000, membershipRevenue: 1200000, storeRevenue: 300000, totalExpenses: 800000, staffCost: 450000, operationalCost: 350000, netProfit: 700000, profitMargin: 46.6 },
    { gymId: 'g2', gymName: 'Westside Gym', revenue: 800000, membershipRevenue: 700000, storeRevenue: 100000, totalExpenses: 600000, staffCost: 350000, operationalCost: 250000, netProfit: 200000, profitMargin: 25.0 },
    { gymId: 'g3', gymName: 'Northside Arena', revenue: 400000, membershipRevenue: 330000, storeRevenue: 70000, totalExpenses: 350000, staffCost: 210000, operationalCost: 140000, netProfit: 50000, profitMargin: 12.5 },
  ],
  kpis: {
    totalRevenue: 2700000,
    totalExpenses: 1750000,
    netProfit: 950000,
    totalMembers: 12500,
    newMembers: 850,
    avgAttendanceRate: 71.8,
    totalPayroll: 1880000,
  },
};

const MONTH_COUNTS: Record<ReportDateRange, number> = {
  this_month: 1,
  last_month: 1,
  last_3_months: 3,
  last_6_months: 6,
  this_year: 6,
  custom: 6,
};

function scaleNumber(value: number, ratio: number) {
  return Math.round(value * ratio);
}

export function getAdminReportsFixture({ gymId = 'all', dateRange = 'this_month' }: { gymId?: string; dateRange?: ReportDateRange }): ReportData {
  const revenueRows = gymId === 'all' ? MOCK_ADMIN_REPORTS.revenueByGym : MOCK_ADMIN_REPORTS.revenueByGym.filter((row) => row.gymId === gymId);
  const ratio = gymId === 'all' ? 1 : Math.max(0.01, (revenueRows[0]?.revenue ?? 0) / Math.max(1, MOCK_ADMIN_REPORTS.kpis.totalRevenue));
  const membershipRows = gymId === 'all' ? MOCK_ADMIN_REPORTS.membershipGrowth : MOCK_ADMIN_REPORTS.membershipGrowth.filter((row) => row.gymId === gymId);
  const attendanceRows = gymId === 'all' ? MOCK_ADMIN_REPORTS.attendanceSummary : MOCK_ADMIN_REPORTS.attendanceSummary.filter((row) => row.gymId === gymId);
  const payrollRows = gymId === 'all' ? MOCK_ADMIN_REPORTS.payrollSummary : MOCK_ADMIN_REPORTS.payrollSummary.filter((row) => row.gymId === gymId);
  const pnlRows = gymId === 'all' ? MOCK_ADMIN_REPORTS.pnlSummary : MOCK_ADMIN_REPORTS.pnlSummary.filter((row) => row.gymId === gymId);
  const baseHeatmap = MOCK_ADMIN_REPORTS.attendanceHeatmap ?? [];
  const heatmap = gymId === 'all' ? baseHeatmap : baseHeatmap.filter((row) => row.gymId === gymId);
  const months = MONTH_COUNTS[dateRange] ?? 6;
  const monthlyRevenue = MOCK_ADMIN_REPORTS.monthlyRevenue.slice(-months).map((row) => ({
    ...row,
    revenue: scaleNumber(row.revenue, ratio),
    expenses: scaleNumber(row.expenses, ratio),
    profit: scaleNumber(row.profit, ratio),
  }));
  const selectedRevenue = revenueRows.reduce((sum, row) => sum + row.revenue, 0);
  const selectedExpenses = pnlRows.reduce((sum, row) => sum + row.totalExpenses, 0);
  const selectedProfit = pnlRows.reduce((sum, row) => sum + row.netProfit, 0);
  const selectedMembers = membershipRows.reduce((sum, row) => sum + row.activeMembers, 0);
  const selectedNewMembers = membershipRows.reduce((sum, row) => sum + row.newMembers, 0);
  const selectedPayroll = payrollRows.reduce((sum, row) => sum + row.totalPayroll, 0);
  const attendanceRate = attendanceRows.length ? attendanceRows.reduce((sum, row) => sum + row.attendanceRate, 0) / attendanceRows.length : 0;

  return {
    ...MOCK_ADMIN_REPORTS,
    revenueByGym: revenueRows,
    membershipGrowth: membershipRows,
    attendanceSummary: attendanceRows,
    attendanceHeatmap: heatmap,
    payrollSummary: payrollRows,
    pnlSummary: pnlRows,
    monthlyRevenue,
    revenueByMethod: MOCK_ADMIN_REPORTS.revenueByMethod.map((item) => ({ ...item, amount: scaleNumber(item.amount, ratio), count: scaleNumber(item.count, ratio) })),
    revenueByPlan: MOCK_ADMIN_REPORTS.revenueByPlan.map((item) => ({ ...item, amount: scaleNumber(item.amount, ratio), count: scaleNumber(item.count, ratio) })),
    kpis: {
      totalRevenue: selectedRevenue,
      totalExpenses: selectedExpenses,
      netProfit: selectedProfit,
      totalMembers: selectedMembers,
      newMembers: selectedNewMembers,
      avgAttendanceRate: Math.round(attendanceRate * 10) / 10,
      totalPayroll: selectedPayroll,
    },
  };
}
