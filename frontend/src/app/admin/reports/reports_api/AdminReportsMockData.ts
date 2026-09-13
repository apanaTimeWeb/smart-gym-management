import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';

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
  ],
  attendanceSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', avgDailyAttendance: 850, peakDay: 'Monday', attendanceRate: 75.5, totalCheckIns: 25500 },
    { gymId: 'g2', gymName: 'Westside Gym', avgDailyAttendance: 620, peakDay: 'Tuesday', attendanceRate: 68.2, totalCheckIns: 18600 },
  ],
  payrollSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', totalStaff: 45, totalPayroll: 850000, paid: 850000, pending: 0, advances: 50000 },
    { gymId: 'g2', gymName: 'Westside Gym', totalStaff: 30, totalPayroll: 620000, paid: 600000, pending: 20000, advances: 15000 },
  ],
  pnlSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', revenue: 1500000, membershipRevenue: 1200000, storeRevenue: 300000, totalExpenses: 800000, staffCost: 450000, operationalCost: 350000, netProfit: 700000, profitMargin: 46.6 },
    { gymId: 'g2', gymName: 'Westside Gym', revenue: 800000, membershipRevenue: 700000, storeRevenue: 100000, totalExpenses: 600000, staffCost: 350000, operationalCost: 250000, netProfit: 200000, profitMargin: 25.0 },
  ],
  kpis: {
    totalRevenue: 2700000,
    totalExpenses: 1750000,
    netProfit: 950000,
    totalMembers: 12500,
    newMembers: 850,
    avgAttendanceRate: 71.8,
    totalPayroll: 1850000,
  }
};
