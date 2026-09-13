import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';

export const MOCK_REPORT_SUMMARY: ReportSummary = {
  kpis: {
    totalRevenue: 1500000,
    totalMembers: 450,
    avgAttendanceRate: 65,
    totalExpenses: 250000,
    netProfit: 1250000,
    newMembersThisMonth: 25,
    churnRate: 2.5,
    activeMembers: 420,
  },
  revenueData: [
    { month: 'Jan', revenue: 110000, expenses: 20000, profit: 90000 },
    { month: 'Feb', revenue: 115000, expenses: 22000, profit: 93000 },
    { month: 'Mar', revenue: 120000, expenses: 21000, profit: 99000 },
    { month: 'Apr', revenue: 118000, expenses: 25000, profit: 93000 },
    { month: 'May', revenue: 125000, expenses: 20000, profit: 105000 },
  ],
  attendanceData: [
    { date: 'Mon', present: 150, absent: 50, rate: 75 },
    { date: 'Tue', present: 140, absent: 60, rate: 70 },
    { date: 'Wed', present: 160, absent: 40, rate: 80 },
    { date: 'Thu', present: 130, absent: 70, rate: 65 },
    { date: 'Fri', present: 170, absent: 30, rate: 85 },
  ],
  memberChurnData: [
    { month: 'Jan', newMembers: 30, churned: 10, active: 400 },
    { month: 'Feb', newMembers: 25, churned: 12, active: 413 },
    { month: 'Mar', newMembers: 35, churned: 8, active: 440 },
  ],
  expenseBreakdown: [
    { category: 'Rent', amount: 100000, percentage: 40 },
    { category: 'Salaries', amount: 90000, percentage: 36 },
    { category: 'Equipment Maintenance', amount: 35000, percentage: 14 },
    { category: 'Utilities', amount: 25000, percentage: 10 },
  ]
};
