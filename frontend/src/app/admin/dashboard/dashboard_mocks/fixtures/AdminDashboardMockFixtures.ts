// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin dashboard feature.
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin dashboard feature.

export const MOCK_ADMIN_DASHBOARD: DashboardStats = {
  totalMembers: 15400,
  activeMembers: 12500,
  newMembersThisMonth: 850,
  totalRevenue: 24500000,
  monthlyRevenue: 2850000,
  netProfit: 950000,
  totalExpenses: 1900000,
  pendingPayments: 450000,
  totalStaff: 125,
  activeStaff: 110,
  totalProducts: 450,
  lowStockCount: 23,
  totalInquiries: 1200,
  newInquiries: 45,
  cancellationRate: 3.2,
  retentionRate: 85,
  arpm: 2150, // Average Revenue Per Member
  memberGrowth: [
    { month: 'Jan', count: 12000 },
    { month: 'Feb', count: 12500 },
    { month: 'Mar', count: 13100 },
    { month: 'Apr', count: 14000 },
    { month: 'May', count: 14800 },
    { month: 'Jun', count: 15400 },
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 2000000, profit: 500000 },
    { month: 'Feb', revenue: 2100000, profit: 550000 },
    { month: 'Mar', revenue: 2300000, profit: 650000 },
    { month: 'Apr', revenue: 2500000, profit: 750000 },
    { month: 'May', revenue: 2700000, profit: 850000 },
    { month: 'Jun', revenue: 2850000, profit: 950000 },
  ],
  membersByPlan: [
    { plan: 'Annual Pro', count: 5400 },
    { plan: 'Quarterly', count: 3200 },
    { plan: 'Monthly', count: 6800 },
  ],
  membersByStatus: { active: 12500, pending: 1500, expired: 1400 },
  branchLeaderboard: [
    { id: 'b1', name: 'Downtown Branch', revenue: 850000, activeMembers: 4500, trend: 'up' },
    { id: 'b2', name: 'Westside Gym', revenue: 650000, activeMembers: 3200, trend: 'up' },
    { id: 'b3', name: 'Northside Arena', revenue: 450000, activeMembers: 2100, trend: 'flat' },
    { id: 'b4', name: 'Eastside Fitness', revenue: 350000, activeMembers: 1800, trend: 'down' },
  ],
  systemAlerts: [
    { id: 'a1', message: 'Server maintenance scheduled for tonight.', severity: 'medium', date: new Date().toISOString() },
    { id: 'a2', message: 'Payment gateway experiencing delays.', severity: 'high', date: new Date(Date.now() - 86400000).toISOString() },
  ],
  todayAttendance: 2450,
  expiringThisWeek: 350,
  totalInquiriesOpen: 85,
  avgAttendance: 2100,
  renewalsPending: 420,
  expiringMemberships: [
    { id: 'm10', name: 'Pooja Iyer', branch: 'Downtown Core', plan: 'Silver Plan', expiryDate: '2026-09-19', daysLeft: 3 },
    { id: 'm11', name: 'Suresh Kumar', branch: 'Uptown Plaza', plan: 'Gold Plan', expiryDate: '2026-09-17', daysLeft: 1 },
    { id: 'm2', name: 'Priya Patel', branch: 'Uptown Plaza', plan: 'Silver Plan', expiryDate: '2026-09-27', daysLeft: 11 },
    { id: 'm6', name: 'Divya Singh', branch: 'Westside Mall', plan: 'Silver Plan', expiryDate: '2026-10-14', daysLeft: 28 },
    { id: 'm1', name: 'Rahul Sharma', branch: 'Downtown Core', plan: 'Gold Plan', expiryDate: '2026-10-10', daysLeft: 24 },
  ],
  attendanceTrend: [
    { date: '2026-09-10', count: 312 }, { date: '2026-09-11', count: 287 }, { date: '2026-09-12', count: 345 },
    { date: '2026-09-13', count: 298 }, { date: '2026-09-14', count: 378 }, { date: '2026-09-15', count: 421 }, { date: '2026-09-16', count: 395 },
  ],
};


// --- From AdminFinanceMockData.ts ---
