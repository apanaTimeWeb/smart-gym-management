import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';
import type { BranchPnlRecord, PnlPeriod } from '@/app/admin/finance/finance_types/finance_types';

export const ADMIN_MOCK_REPORT_DATA: ReportData = {
  kpis: {
    totalRevenue: 4850000,
    totalExpenses: 1620000,
    netProfit: 3230000,
    totalMembers: 1370,
    newMembers: 142,
    avgAttendanceRate: 68.4,
    totalPayroll: 820000,
  },
  revenueByGym: [
    { gymId: 'b1', gymName: 'Andheri East', revenue: 1850000, expenses: 580000, profit: 1270000, trend: 'up', trendPercent: 12.4 },
    { gymId: 'b2', gymName: 'Bandra West', revenue: 1420000, expenses: 490000, profit: 930000, trend: 'up', trendPercent: 8.1 },
    { gymId: 'b3', gymName: 'Powai', revenue: 980000, expenses: 380000, profit: 600000, trend: 'flat', trendPercent: 0.5 },
    { gymId: 'b4', gymName: 'Thane', revenue: 600000, expenses: 170000, profit: 430000, trend: 'down', trendPercent: -5.2 },
  ],
  revenueByMethod: [
    { method: 'UPI', amount: 2100000, count: 420 },
    { method: 'Cash', amount: 1400000, count: 280 },
    { method: 'Card', amount: 950000, count: 190 },
    { method: 'NetBanking', amount: 400000, count: 80 },
  ],
  revenueByPlan: [
    { planName: 'Gold Plan', amount: 1950000, count: 390 },
    { planName: 'Silver Plan', amount: 1200000, count: 300 },
    { planName: 'Basic Plan', amount: 900000, count: 450 },
    { planName: 'Annual Pro', amount: 800000, count: 80 },
  ],
  monthlyRevenue: [
    { month: 'Jul', revenue: 720000, expenses: 240000, profit: 480000 },
    { month: 'Aug', revenue: 780000, expenses: 260000, profit: 520000 },
    { month: 'Sep', revenue: 810000, expenses: 270000, profit: 540000 },
    { month: 'Oct', revenue: 850000, expenses: 280000, profit: 570000 },
    { month: 'Nov', revenue: 890000, expenses: 285000, profit: 605000 },
    { month: 'Dec', revenue: 800000, expenses: 285000, profit: 515000 },
  ],
  membershipGrowth: [
    { gymId: 'b1', gymName: 'Andheri East', newMembers: 52, renewals: 180, exits: 18, netGrowth: 34, activeMembers: 420 },
    { gymId: 'b2', gymName: 'Bandra West', newMembers: 41, renewals: 145, exits: 12, netGrowth: 29, activeMembers: 340 },
    { gymId: 'b3', gymName: 'Powai', newMembers: 28, renewals: 98, exits: 15, netGrowth: 13, activeMembers: 220 },
    { gymId: 'b4', gymName: 'Thane', newMembers: 21, renewals: 62, exits: 22, netGrowth: -1, activeMembers: 180 },
  ],
  attendanceSummary: [
    { gymId: 'b1', gymName: 'Andheri East', avgDailyAttendance: 142, peakDay: 'Monday', attendanceRate: 72.4, totalCheckIns: 4260 },
    { gymId: 'b2', gymName: 'Bandra West', attendanceRate: 68.2, avgDailyAttendance: 108, peakDay: 'Wednesday', totalCheckIns: 3240 },
    { gymId: 'b3', gymName: 'Powai', attendanceRate: 65.8, avgDailyAttendance: 74, peakDay: 'Tuesday', totalCheckIns: 2220 },
    { gymId: 'b4', gymName: 'Thane', attendanceRate: 58.1, avgDailyAttendance: 52, peakDay: 'Saturday', totalCheckIns: 1560 },
  ],
  payrollSummary: [
    { gymId: 'b1', gymName: 'Andheri East', totalStaff: 8, totalPayroll: 280000, paid: 280000, pending: 0, advances: 15000 },
    { gymId: 'b2', gymName: 'Bandra West', totalStaff: 7, totalPayroll: 245000, paid: 245000, pending: 0, advances: 10000 },
    { gymId: 'b3', gymName: 'Powai', totalStaff: 5, totalPayroll: 175000, paid: 140000, pending: 35000, advances: 5000 },
    { gymId: 'b4', gymName: 'Thane', totalStaff: 4, totalPayroll: 120000, paid: 80000, pending: 40000, advances: 8000 },
  ],
  pnlSummary: [
    { gymId: 'b1', gymName: 'Andheri East', revenue: 1850000, membershipRevenue: 1650000, storeRevenue: 200000, totalExpenses: 580000, staffCost: 280000, operationalCost: 300000, netProfit: 1270000, profitMargin: 68.6 },
    { gymId: 'b2', gymName: 'Bandra West', revenue: 1420000, membershipRevenue: 1280000, storeRevenue: 140000, totalExpenses: 490000, staffCost: 245000, operationalCost: 245000, netProfit: 930000, profitMargin: 65.5 },
    { gymId: 'b3', gymName: 'Powai', revenue: 980000, membershipRevenue: 880000, storeRevenue: 100000, totalExpenses: 380000, staffCost: 175000, operationalCost: 205000, netProfit: 600000, profitMargin: 61.2 },
    { gymId: 'b4', gymName: 'Thane', revenue: 600000, membershipRevenue: 540000, storeRevenue: 60000, totalExpenses: 170000, staffCost: 120000, operationalCost: 50000, netProfit: 430000, profitMargin: 71.7 },
  ],
};

export const ADMIN_PNL_MOCK_DATA: Record<PnlPeriod, BranchPnlRecord[]> = {
  THIS_MONTH: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi', revenue: 245000, expenses: 83000, netProfit: 162000, marginPct: 66.1, status: 'PROFITABLE', momDelta: +12.4,
      revenueBreakdown: { memberships: 180000, ptSessions: 38000, products: 18000, other: 9000 },
      expenseBreakdown: { rent: 45000, salaries: 22000, utilities: 8500, maintenance: 3500, marketing: 4000 },
    },
    {
      branchId: 'b2', branchName: 'Uptown Plaza', location: 'Lajpat Nagar, Delhi', revenue: 142000, expenses: 139000, netProfit: 3000, marginPct: 2.1, status: 'BREAKEVEN', momDelta: -8.2,
      revenueBreakdown: { memberships: 105000, ptSessions: 22000, products: 10000, other: 5000 },
      expenseBreakdown: { rent: 62000, salaries: 38000, utilities: 12000, maintenance: 9000, marketing: 18000 },
    },
  ],
  LAST_MONTH: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi', revenue: 218000, expenses: 80000, netProfit: 138000, marginPct: 63.3, status: 'PROFITABLE', momDelta: +8.1,
      revenueBreakdown: { memberships: 162000, ptSessions: 34000, products: 15000, other: 7000 },
      expenseBreakdown: { rent: 45000, salaries: 20000, utilities: 8000, maintenance: 3000, marketing: 4000 },
    }
  ],
  Q1: [], Q2: [], Q3: [], Q4: [], THIS_YEAR: []
};

export const ADMIN_MOCK_EXPENSES = [
  { id: 'e1', amount: 45000, category: 'Rent', branchId: 'b1', branchName: 'Downtown Core', date: '2025-01-01', notes: 'Monthly rent', recordedBy: 'Manager A' },
  { id: 'e2', amount: 12000, category: 'Utilities', branchId: 'b1', branchName: 'Downtown Core', date: '2025-01-05', notes: 'Electricity bill', recordedBy: 'Manager A' },
  { id: 'e3', amount: 32000, category: 'Rent', branchId: 'b2', branchName: 'Uptown Plaza', date: '2025-01-01', notes: 'Monthly rent', recordedBy: 'Manager B' },
  { id: 'e4', amount: 8500, category: 'Equipment', branchId: 'b2', branchName: 'Uptown Plaza', date: '2025-01-10', notes: 'Treadmill repair', recordedBy: 'Manager B' },
];
