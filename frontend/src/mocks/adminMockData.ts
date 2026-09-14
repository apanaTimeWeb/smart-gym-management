// Consolidated Admin Mock Data for MSW
// This file is used exclusively by MSW handlers.

// --- From AdminAnnouncementsMockData.ts ---
import type { Announcement, AnnouncementKPIData } from '@/app/admin/announcements/announcements_types/announcements_types';
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    title: '🎉 Grand Opening — Thane Branch Now Open!',
    body: 'We are thrilled to announce the opening of our newest GymSmart branch in Thane West! Enjoy state-of-the-art equipment, certified trainers, and exclusive launch offers. Visit us at Shop 12, Viviana Mall, Thane. First 50 members get 20% off on annual plans!',
    priority: 'high',
    status: 'active',
    audience: ['all'],
    gymIds: ['g4'],
    gymNames: ['Thane'],
    publishedAt: '2025-06-15T09:00:00Z',
    expiresAt: '2025-07-15T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-14T18:00:00Z',
    viewCount: 342,
    isPinned: true,
  },
  {
    id: 'ann2',
    title: '⚠️ Scheduled Maintenance — June 22 (2 AM–5 AM)',
    body: 'The GymSmart platform will undergo scheduled maintenance on June 22, 2025 from 2:00 AM to 5:00 AM IST. During this window, the app and manager portal will be temporarily unavailable. We apologize for any inconvenience. All data is safe and no action is required from your end.',
    priority: 'high',
    status: 'active',
    audience: ['trainers', 'staff'],
    gymIds: ['g1', 'g2'],
    gymNames: ['Andheri East', 'Bandra West'],
    publishedAt: '2025-06-18T10:00:00Z',
    expiresAt: '2025-06-22T05:00:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-18T09:30:00Z',
    viewCount: 89,
    isPinned: true,
  },
  {
    id: 'ann3',
    title: '🏋️ New Batch Timings — Effective July 1st',
    body: 'Starting July 1st, 2025, we are introducing new batch timings across all branches to better serve our growing member base. Morning batch: 5:30 AM – 8:00 AM. Evening batch: 5:00 PM – 9:00 PM. Weekend special: 7:00 AM – 12:00 PM. Please update your schedules accordingly.',
    priority: 'medium',
    status: 'scheduled',
    audience: ['all'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-06-25T08:00:00Z',
    expiresAt: '2025-07-31T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-20T14:00:00Z',
    viewCount: 0,
    isPinned: false,
  },
  {
    id: 'ann4',
    title: '💪 Monsoon Fitness Challenge — Win Prizes!',
    body: 'Join our Monsoon Fitness Challenge running from July 1 to July 31! Track your workouts, attend at least 20 sessions, and stand a chance to win exciting prizes including free annual memberships, protein supplements, and GymSmart merchandise. Register at the front desk or through the app.',
    priority: 'medium',
    status: 'scheduled',
    audience: ['members'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-07-01T00:00:00Z',
    expiresAt: '2025-07-31T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-19T11:00:00Z',
    viewCount: 0,
    isPinned: false,
  },
  {
    id: 'ann5',
    title: '📋 Payroll Processing — June 2025',
    body: 'June 2025 payroll has been processed and will be credited to all staff accounts by June 30th. Please verify your bank details in the HR portal. Any discrepancies must be reported to your branch manager by June 28th. Salary slips are available in the HR module.',
    priority: 'medium',
    status: 'active',
    audience: ['trainers', 'staff'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-06-20T09:00:00Z',
    expiresAt: '2025-06-30T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-20T08:45:00Z',
    viewCount: 156,
    isPinned: false,
  },
  {
    id: 'ann6',
    title: '🔧 Equipment Upgrade — Andheri East Branch',
    body: 'We are upgrading the cardio section at Andheri East with 10 new treadmills and 5 elliptical machines. The cardio area will be partially closed from June 23–25 for installation. We apologize for the inconvenience and appreciate your patience.',
    priority: 'low',
    status: 'active',
    audience: ['members'],
    gymIds: ['g1'],
    gymNames: ['Andheri East'],
    publishedAt: '2025-06-21T08:00:00Z',
    expiresAt: '2025-06-26T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-21T07:30:00Z',
    viewCount: 78,
    isPinned: false,
  },
  {
    id: 'ann7',
    title: '🎓 Trainer Certification Workshop — July 5th',
    body: 'All trainers are required to attend the mandatory certification refresher workshop on July 5th, 2025 at the Bandra West branch (10 AM – 4 PM). Topics include updated safety protocols, nutrition counseling basics, and injury prevention. Attendance is compulsory. Travel allowance will be reimbursed.',
    priority: 'high',
    status: 'scheduled',
    audience: ['trainers'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-06-28T09:00:00Z',
    expiresAt: '2025-07-05T16:00:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-20T16:00:00Z',
    viewCount: 0,
    isPinned: false,
  },
  {
    id: 'ann8',
    title: '🌟 Member Referral Program — Earn Free Months!',
    body: 'Refer a friend and earn 1 free month for every successful referral! Your friend also gets 10% off their first membership. There is no limit on referrals — the more you refer, the more you earn. Share your unique referral code available in the member app. Valid until December 31, 2025.',
    priority: 'low',
    status: 'expired',
    audience: ['members'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-05-01T00:00:00Z',
    expiresAt: '2025-05-31T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-04-28T10:00:00Z',
    viewCount: 512,
    isPinned: false,
  },
  {
    id: 'ann9',
    title: '📝 Draft: Diwali Offer Campaign',
    body: 'Diwali special offer — 30% off on all annual plans from October 20 to November 5. Includes free personal training session for new joiners. Poster designs pending approval from marketing team.',
    priority: 'medium',
    status: 'draft',
    audience: ['all'],
    gymIds: ['g1', 'g2', 'g3', 'g4'],
    gymNames: ['Andheri East', 'Bandra West', 'Powai', 'Thane'],
    publishedAt: '2025-10-20T00:00:00Z',
    expiresAt: '2025-11-05T23:59:00Z',
    createdBy: 'Admin',
    createdAt: '2025-06-22T12:00:00Z',
    viewCount: 0,
    isPinned: false,
  },
];

export const MOCK_ANNOUNCEMENT_KPI: AnnouncementKPIData = {
  total: 9,
  active: 4,
  scheduled: 3,
  expired: 1,
  totalViews: 1177,
  pinned: 2,
};


// --- From AdminAttendanceMockData.ts ---
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

export const MOCK_ADMIN_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 1250,
  todayPresent: 1100,
  todayLate: 150,
  weeklyAverage: 1150,
  peakHour: '18:00',
  trendVsLastWeek: 5.2,
  uniqueMembersThisMonth: 8500,
};

export const MOCK_ADMIN_ATTENDANCE_RECORDS: AdminAttendanceRecord[] = [
  {
    id: 'a1', memberId: 'm1', memberName: 'Rahul Sharma', memberPhone: '9876543210',
    branchId: 'b1', branchName: 'Downtown Main', checkInTime: '2023-10-15T06:30:00Z',
    checkOutTime: '2023-10-15T08:00:00Z', date: '2023-10-15', status: 'present', planName: 'Annual Pro',
    sessionType: 'General'
  },
  {
    id: 'a2', memberId: 'm2', memberName: 'Priya Singh', memberPhone: '9876543211',
    branchId: 'b2', branchName: 'Westside Gym', checkInTime: '2023-10-15T07:15:00Z',
    checkOutTime: null, date: '2023-10-15', status: 'present', planName: 'Quarterly Classic',
    sessionType: 'PT', trainerName: 'Amit Kumar'
  }
];

export const MOCK_ADMIN_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: '2023-10-09', count: 1100 },
  { date: '2023-10-10', count: 1150 },
  { date: '2023-10-11', count: 1180 },
  { date: '2023-10-12', count: 1200 },
  { date: '2023-10-13', count: 1250 },
  { date: '2023-10-14', count: 1050 },
  { date: '2023-10-15', count: 1250 },
];


// --- From AdminDashboardMockData.ts ---
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

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
  churnRate: 3.2,
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
};


// --- From AdminFinanceMockData.ts ---
import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';

export const MOCK_ADMIN_FINANCE_SUMMARY: FinanceSummary = {
  totalRevenue: 5400000,
  monthlyRevenue: 1200000,
  pendingAmount: 350000,
  totalPayments: 850,
  totalExpenses: 2800000,
  netProfit: 2600000,
  revenueByMethod: {
    UPI: 3200000,
    Cash: 500000,
    Card: 1200000,
    NetBanking: 500000
  },
  monthlyData: [
    { month: 'Jan', revenue: 1000000 },
    { month: 'Feb', revenue: 1100000 },
    { month: 'Mar', revenue: 1050000 },
    { month: 'Apr', revenue: 1150000 },
    { month: 'May', revenue: 1250000 },
    { month: 'Jun', revenue: 1200000 }
  ]
};

export const MOCK_ADMIN_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    memberId: 'm1',
    amount: 15000,
    method: 'UPI',
    paymentMode: 'UPI',
    status: 'COMPLETED',
    invoiceNo: 'INV-2023-001',
    paidAt: '2023-10-15T10:30:00Z',
    member: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', plan: { name: 'Annual Pro' } }
  },
  {
    id: 'p2',
    memberId: 'm2',
    amount: 5000,
    method: 'Cash',
    paymentMode: 'CASH',
    status: 'COMPLETED',
    invoiceNo: 'INV-2023-002',
    paidAt: '2023-10-16T11:45:00Z',
    member: { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', plan: { name: 'Quarterly' } }
  },
];

export const MOCK_ADMIN_BRANCH_PNL: BranchPnlRecord[] = [
  {
    branchId: 'b1',
    branchName: 'Downtown Main',
    location: 'City Center',
    revenue: 1200000,
    expenses: 700000,
    netProfit: 500000,
    marginPct: 41.6,
    status: 'PROFITABLE',
    momDelta: 5.2,
    revenueBreakdown: { memberships: 900000, ptSessions: 200000, products: 50000, other: 50000 },
    expenseBreakdown: { rent: 300000, salaries: 250000, utilities: 50000, maintenance: 30000, marketing: 70000 }
  },
  {
    branchId: 'b2',
    branchName: 'Westside Gym',
    location: 'Westside Mall',
    revenue: 800000,
    expenses: 850000,
    netProfit: -50000,
    marginPct: -6.2,
    status: 'LOSS',
    momDelta: -2.1,
    revenueBreakdown: { memberships: 600000, ptSessions: 100000, products: 80000, other: 20000 },
    expenseBreakdown: { rent: 400000, salaries: 250000, utilities: 80000, maintenance: 50000, marketing: 70000 }
  }
];


// --- From AdminHrMockData.ts ---
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export const MOCK_ADMIN_HR_SUMMARY: HrSummary = {
  totalSalaryThisMonth: 850000,
  totalSalaryPaid: 600000,
  totalSalaryDue: 250000,
  totalAdvanceGiven: 50000,
  pendingPaymentsCount: 5,
  totalStaff: 45,
  activeStaff: 40,
  totalPayrollThisMonth: 850000,
  paidCount: 35,
  pendingCount: 10,
};

export const MOCK_ADMIN_STAFF: Staff[] = [
  {
    id: 's1',
    employeeId: 'EMP-001',
    name: 'Rahul Sharma',
    email: 'rahul.s@gym.com',
    phone: '9876543210',
    role: 'Manager',
    salary: 50000,
    branch: 'Downtown Main',
    gender: 'Male',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
  },
  {
    id: 's2',
    employeeId: 'EMP-002',
    name: 'Priya Singh',
    email: 'priya.s@gym.com',
    phone: '9876543211',
    role: 'Trainer',
    salary: 30000,
    branch: 'Westside Gym',
    gender: 'Female',
    joinDate: '2023-05-20T10:00:00Z',
    isActive: true,
  }
];

export const MOCK_ADMIN_PAYROLLS: Payroll[] = [
  {
    id: 'pr1', staffId: 's1', month: '2023-10', amount: 50000,
    paidAmount: 50000, pendingAmount: 0, status: 'PAID', paidAt: '2023-10-01T10:00:00Z',
    staff: { name: 'Rahul Sharma', role: 'Manager' }
  },
  {
    id: 'pr2', staffId: 's2', month: '2023-10', amount: 30000,
    paidAmount: 0, pendingAmount: 30000, status: 'PENDING',
    staff: { name: 'Priya Singh', role: 'Trainer' }
  }
];

export const MOCK_ADMIN_STAFF_PERFORMANCE: StaffPerformanceRecord[] = [
  {
    id: 's1', name: 'Rahul Sharma', role: 'Manager', branchName: 'Downtown Main',
    sessionsTaken: 0, membersAdded: 15, attendancePct: 98.5, rating: 4.8, status: 'EXCELLENT'
  },
  {
    id: 's2', name: 'Priya Singh', role: 'Trainer', branchName: 'Westside Gym',
    sessionsTaken: 45, membersAdded: 5, attendancePct: 95.0, rating: 4.5, status: 'EXCELLENT'
  }
];

export const MOCK_ADMIN_LEDGER: LedgerEntry[] = [
  { id: 'l1', staffId: 's1', date: '2023-10-01T10:00:00Z', type: 'Salary Paid', credit: 0, debit: 50000, balance: 0 },
  { id: 'l2', staffId: 's2', date: '2023-10-01T10:00:00Z', type: 'Salary Generated', credit: 30000, debit: 0, balance: 30000 },
];


// --- From AdminMembersMockData.ts ---
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';

export const MOCK_ADMIN_MEMBERS_SUMMARY: AdminMembersSummary = {
  totalMembers: 12500,
  activeMembers: 10200,
  expiredMembers: 1500,
  pendingMembers: 800,
  expiringThisWeek: 350,
  expiringThisMonth: 1200,
  totalOutstanding: 450000,
  newThisMonth: 450,
};

export const MOCK_ADMIN_MEMBERS: AdminMember[] = [
  {
    id: 'm1',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '9876543210',
    branchId: 'b1',
    branchName: 'Downtown Main',
    planName: 'Annual Pro',
    status: 'active',
    joinDate: '2023-01-15T10:00:00Z',
    expiryDate: '2024-01-15T10:00:00Z',
    pendingAmount: 0,
    gender: 'Male',
    totalVisits: 145,
  },
  {
    id: 'm2',
    name: 'Priya Singh',
    email: 'priya.s@example.com',
    phone: '9876543211',
    branchId: 'b2',
    branchName: 'Westside Gym',
    planName: 'Quarterly Classic',
    status: 'active',
    joinDate: '2023-05-20T10:00:00Z',
    expiryDate: '2023-08-20T10:00:00Z',
    pendingAmount: 1500,
    gender: 'Female',
    totalVisits: 45,
  },
  {
    id: 'm3',
    name: 'Amit Kumar',
    email: 'amit.k@example.com',
    phone: '9876543212',
    branchId: 'b1',
    branchName: 'Downtown Main',
    planName: 'Monthly Basic',
    status: 'expired',
    joinDate: '2023-06-10T10:00:00Z',
    expiryDate: '2023-07-10T10:00:00Z',
    pendingAmount: 0,
    gender: 'Male',
    totalVisits: 12,
  }
];


// --- From AdminPlansMockData.ts ---
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { PlanRevenueRecord } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

export const MOCK_ADMIN_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Annual Pro',
    tier: 'Gold',
    price1Month: 2000,
    price3Month: 5500,
    price6Month: 10000,
    price12Month: 18000,
    features: ['All equipment access', 'Locker room', 'Free PT sessions (2/month)'],
    isActive: true,
    freezeAllowed: true,
    joiningFee: 1500,
    ptSessionsIncluded: 2,
    taxRate: 18
  },
  {
    id: 'p2',
    name: 'Quarterly Classic',
    tier: 'Silver',
    price1Month: 1500,
    price3Month: 4000,
    price6Month: 7500,
    price12Month: 14000,
    features: ['All equipment access', 'Locker room'],
    isActive: true,
    freezeAllowed: false,
    joiningFee: 1000,
    ptSessionsIncluded: 0,
    taxRate: 18
  },
  {
    id: 'p3',
    name: 'Monthly Basic',
    tier: 'Bronze',
    price1Month: 1000,
    price3Month: 2800,
    price6Month: 5200,
    price12Month: 10000,
    features: ['Cardio only access'],
    isActive: true,
    freezeAllowed: false,
    joiningFee: 500,
    ptSessionsIncluded: 0,
    taxRate: 18
  }
];

export const MOCK_ADMIN_PLAN_REVENUE: PlanRevenueRecord[] = [
  {
    id: 'pr1',
    planName: 'Annual Pro',
    tier: 'Gold',
    totalRevenue: 2160000,
    activeSubscriptions: 120,
    newSignups: 15,
    renewalRate: 92.5
  },
  {
    id: 'pr2',
    planName: 'Quarterly Classic',
    tier: 'Silver',
    totalRevenue: 800000,
    activeSubscriptions: 200,
    newSignups: 40,
    renewalRate: 75.0
  },
  {
    id: 'pr3',
    planName: 'Monthly Basic',
    tier: 'Bronze',
    totalRevenue: 350000,
    activeSubscriptions: 350,
    newSignups: 85,
    renewalRate: 45.5
  }
];


// --- From AdminProfileMockData.ts ---
import type { AdminProfileData } from '@/app/admin/profile/profile_types/AdminProfileTypes';

export const MOCK_ADMIN_PROFILE: AdminProfileData = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@smartgym.com',
  phone: '9876543210',
  role: 'Admin',
  branchName: 'All Branches',
  joinedAt: '2023-01-01T00:00:00Z',
  avatarInitial: 'A',
};


// --- From AdminReportsMockData.ts ---
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


// --- From AdminSalesMockData.ts ---
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/sales_types';

export const MOCK_ADMIN_SALES_OVERVIEW: OverviewDataPoint[] = [
  { date: '2023-10-01', revenue: 15000 },
  { date: '2023-10-02', revenue: 25000 },
  { date: '2023-10-03', revenue: 18000 },
  { date: '2023-10-04', revenue: 32000 },
  { date: '2023-10-05', revenue: 22000 },
  { date: '2023-10-06', revenue: 45000 },
  { date: '2023-10-07', revenue: 38000 },
];

export const MOCK_ADMIN_MEMBERSHIP_REPORT: MembershipReportItem[] = [
  { id: 1, name: 'Downtown Main', totalMembers: 4500, activeMembers: 3800, revenue: 1200000, receivable: 150000, received: 1050000, remaining: 150000 },
  { id: 2, name: 'Westside Gym', totalMembers: 3200, activeMembers: 2800, revenue: 850000, receivable: 100000, received: 750000, remaining: 100000 },
];

export const MOCK_ADMIN_MEMBERSHIP_TOTALS: MembershipTotals = {
  activeCount: 6600,
  revenue: 2050000,
  totalReceivable: 250000,
  totalReceived: 1800000,
  remaining: 250000,
  refunds: 15000,
};

export const MOCK_ADMIN_PENDING_PAYMENTS: PendingPaymentMember[] = [
  {
    id: 'm1', name: 'Ravi Verma', email: 'ravi@example.com', phone: '9876543210', gender: 'Male',
    branch: 'Downtown Main', planId: 'p1', plan: 'Annual Pro', billingCycle: 'annual', status: 'pending',
    joinDate: '2023-01-15', expiryDate: '2024-01-15', paidAmount: 0, pendingAmount: 18000,
    daysOverdue: 15, createdAt: '2023-01-15T10:00:00Z',
  },
];

export const MOCK_ADMIN_ALL_MEMBERSHIPS: Member[] = [
  {
    id: 'm2', name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543211', gender: 'Female',
    branch: 'Westside Gym', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: 'active', joinDate: '2023-08-01', expiryDate: '2023-11-01',
    paidAmount: 4000, pendingAmount: 0, createdAt: '2023-08-01T10:00:00Z',
  }
];


// --- From AdminSettingsMockData.ts ---
export const MOCK_ADMIN_SETTINGS = {
  profile: { gymName: 'Smart Gym Corp', ownerName: 'Admin', phone: '9876543210', email: 'admin@smartgym.com', city: 'Mumbai', gstNumber: '' },
  notifications: {
    smssms: true, emailsms: true, whatsappsms: true,
    smsonJoin: true, emailonJoin: true, whatsapponJoin: true,
    smsonExpiry: true, emailonExpiry: true, whatsapponExpiry: true,
    smsonPayment: true, emailonPayment: true, whatsapponPayment: true,
    smsonAbsence: true, emailonAbsence: false, whatsapponAbsence: true,
    expiryReminderDays: 7, absenceThresholdDays: 3
  },
  integration: {
    memberAppEnabled: true, qrCheckInEnabled: true, onlinePaymentsEnabled: true,
    dietPlanEnabled: false, workoutPlanEnabled: false, progressTrackingEnabled: true,
    pushNotificationsEnabled: true, appStoreLink: '', playStoreLink: '', apiKey: 'sk_test_123', webhookUrl: ''
  },
  gst: {
    gstNumber: '27AABCU9603R1ZX', businessLegalName: 'Smart Gym Pvt Ltd', taxRate: '18', stateCode: '27', hsnCode: '999719', showGstOnInvoice: true, taxInclusivePricing: false
  },
  payment: {
    razorpayEnabled: true, razorpayKeyId: 'rzp_test_123', razorpayWebhookSecret: '', upiEnabled: true, upiId: 'smartgym@upi', cashEnabled: true, autoReceiptEnabled: true, receiptPrefix: 'RCP'
  },
  general: {
    timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false
  },
};


// --- From AdminUsageMockData.ts ---
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export const MOCK_ADMIN_USAGE_DATA: AdminUsageData = {
  tenantId: 't1',
  planName: 'Growth Plan',
  planTier: 'Growth',
  billingCycleEnd: '2023-11-15T00:00:00Z',
  monthlyPrice: 9999,
  smsSent: 8500,
  smsLimit: 10000,
  databaseGb: 3.5,
  mediaGb: 15.2,
  storageLimitGb: 25,
  activeMembers: 12500,
  memberLimit: 15000,
  staffCount: 125,
  staffLimit: 200,
  branchCount: 4,
  branchLimit: 5,
  apiCallsToday: 45000,
  apiCallsLimit: 100000,
  usageHistory: [
    { date: '2023-10-01', membersUsed: 11500, storageUsedGb: 16.5, smsUsed: 1200 },
    { date: '2023-10-08', membersUsed: 11800, storageUsedGb: 17.2, smsUsed: 3500 },
    { date: '2023-10-15', membersUsed: 12500, storageUsedGb: 18.7, smsUsed: 8500 },
  ],
};


