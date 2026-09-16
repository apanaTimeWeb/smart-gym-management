// Consolidated Admin Mock Data for MSW
import type { Announcement, AnnouncementKPIData } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';
import type { AuditLog, AuditKPIData } from '@/app/admin/audit_logs/audit_types/AdminAuditTypes';
import type { BlacklistedMember, BlacklistKPIData } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import type { Coupon, CouponsKPIData } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';
import type { ExportJob, DataExportKPIData } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';
import type { Payment, FinanceSummary, BranchPnlRecord, Expense } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import type { GymHealthAlert, GymHealthKPIData } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/AdminGymHealthAlertsTypes';
import type { CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';
import type { StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';
import type { AdminNotification } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';
import type { PermissionFeature, PermissionsData } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';
import type { PlanRevenueRecord } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { AdminProfileData } from '@/app/admin/profile/profile_types/AdminProfileTypes';
import type { ReportData } from '@/app/admin/reports/reports_types/AdminReportsTypes';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';


export const MOCK_ADMIN_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Andheri East', location: 'Mumbai', status: 'active', revenue: 185000, expenses: 72000, studentsCount: 420, staffCount: 18 },
  { id: 'b2', name: 'Bandra West', location: 'Mumbai', status: 'active', revenue: 142000, expenses: 61000, studentsCount: 340, staffCount: 15 },
  { id: 'b3', name: 'Powai', location: 'Mumbai', status: 'active', revenue: 98000, expenses: 50000, studentsCount: 220, staffCount: 11 },
  { id: 'b4', name: 'Thane', location: 'Thane', status: 'active', revenue: 60000, expenses: 41000, studentsCount: 180, staffCount: 9 },
];

// --- From AdminAnnouncementsMockData.ts ---
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
};


// --- From AdminFinanceMockData.ts ---

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

export const MOCK_ADMIN_EXPENSES: Expense[] = [
  { id: 'e1', category: 'Rent', amount: 85000, branchId: 'b1', date: '2026-09-01', notes: 'Monthly branch rent', recordedBy: 'Admin' },
  { id: 'e2', category: 'Utilities', amount: 21000, branchId: 'b2', date: '2026-09-05', notes: 'Utility bills', recordedBy: 'Admin' },
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




// --- Admin Notifications ---
export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', title: 'Payment received', body: 'Payment received for Invoice #1245.', severity: 'INFO', read: false, createdAt: '2026-09-16T12:00:00Z' },
  { id: 'n2', title: 'Membership expiring', body: '12 memberships expire within the next 7 days.', severity: 'WARNING', read: false, createdAt: '2026-09-16T10:30:00Z' },
  { id: 'n3', title: 'System backup completed', body: 'The scheduled system backup completed successfully.', severity: 'INFO', read: true, createdAt: '2026-09-16T08:00:00Z' },
  { id: 'n4', title: 'High-severity audit event', body: 'A permission change was recorded in the audit log.', severity: 'CRITICAL', read: true, createdAt: '2026-09-15T16:30:00Z' },
];


export const MOCK_EXPORT_JOBS: ExportJob[] = [
  { id: 'exp1', dataType: 'members', format: 'csv', gymIds: ['all'], gymNames: ['All Gyms'], dateFrom: '2025-06-01', dateTo: '2025-06-30', status: 'completed', rowCount: 1842, fileSizeKb: 284, createdAt: '2025-07-01T10:00:00', completedAt: '2025-07-01T10:00:45', createdBy: 'Admin' },
  { id: 'exp2', dataType: 'payments', format: 'excel', gymIds: ['g1', 'g2'], gymNames: ['Andheri East', 'Bandra West'], dateFrom: '2025-06-01', dateTo: '2025-06-30', status: 'completed', rowCount: 3241, fileSizeKb: 512, createdAt: '2025-07-01T09:30:00', completedAt: '2025-07-01T09:31:10', createdBy: 'Admin' },
  { id: 'exp3', dataType: 'attendance', format: 'pdf', gymIds: ['g3'], gymNames: ['Powai'], dateFrom: '2025-05-01', dateTo: '2025-05-31', status: 'completed', rowCount: 8920, fileSizeKb: 1240, createdAt: '2025-06-02T08:00:00', completedAt: '2025-06-02T08:02:30', createdBy: 'Admin' },
  { id: 'exp4', dataType: 'full_report', format: 'pdf', gymIds: ['all'], gymNames: ['All Gyms'], dateFrom: '2025-01-01', dateTo: '2025-06-30', status: 'processing', createdAt: '2025-07-08T14:00:00', createdBy: 'Admin' },
  { id: 'exp5', dataType: 'staff', format: 'csv', gymIds: ['g4'], gymNames: ['Thane'], dateFrom: '2025-06-01', dateTo: '2025-06-30', status: 'failed', createdAt: '2025-07-05T11:00:00', createdBy: 'Admin' },
];

export const MOCK_DATA_EXPORT_KPI: DataExportKPIData = {
  totalExports: 5,
  totalRowsExported: 14003,
  lastExportDate: '2025-07-01',
  pendingJobs: 1,
};


export const MOCK_GYM_HEALTH_ALERTS: GymHealthAlert[] = [
  { id: 'a1', gymId: 'g4', gymName: 'Thane', alertType: 'no_new_members', severity: 'critical', title: '0 New Members This Week', description: 'Thane branch has had zero new member registrations for 7 consecutive days.', metric: '0 new members', threshold: '< 3 per week', detectedAt: '2025-07-07T09:00:00', isResolved: false },
  { id: 'a2', gymId: 'g3', gymName: 'Powai', alertType: 'revenue_drop', severity: 'critical', title: 'Revenue Drop > 25%', description: 'Powai branch revenue dropped 28% compared to the same period last month.', metric: '-28% MoM', threshold: '> 20% drop', detectedAt: '2025-07-06T10:00:00', isResolved: false },
  { id: 'a3', gymId: 'g2', gymName: 'Bandra West', alertType: 'high_cancellations', severity: 'warning', title: 'High Member Loss Rate', description: 'Bandra West has a 18% leaving rate this month, significantly above the 10% threshold.', metric: '18% leaving', threshold: '> 10%', detectedAt: '2025-07-05T08:00:00', isResolved: false },
  { id: 'a4', gymId: 'g4', gymName: 'Thane', alertType: 'pending_payroll', severity: 'critical', title: 'Payroll Overdue by 5 Days', description: 'Staff payroll for Thane branch is 5 days overdue. 8 staff members are affected.', metric: '5 days overdue', threshold: '> 3 days', detectedAt: '2025-07-04T07:00:00', isResolved: false },
  { id: 'a5', gymId: 'g1', gymName: 'Andheri East', alertType: 'low_attendance', severity: 'warning', title: 'Attendance Below 40%', description: 'Average daily attendance at Andheri East has dropped to 38% of active members.', metric: '38% attendance', threshold: '< 40%', detectedAt: '2025-07-03T09:00:00', isResolved: false },
  { id: 'a6', gymId: 'g2', gymName: 'Bandra West', alertType: 'expiring_members', severity: 'info', title: '42 Memberships Expiring This Week', description: '42 active memberships at Bandra West are expiring within the next 7 days with no renewal initiated.', metric: '42 expiring', threshold: '> 30 expiring', detectedAt: '2025-07-07T06:00:00', isResolved: false },
  { id: 'a7', gymId: 'g3', gymName: 'Powai', alertType: 'no_new_members', severity: 'warning', title: 'Low New Member Acquisition', description: 'Powai had only 1 new member this week, below the expected minimum of 5.', metric: '1 new member', threshold: '< 5 per week', detectedAt: '2025-07-01T09:00:00', isResolved: true, resolvedAt: '2025-07-03T11:00:00' },
];

export const MOCK_GYM_HEALTH_KPI: GymHealthKPIData = {
  totalAlerts: 7,
  criticalAlerts: 3,
  warningAlerts: 2,
  gymsAtRisk: 3,
};


export const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
  planId: 'plan_growth',
  planName: 'Growth',
  tier: 'growth',
  monthlyPrice: 4999,
  annualPrice: 49990,
  billingCycle: 'monthly',
  status: 'active',
  currentPeriodStart: '2025-06-01',
  currentPeriodEnd: '2025-06-30',
  nextBillingDate: '2025-07-01',
  autoRenew: true,
  gymCount: 3,
  memberLimit: 500,
  staffLimit: 25,
  storageGb: 50,
};

export const MOCK_SAAS_PLANS: SaaSPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter',
    tier: 'starter',
    monthlyPrice: 1999,
    annualPrice: 19990,
    gymLimit: 1,
    memberLimit: 100,
    staffLimit: 5,
    storageGb: 10,
    features: ['1 Gym Branch', 'Up to 100 Members', '5 Staff Accounts', '10 GB Storage', 'Basic Reports', 'Email Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_growth',
    name: 'Growth',
    tier: 'growth',
    monthlyPrice: 4999,
    annualPrice: 49990,
    gymLimit: 5,
    memberLimit: 500,
    staffLimit: 25,
    storageGb: 50,
    features: ['Up to 5 Gym Branches', 'Up to 500 Members', '25 Staff Accounts', '50 GB Storage', 'Advanced Reports', 'Bulk Communications', 'Coupons & Discounts', 'Priority Support'],
    isPopular: true,
    isCurrent: true,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    tier: 'pro',
    monthlyPrice: 9999,
    annualPrice: 99990,
    gymLimit: 15,
    memberLimit: 2000,
    staffLimit: 100,
    storageGb: 200,
    features: ['Up to 15 Gym Branches', 'Up to 2,000 Members', '100 Staff Accounts', '200 GB Storage', 'Full Analytics Suite', 'Data Export (CSV/Excel/PDF)', 'Gym Health Alerts', 'Gym Comparison', 'Dedicated Account Manager', '24/7 Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    gymLimit: 999,
    memberLimit: 999999,
    staffLimit: 9999,
    storageGb: 1000,
    features: ['Unlimited Gym Branches', 'Unlimited Members', 'Unlimited Staff', '1 TB Storage', 'Custom Integrations', 'White-label Option', 'Uptime Guarantee', 'Dedicated Infrastructure', 'Custom Contracts'],
    isPopular: false,
    isCurrent: false,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNo: 'INV-2025-006', date: '2025-06-01', dueDate: '2025-06-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv2', invoiceNo: 'INV-2025-005', date: '2025-05-01', dueDate: '2025-05-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv3', invoiceNo: 'INV-2025-004', date: '2025-04-01', dueDate: '2025-04-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv4', invoiceNo: 'INV-2025-003', date: '2025-03-01', dueDate: '2025-03-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv5', invoiceNo: 'INV-2025-002', date: '2025-02-01', dueDate: '2025-02-07', amount: 4999, status: 'paid',    planName: 'Growth', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv6', invoiceNo: 'INV-2025-001', date: '2025-01-01', dueDate: '2025-01-07', amount: 3999, status: 'paid',    planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv7', invoiceNo: 'INV-2024-012', date: '2024-12-01', dueDate: '2024-12-07', amount: 3999, status: 'failed',  planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
  { id: 'inv8', invoiceNo: 'INV-2024-011', date: '2024-11-01', dueDate: '2024-11-07', amount: 3999, status: 'paid',    planName: 'Starter', billingCycle: 'monthly', pdfUrl: '#' },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', type: 'card', last4: '4242', brand: 'Visa',       expiryMonth: 12, expiryYear: 2027, isDefault: true  },
  { id: 'pm2', type: 'upi',  upiId: 'gymsmart@okaxis',                                              isDefault: false },
  { id: 'pm3', type: 'card', last4: '5555', brand: 'Mastercard', expiryMonth: 8,  expiryYear: 2026, isDefault: false },
];

export const MOCK_SUBSCRIPTION_KPI: SubscriptionKPIData = {
  currentPlan: 'Growth',
  monthlySpend: 4999,
  totalInvoices: 8,
  nextBillingAmount: 4999,
  daysUntilRenewal: 11,
  savedWithAnnual: 9998,
};


export const MOCK_ROLES = [
  { id: 'r1', name: 'Super Admin', description: 'Full access to all modules and branches', permissions: ['all'], color: 'text-danger', bg: 'bg-danger-bg', memberCount: 1 },
  { id: 'r2', name: 'Branch Manager', description: 'Manage single branch operations, members, and staff', permissions: ['members', 'finance', 'hr', 'attendance'], color: 'text-warning', bg: 'bg-warning-bg', memberCount: 3 },
  { id: 'r3', name: 'Trainer', description: 'View assigned members, mark attendance, update workouts', permissions: ['attendance', 'members_view'], color: 'text-success', bg: 'bg-success-bg', memberCount: 8 },
  { id: 'r4', name: 'Receptionist', description: 'Handle walk-ins, collect fees, manage enquiries', permissions: ['members', 'finance_collect', 'enquiries'], color: 'text-info', bg: 'bg-info-bg', memberCount: 5 },
  { id: 'r5', name: 'Accountant', description: 'View and manage financial reports and expenses', permissions: ['finance', 'reports'], color: 'text-purple', bg: 'bg-purple-bg', memberCount: 2 },
];


export const MOCK_BLACKLIST: BlacklistedMember[] = [
  { id: 'bl1', memberId: 'M1042', memberName: 'Rajan Mehta', memberPhone: '+91 98765 43210', memberEmail: 'rajan.m@email.com', reason: 'Physical altercation with staff member at Andheri branch', blacklistedBy: 'Admin', blacklistedAt: '2025-05-12', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true },
  { id: 'bl2', memberId: 'M2087', memberName: 'Priya Sharma', memberPhone: '+91 87654 32109', memberEmail: 'priya.s@email.com', reason: 'Repeated non-payment and fraudulent membership transfer', blacklistedBy: 'Admin', blacklistedAt: '2025-04-28', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true },
  { id: 'bl3', memberId: 'M3156', memberName: 'Karan Joshi', memberPhone: '+91 76543 21098', memberEmail: 'karan.j@email.com', reason: 'Theft of equipment at Powai branch', blacklistedBy: 'Manager - Powai', blacklistedAt: '2025-06-01', scope: 'specific', assignedGyms: ['g3'], assignedGymNames: ['Powai'], isActive: true },
  { id: 'bl4', memberId: 'M4201', memberName: 'Sneha Patil', memberPhone: '+91 65432 10987', memberEmail: 'sneha.p@email.com', reason: 'Harassment of other members', blacklistedBy: 'Admin', blacklistedAt: '2025-03-15', scope: 'specific', assignedGyms: ['g1', 'g2'], assignedGymNames: ['Andheri East', 'Bandra West'], isActive: true },
  { id: 'bl5', memberId: 'M5312', memberName: 'Amit Verma', memberPhone: '+91 54321 09876', memberEmail: 'amit.v@email.com', reason: 'Chargebacks and payment disputes', blacklistedBy: 'Admin', blacklistedAt: '2025-02-20', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: false },
];

export const MOCK_BLACKLIST_KPI: BlacklistKPIData = {
  totalBlacklisted: 5,
  globalBans: 3,
  gymSpecificBans: 2,
  addedThisMonth: 1,
};


export const MOCK_PAYOUTS: GymPayout[] = [
  { gymId: 'g1', gymName: 'Andheri East', month: '2025-06', grossRevenue: 420000, staffPayroll: 85000, operationalExpenses: 42000, platformFee: 12600, netProfit: 280400, payoutStatus: 'paid', paidOn: '2025-07-03' },
  { gymId: 'g2', gymName: 'Bandra West', month: '2025-06', grossRevenue: 380000, staffPayroll: 78000, operationalExpenses: 38000, platformFee: 11400, netProfit: 252600, payoutStatus: 'paid', paidOn: '2025-07-03' },
  { gymId: 'g3', gymName: 'Powai', month: '2025-06', grossRevenue: 310000, staffPayroll: 65000, operationalExpenses: 31000, platformFee: 9300, netProfit: 204700, payoutStatus: 'processing' },
  { gymId: 'g4', gymName: 'Thane', month: '2025-06', grossRevenue: 195000, staffPayroll: 52000, operationalExpenses: 22000, platformFee: 5850, netProfit: 115150, payoutStatus: 'pending' },
  { gymId: 'g1', gymName: 'Andheri East', month: '2025-05', grossRevenue: 405000, staffPayroll: 85000, operationalExpenses: 40000, platformFee: 12150, netProfit: 267850, payoutStatus: 'paid', paidOn: '2025-06-04' },
  { gymId: 'g2', gymName: 'Bandra West', month: '2025-05', grossRevenue: 362000, staffPayroll: 78000, operationalExpenses: 36000, platformFee: 10860, netProfit: 237140, payoutStatus: 'paid', paidOn: '2025-06-04' },
  { gymId: 'g3', gymName: 'Powai', month: '2025-05', grossRevenue: 298000, staffPayroll: 65000, operationalExpenses: 30000, platformFee: 8940, netProfit: 194060, payoutStatus: 'paid', paidOn: '2025-06-05' },
  { gymId: 'g4', gymName: 'Thane', month: '2025-05', grossRevenue: 182000, staffPayroll: 52000, operationalExpenses: 20000, platformFee: 5460, netProfit: 104540, payoutStatus: 'paid', paidOn: '2025-06-05' },
];

export const MOCK_PNL: PnLEntry[] = [
  { gymId: 'g1', gymName: 'Andheri East', month: '2025-06', revenue: 420000, cogs: 42000, grossProfit: 378000, staffCost: 85000, rentUtilities: 28000, marketing: 8000, miscExpenses: 6000, ebitda: 251000, tax: 50200, netProfit: 200800 },
  { gymId: 'g2', gymName: 'Bandra West', month: '2025-06', revenue: 380000, cogs: 38000, grossProfit: 342000, staffCost: 78000, rentUtilities: 25000, marketing: 7000, miscExpenses: 6000, ebitda: 226000, tax: 45200, netProfit: 180800 },
  { gymId: 'g3', gymName: 'Powai', month: '2025-06', revenue: 310000, cogs: 31000, grossProfit: 279000, staffCost: 65000, rentUtilities: 22000, marketing: 5000, miscExpenses: 4000, ebitda: 183000, tax: 36600, netProfit: 146400 },
  { gymId: 'g4', gymName: 'Thane', month: '2025-06', revenue: 195000, cogs: 19500, grossProfit: 175500, staffCost: 52000, rentUtilities: 18000, marketing: 3000, miscExpenses: 3500, ebitda: 99000, tax: 19800, netProfit: 79200 },
];

export const MOCK_PAYOUTS_KPI: PayoutsKPIData = {
  totalNetProfit: 852850,
  totalGrossRevenue: 1305000,
  totalExpenses: 452150,
  pendingPayouts: 2,
};


export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: '1',  timestamp: '2025-06-20T10:30:00Z', action: 'DELETED_PAYMENT',   user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Deleted payment INV-1042 (Amount: ₹5,000, Member: John Doe)',           severity: 'high',   ip: '192.168.1.10', module: 'Finance',    userAgent: 'Chrome/Windows', affectedRecordId: 'INV-1042' },
  { id: '2',  timestamp: '2025-06-20T09:15:00Z', action: 'UPDATED_PLAN',      user: 'Super Admin',            branchId: 'all', details: 'Changed Annual Pro price from ₹12,000 to ₹15,000',                  severity: 'medium', ip: '10.0.0.1',    module: 'Plans',      userAgent: 'Chrome/Mac',     affectedRecordId: 'PLAN-007' },
  { id: '3',  timestamp: '2025-06-19T18:45:00Z', action: 'ADDED_STAFF',       user: 'Super Admin',            branchId: 'b2', details: 'Added new trainer: Vikas Singh (Role: General Trainer)',              severity: 'low',    ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: 'STAFF-089' },
  { id: '4',  timestamp: '2025-06-19T14:20:00Z', action: 'REFUND_ISSUED',     user: 'Pooja Sharma (Manager)', branchId: 'b2', details: 'Refunded ₹2,000 to Member ID: MEM-009 (Ananya Reddy)',               severity: 'high',   ip: '192.168.1.22', module: 'Finance',    userAgent: 'Firefox/Windows', affectedRecordId: 'MEM-009' },
  { id: '5',  timestamp: '2025-06-18T11:00:00Z', action: 'LOGIN_FAILED',      user: 'Unknown IP',             branchId: 'b1', details: '5 failed login attempts for manager@andheri.com',                    severity: 'high',   ip: '203.0.113.5',  module: 'Auth',       userAgent: 'Unknown',        affectedRecordId: undefined },
  { id: '6',  timestamp: '2025-06-18T09:30:00Z', action: 'MEMBER_SUSPENDED',  user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Suspended member Karan Mehta (MEM-005) due to non-payment',          severity: 'medium', ip: '192.168.1.10', module: 'Members',    userAgent: 'Chrome/Windows', affectedRecordId: 'MEM-005' },
  { id: '7',  timestamp: '2025-06-17T16:00:00Z', action: 'SETTINGS_CHANGED',  user: 'Super Admin',            branchId: 'all', details: 'Updated GST number from 27AABCU9603R1ZX to 27AABCU9603R1ZY',       severity: 'medium', ip: '10.0.0.1',    module: 'Settings',   userAgent: 'Chrome/Mac',     affectedRecordId: undefined },
  { id: '8',  timestamp: '2025-06-17T13:45:00Z', action: 'BULK_IMPORT',       user: 'Super Admin',            branchId: 'b3', details: 'Imported 45 new members from CSV file (members_jun2025.csv)',        severity: 'low',    ip: '10.0.0.1',    module: 'Members',    userAgent: 'Chrome/Mac',     affectedRecordId: undefined },
  { id: '9',  timestamp: '2025-06-16T11:20:00Z', action: 'STAFF_DELETED',     user: 'Super Admin',            branchId: 'b2', details: 'Deleted staff record: Mohan Das (Role: Receptionist)',               severity: 'high',   ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: 'STAFF-041' },
  { id: '10', timestamp: '2025-06-16T09:00:00Z', action: 'PLAN_DELETED',      user: 'Super Admin',            branchId: 'all', details: 'Deleted plan: "Trial 7-Day" (was assigned to 0 members)',           severity: 'medium', ip: '10.0.0.1',    module: 'Plans',      userAgent: 'Chrome/Mac',     affectedRecordId: 'PLAN-002' },
  { id: '11', timestamp: '2025-06-15T17:30:00Z', action: 'ADMIN_LOGIN',       user: 'Super Admin',            branchId: 'all', details: 'Successful admin login from new device (Chrome/Windows)',            severity: 'low',    ip: '10.0.0.1',    module: 'Auth',       userAgent: 'Chrome/Windows', affectedRecordId: undefined },
  { id: '12', timestamp: '2025-06-15T14:10:00Z', action: 'EXPENSE_ADDED',     user: 'Pooja Sharma (Manager)', branchId: 'b2', details: 'Added expense: Rent ₹32,000 for June 2025',                          severity: 'low',    ip: '192.168.1.22', module: 'Finance',    userAgent: 'Firefox/Windows', affectedRecordId: 'EXP-112' },
  { id: '13', timestamp: '2025-06-14T12:00:00Z', action: 'MEMBER_DELETED',    user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Permanently deleted member record: Suresh Kumar (MEM-011)',           severity: 'high',   ip: '192.168.1.10', module: 'Members',    userAgent: 'Chrome/Windows', affectedRecordId: 'MEM-011' },
  { id: '14', timestamp: '2025-06-14T10:30:00Z', action: 'PAYROLL_GENERATED', user: 'Super Admin',            branchId: 'all', details: 'Generated payroll for May 2025 (15 staff, Total: ₹2,45,000)',       severity: 'low',    ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: undefined },
  { id: '15', timestamp: '2025-06-13T16:45:00Z', action: 'BRANCH_UPDATED',    user: 'Super Admin',            branchId: 'b3', details: 'Updated branch details: Powai — changed manager to Priya K',         severity: 'medium', ip: '10.0.0.1',    module: 'Branches',   userAgent: 'Chrome/Mac',     affectedRecordId: 'b3' },
  { id: '16', timestamp: '2025-06-13T11:00:00Z', action: 'PAYMENT_ADDED',     user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Recorded payment INV-1089 ₹3,500 from Divya Singh (UPI)',             severity: 'low',    ip: '192.168.1.10', module: 'Finance',    userAgent: 'Chrome/Windows', affectedRecordId: 'INV-1089' },
  { id: '17', timestamp: '2025-06-12T15:20:00Z', action: 'LOGIN_FAILED',      user: 'Unknown IP',             branchId: 'b2', details: '3 failed login attempts for pooja@uptown.com',                       severity: 'high',   ip: '198.51.100.7', module: 'Auth',       userAgent: 'Unknown',        affectedRecordId: undefined },
  { id: '18', timestamp: '2025-06-12T09:45:00Z', action: 'MEMBER_FROZEN',     user: 'Pooja Sharma (Manager)', branchId: 'b2', details: 'Froze membership for Rohan Gupta (MEM-007) — medical leave',          severity: 'medium', ip: '192.168.1.22', module: 'Members',    userAgent: 'Firefox/Windows', affectedRecordId: 'MEM-007' },
  { id: '19', timestamp: '2025-06-11T14:00:00Z', action: 'ADDED_STAFF',       user: 'Super Admin',            branchId: 'b1', details: 'Added new receptionist: Kavya Nair (Role: Receptionist)',             severity: 'low',    ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: 'STAFF-092' },
  { id: '20', timestamp: '2025-06-11T10:15:00Z', action: 'SETTINGS_CHANGED',  user: 'Super Admin',            branchId: 'all', details: 'Enabled Two-Factor Authentication for all admin accounts',           severity: 'medium', ip: '10.0.0.1',    module: 'Settings',   userAgent: 'Chrome/Mac',     affectedRecordId: undefined },
  { id: '21', timestamp: '2025-06-10T17:00:00Z', action: 'REFUND_ISSUED',     user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Refunded ₹1,500 to Amit Verma (MEM-003) — plan downgrade',           severity: 'high',   ip: '192.168.1.10', module: 'Finance',    userAgent: 'Chrome/Windows', affectedRecordId: 'MEM-003' },
  { id: '22', timestamp: '2025-06-10T13:30:00Z', action: 'PLAN_CREATED',      user: 'Super Admin',            branchId: 'all', details: 'Created new plan: "Couple Fitness" ₹8,000/month',                   severity: 'low',    ip: '10.0.0.1',    module: 'Plans',      userAgent: 'Chrome/Mac',     affectedRecordId: 'PLAN-011' },
  { id: '23', timestamp: '2025-06-09T11:45:00Z', action: 'MEMBER_SUSPENDED',  user: 'Priya K (Manager)',      branchId: 'b3', details: 'Suspended Meera Pillai (MEM-012) — 3 months non-payment',            severity: 'medium', ip: '192.168.1.33', module: 'Members',    userAgent: 'Safari/iOS',     affectedRecordId: 'MEM-012' },
  { id: '24', timestamp: '2025-06-09T09:00:00Z', action: 'ADMIN_LOGIN',       user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Manager login from mobile device (Safari/iOS)',                       severity: 'low',    ip: '192.168.1.10', module: 'Auth',       userAgent: 'Safari/iOS',     affectedRecordId: undefined },
  { id: '25', timestamp: '2025-06-08T16:20:00Z', action: 'DELETED_PAYMENT',   user: 'Super Admin',            branchId: 'b3', details: 'Voided payment INV-0987 (duplicate entry, Amount: ₹4,200)',           severity: 'high',   ip: '10.0.0.1',    module: 'Finance',    userAgent: 'Chrome/Mac',     affectedRecordId: 'INV-0987' },
  { id: '26', timestamp: '2025-06-08T12:00:00Z', action: 'BRANCH_CREATED',    user: 'Super Admin',            branchId: 'all', details: 'Created new branch: Thane Hub (Location: Thane West)',               severity: 'low',    ip: '10.0.0.1',    module: 'Branches',   userAgent: 'Chrome/Mac',     affectedRecordId: 'b4' },
  { id: '27', timestamp: '2025-06-07T15:00:00Z', action: 'PAYROLL_PAID',      user: 'Super Admin',            branchId: 'all', details: 'Marked payroll as paid for May 2025 (₹2,38,000)',                   severity: 'low',    ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: undefined },
  { id: '28', timestamp: '2025-06-07T10:30:00Z', action: 'UPDATED_PLAN',      user: 'Super Admin',            branchId: 'all', details: 'Updated Gold Plan features — added "Personal Training 2x/week"',    severity: 'medium', ip: '10.0.0.1',    module: 'Plans',      userAgent: 'Chrome/Mac',     affectedRecordId: 'PLAN-005' },
  { id: '29', timestamp: '2025-06-06T14:45:00Z', action: 'STAFF_DELETED',     user: 'Super Admin',            branchId: 'b3', details: 'Removed staff: Arun Pillai (Role: Trainer) — resigned',              severity: 'high',   ip: '10.0.0.1',    module: 'HR',         userAgent: 'Chrome/Mac',     affectedRecordId: 'STAFF-055' },
  { id: '30', timestamp: '2025-06-06T09:15:00Z', action: 'EXPENSE_ADDED',     user: 'Priya K (Manager)',      branchId: 'b3', details: 'Added expense: Equipment Repair ₹8,500 (Treadmill belt replacement)', severity: 'low',    ip: '192.168.1.33', module: 'Finance',    userAgent: 'Safari/iOS',     affectedRecordId: 'EXP-098' },
  { id: '31', timestamp: '2025-06-05T11:00:00Z', action: 'PRODUCT_ADDED',     user: 'Rahul Verma (Manager)',  branchId: 'b1', details: 'Added new product: Whey Protein 1kg (SKU: WP-001, Price: ₹2,499)',    severity: 'low',    ip: '192.168.1.10', module: 'Store',      userAgent: 'Chrome/Windows', affectedRecordId: 'SKU-WP001' },
  { id: '32', timestamp: '2025-06-05T08:30:00Z', action: 'ATTENDANCE_MARKED', user: 'Pooja Sharma (Manager)', branchId: 'b2', details: 'Bulk attendance marked for 28 members — Morning batch (06:00–08:00)', severity: 'low',    ip: '192.168.1.22', module: 'Attendance', userAgent: 'Firefox/Windows', affectedRecordId: undefined },
];

export const MOCK_AUDIT_KPI: AuditKPIData = {
  totalEvents: 32,
  highSeverity: 10,
  mediumSeverity: 9,
  lowSeverity: 13,
  eventsToday: 3,
  uniqueUsers: 5,
};


export const MOCK_PERMISSIONS_DATA: PermissionsData = {
  roleDefaults: [
    {
      role: 'manager',
      permissions: {
        'members.view': true, 'members.create': true, 'members.edit': true, 'members.delete': false,
        'finance.view': true, 'finance.collect': true, 'finance.expenses': true, 'finance.refunds': false,
        'hr.view': true, 'hr.manage': true, 'hr.payroll': false,
        'attendance.view': true, 'attendance.mark': true,
        'reports.view': true, 'reports.export': true,
        'settings.view': true, 'settings.edit': true,
        'store.view': true, 'store.manage': true,
      },
    },
    {
      role: 'trainer',
      permissions: {
        'members.view': true, 'members.create': false, 'members.edit': false, 'members.delete': false,
        'finance.view': false, 'finance.collect': false, 'finance.expenses': false, 'finance.refunds': false,
        'hr.view': false, 'hr.manage': false, 'hr.payroll': false,
        'attendance.view': true, 'attendance.mark': true,
        'reports.view': false, 'reports.export': false,
        'settings.view': false, 'settings.edit': false,
        'store.view': true, 'store.manage': false,
      },
    },
  ],
  gymOverrides: [
    {
      gymId: 'b4', gymName: 'Thane', role: 'manager',
      overrides: { 'finance.expenses': false, 'hr.payroll': false, 'reports.export': false },
    },
  ],
};


export const MOCK_COUPONS: Coupon[] = [
  { id: 'c1', code: 'WELCOME20', description: '20% off for new members', type: 'percentage', value: 20, minOrderAmount: 1000, maxDiscount: 500, usageLimit: 200, usedCount: 87, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2025-01-01', validUntil: '2025-06-30', status: 'active', createdAt: '2025-01-01' },
  { id: 'c2', code: 'FLAT500', description: '₹500 flat off on annual plans', type: 'flat', value: 500, minOrderAmount: 5000, maxDiscount: 500, usageLimit: 100, usedCount: 43, assignedGyms: ['b1', 'b2'], assignedGymNames: ['Andheri East', 'Bandra West'], validFrom: '2025-01-15', validUntil: '2025-03-31', status: 'active', createdAt: '2025-01-15' },
  { id: 'c3', code: 'SUMMER15', description: '15% summer discount', type: 'percentage', value: 15, minOrderAmount: 2000, maxDiscount: 800, usageLimit: 150, usedCount: 150, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2024-05-01', validUntil: '2024-08-31', status: 'expired', createdAt: '2024-04-20' },
  { id: 'c4', code: 'POWAI10', description: '10% off at Powai branch', type: 'percentage', value: 10, minOrderAmount: 0, maxDiscount: 300, usageLimit: 50, usedCount: 12, assignedGyms: ['b3'], assignedGymNames: ['Powai'], validFrom: '2025-02-01', validUntil: '2025-04-30', status: 'active', createdAt: '2025-01-28' },
  { id: 'c5', code: 'REFER200', description: '₹200 off for referrals', type: 'flat', value: 200, minOrderAmount: 1500, maxDiscount: 200, usageLimit: 500, usedCount: 231, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2025-01-01', validUntil: '2025-12-31', status: 'active', createdAt: '2025-01-01' },
  { id: 'c6', code: 'THANE25', description: '25% off to boost Thane memberships', type: 'percentage', value: 25, minOrderAmount: 0, maxDiscount: 1000, usageLimit: 80, usedCount: 0, assignedGyms: ['b4'], assignedGymNames: ['Thane'], validFrom: '2025-03-01', validUntil: '2025-05-31', status: 'inactive', createdAt: '2025-02-20' },
];

export const MOCK_COUPONS_KPI: CouponsKPIData = {
  totalCoupons: 6,
  activeCoupons: 4,
  totalRedeemed: 523,
  revenueLost: 184500,
};
