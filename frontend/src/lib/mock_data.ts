// RESPONSIBILITY: Centralized mock data for offline/demo mode.
// DATA FLOW: apiFetch → getMockResponse() → hardcoded data when backend is unreachable.
import { mockFlags, mockNotes } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
// Every module's API path is matched here and returns a realistic ApiResponse<T>.

// ─── helpers ─────────────────────────────────────────────────────────────────
const ok = <T>(data: T, message = 'Success') => ({
  success: true, message, data,
  meta: { total: Array.isArray(data) ? (data as unknown[]).length : 1, page: 1, limit: 50, totalPages: 1 },
});

// ─── shared sub-shapes ───────────────────────────────────────────────────────
const BRANCHES = [
  { id: 'b1', name: 'Andheri East', city: 'Mumbai', activeMembers: 420, revenue: 185000, trend: 'up' as const },
  { id: 'b2', name: 'Bandra West',  city: 'Mumbai', activeMembers: 340, revenue: 142000, trend: 'up' as const },
  { id: 'b3', name: 'Powai',        city: 'Mumbai', activeMembers: 220, revenue: 98000,  trend: 'flat' as const },
  { id: 'b4', name: 'Thane',        city: 'Thane',  activeMembers: 180, revenue: 60000,  trend: 'down' as const },
];

const MEMBERS = Array.from({ length: 20 }, (_, i) => ({
  id: `m${i + 1}`,
  name: ['Rahul Sharma','Priya Singh','Amit Patel','Sneha Joshi','Kiran Kumar','Divya Nair','Rohan Gupta','Meera Pillai','Arjun Reddy','Pooja Iyer','Vishal Verma','Anjali Desai','Siddharth Rao','Kavya Menon','Nikhil Shah','Ritu Agarwal','Deepak Tiwari','Sunita Yadav','Manish Jain','Neha Mishra'][i],
  email: `user${i + 1}@gymsmart.com`,
  phone: `98${String(10000000 + i * 1111111).substring(0, 8)}`,
  plan: ['Gold Plan', 'Silver Plan', 'Basic Plan', 'Annual Pro'][i % 4],
  status: ['active', 'active', 'active', 'pending', 'expired'][i % 5],
  joinDate: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  paidAmount: 4999 + i * 500,
  branch: BRANCHES[i % 4]!.name,
  branchId: BRANCHES[i % 4]!.id,
  gender: i % 2 === 0 ? 'Male' : 'Female',
  age: 22 + (i % 15),
}));

const STAFF = Array.from({ length: 10 }, (_, i) => ({
  id: `s${i + 1}`,
  name: ['Ravi Trainer','Sunita Coach','Anand PT','Rekha Manager','Vijay Receptionist','Kavita Nutritionist','Suresh Admin','Lata Support','Arjun Security','Pradeep Cleaner'][i],
  role: ['Trainer','Coach','PT','Manager','Receptionist','Nutritionist','Admin','Support','Security','Cleaner'][i],
  branch: BRANCHES[i % 4]!.name,
  salary: 18000 + i * 2000,
  status: i < 8 ? 'active' : 'inactive',
  joinDate: `2023-0${(i % 9) + 1}-01`,
}));

const REVENUE_TREND = [
  { month: 'Jul', revenue: 720000, profit: 480000, expenses: 240000 },
  { month: 'Aug', revenue: 780000, profit: 520000, expenses: 260000 },
  { month: 'Sep', revenue: 810000, profit: 540000, expenses: 270000 },
  { month: 'Oct', revenue: 850000, profit: 570000, expenses: 280000 },
  { month: 'Nov', revenue: 890000, profit: 605000, expenses: 285000 },
  { month: 'Dec', revenue: 800000, profit: 515000, expenses: 285000 },
  { month: 'Jan', revenue: 920000, profit: 635000, expenses: 285000 },
];

const ATTENDANCE_TREND = REVENUE_TREND.map(r => ({
  month: r.month, count: Math.floor(r.revenue / 2800),
  checkIns: Math.floor(r.revenue / 1400),
}));

// ─── dashboard stats ─────────────────────────────────────────────────────────
const DASHBOARD_STATS = {
  totalMembers: 1160, activeMembers: 980, newMembersThisMonth: 48,
  totalRevenue: 4850000, monthlyRevenue: 920000, netProfit: 635000,
  totalExpenses: 285000, pendingPayments: 142000,
  totalStaff: 34, activeStaff: 30,
  totalProducts: 86, lowStockCount: 7,
  totalInquiries: 94, newInquiries: 18,
  cancellationRate: 4.2, retentionRate: 87.3, arpm: 4680,
  revenueGrowthPercent: 12.5, todayCollection: 45000, frozenMembershipsCount: 15, totalPTRevenue: 120000,
  memberGrowth: REVENUE_TREND.map(r => ({ month: r.month, count: Math.floor(r.revenue / 6000) })),
  revenueTrend: REVENUE_TREND,
  membersByPlan: [
    { plan: 'Gold Plan', count: 390 },
    { plan: 'Silver Plan', count: 300 },
    { plan: 'Basic Plan', count: 450 },
    { plan: 'Annual Pro', count: 80 },
  ],
  membersByStatus: { active: 980, pending: 80, expired: 100 },
  branchLeaderboard: BRANCHES.map(b => ({ id: b.id, name: b.name, revenue: b.revenue, activeMembers: b.activeMembers, trend: b.trend })),
  systemAlerts: [
    { id: 'a1', message: '7 products are running low on stock', severity: 'medium' as const, date: '2025-01-15' },
    { id: 'a2', message: '18 memberships expiring this week', severity: 'high' as const, date: '2025-01-14' },
    { id: 'a3', message: 'Thane branch attendance dropped 12%', severity: 'low' as const, date: '2025-01-13' },
  ],
  todayAttendance: 312, expiringThisWeek: 18, totalInquiriesOpen: 28, avgAttendance: 68.4, renewalsPending: 34,
};

// ─── plans ───────────────────────────────────────────────────────────────────
const PLANS = [
  { id: 'p1', name: 'Basic Plan', price: 1999, duration: 1, durationUnit: 'month', features: ['Gym Access', 'Locker'], status: 'active', membersCount: 450, color: '#6366f1' },
  { id: 'p2', name: 'Silver Plan', price: 3499, duration: 3, durationUnit: 'month', features: ['Gym Access', 'Locker', 'Group Classes'], status: 'active', membersCount: 300, color: '#8b5cf6' },
  { id: 'p3', name: 'Gold Plan',   price: 5999, duration: 6, durationUnit: 'month', features: ['Gym Access', 'Locker', 'Group Classes', 'PT Sessions'], status: 'active', membersCount: 390, color: '#f59e0b' },
  { id: 'p4', name: 'Annual Pro',  price: 9999, duration: 12, durationUnit: 'month', features: ['All Features', 'Unlimited PT', 'Nutrition'], status: 'active', membersCount: 80, color: '#10b981' },
];

// ─── notifications ────────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 'n1', text: '18 memberships expiring this week', time: '5m ago', unread: true },
  { id: 'n2', text: 'New member Rahul Sharma joined Andheri East', time: '1h ago', unread: true },
  { id: 'n3', text: 'Monthly revenue target achieved ₹9.2L', time: '3h ago', unread: false },
  { id: 'n4', text: 'Low stock alert: Protein Supplement running low', time: '5h ago', unread: false },
  { id: 'n5', text: 'Payroll processed for January 2025', time: '1d ago', unread: false },
];

// ─── coupons ─────────────────────────────────────────────────────────────────
const COUPONS = [
  { id: 'c1', code: 'WELCOME20', type: 'percent', value: 20, maxUses: 100, usedCount: 42, expiresAt: '2025-03-31', status: 'active', description: 'New member welcome discount' },
  { id: 'c2', code: 'FLAT500',   type: 'flat',    value: 500, maxUses: 50, usedCount: 23, expiresAt: '2025-02-28', status: 'active', description: 'Flat ₹500 off on any plan' },
  { id: 'c3', code: 'SUMMER30',  type: 'percent', value: 30, maxUses: 200, usedCount: 200, expiresAt: '2024-06-30', status: 'expired', description: 'Summer special discount' },
];

// ─── announcements ───────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { id: 'an1', title: 'Gym Maintenance – Saturday 6 AM', body: 'The gym will be closed from 6 AM to 9 AM on Saturday for routine maintenance.', audience: 'all', createdAt: '2025-01-14', status: 'published' },
  { id: 'an2', title: 'New Zumba Class Starting Feb 1', body: 'Join our energetic Zumba class every Monday and Wednesday at 7 PM.', audience: 'members', createdAt: '2025-01-12', status: 'published' },
  { id: 'an3', title: 'Holiday Hours – Republic Day', body: 'Gym will operate with reduced hours (8 AM – 2 PM) on Republic Day.', audience: 'all', createdAt: '2025-01-10', status: 'draft' },
];

// ─── sales / payments ─────────────────────────────────────────────────────────
const PAYMENTS = Array.from({ length: 12 }, (_, i) => ({
  id: `pay${i + 1}`,
  invoiceNo: `INV-2025-${String(1000 + i).padStart(4, '0')}`,
  member: { name: MEMBERS[i % 20]!.name, id: MEMBERS[i % 20]!.id },
  amount: PLANS[i % 4]!.price,
  method: ['UPI', 'Cash', 'Card', 'Net Banking'][i % 4]!,
  paidAt: `2025-01-${String((i % 28) + 1).padStart(2, '0')}`,
  status: i < 10 ? 'paid' : 'pending',
  plan: PLANS[i % 4]!.name,
  branch: BRANCHES[i % 4]!.name,
}));

// ─── superadmin gyms ──────────────────────────────────────────────────────────
const GYMS = [
  { id: 'g1', name: 'FitLife Andheri', ownerName: 'Rajesh Patel', adminEmail: 'admin@fitlife.com', phone: '9876543210', city: 'Mumbai', status: 'ACTIVE', memberCount: 420, plan: 'Enterprise', monthlyRevenue: 185000, databaseVersion: 'v2.4.1', createdAt: '2023-03-01' },
  { id: 'g2', name: 'PowerZone Bandra', ownerName: 'Sunita Reddy', adminEmail: 'admin@powerzone.com', phone: '9876543211', city: 'Mumbai', status: 'ACTIVE', memberCount: 340, plan: 'Pro', monthlyRevenue: 142000, databaseVersion: 'v2.4.1', createdAt: '2023-05-15' },
  { id: 'g3', name: 'IronHouse Powai', ownerName: 'Vikram Singh', adminEmail: 'admin@ironhouse.com', phone: '9876543212', city: 'Mumbai', status: 'ACTIVE', memberCount: 220, plan: 'Standard', monthlyRevenue: 98000, databaseVersion: 'v2.4.1', createdAt: '2023-07-20' },
  { id: 'g4', name: 'FlexFit Thane', ownerName: 'Meena Joshi', adminEmail: 'admin@flexfit.com', phone: '9876543213', city: 'Thane', status: 'TRIAL', memberCount: 180, plan: 'Trial', monthlyRevenue: 60000, databaseVersion: 'v2.4.1', createdAt: '2024-01-10' },
  { id: 'g5', name: 'ZenGym Pune', ownerName: 'Arun Kumar', adminEmail: 'admin@zengym.com', phone: '9876543214', city: 'Pune', status: 'SUSPENDED', memberCount: 0, plan: 'Standard', monthlyRevenue: 0, databaseVersion: 'v2.4.1', createdAt: '2022-12-01' },
];

// ─── franchises ───────────────────────────────────────────────────────────────
const FRANCHISES = [
  {
    id: 'f1', franchiseName: 'FitPulse India', ownerName: 'Rahul Sharma', ownerEmail: 'rahul@fitpulse.com',
    phone: '9800000001', status: 'ACTIVE', branchCount: 3, totalMembers: 1450, totalStaff: 45,
    totalMonthlyRevenue: 1200000, plan: 'Enterprise', city: 'Mumbai', state: 'Maharashtra', createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'f2', franchiseName: 'IronCore Fitness Group', ownerName: 'Amit Patel', ownerEmail: 'amit@ironcore.com',
    phone: '9800000002', status: 'ACTIVE', branchCount: 5, totalMembers: 3200, totalStaff: 80,
    totalMonthlyRevenue: 2500000, plan: 'Enterprise', city: 'Delhi', state: 'Delhi', createdAt: '2023-06-15T00:00:00Z'
  },
  {
    id: 'f3', franchiseName: 'Zenith Health Club', ownerName: 'Priya Singh', ownerEmail: 'priya@zenith.com',
    phone: '9800000003', status: 'SUSPENDED', branchCount: 1, totalMembers: 450, totalStaff: 12,
    totalMonthlyRevenue: 300000, plan: 'Pro', city: 'Pune', state: 'Maharashtra', createdAt: '2024-11-20T00:00:00Z'
  }
];

// ─── onboarding ───────────────────────────────────────────────────────────────
const ONBOARDING = [
  {
    id: 'o1', gymName: 'PowerLift Arena', ownerName: 'Vikram Singh', adminEmail: 'vikram@powerlift.com',
    phone: '9800001101', plan: 'Pro', signupDate: '2025-01-10T00:00:00Z', trialEndsAt: '2025-01-24T00:00:00Z',
    trialStatus: 'TRIAL', onboardingStatus: 'IN_PROGRESS', emailVerified: true, welcomeEmailSent: true,
    checklist: [
      { key: 'verify_email', label: 'Verify Email', done: true },
      { key: 'setup_profile', label: 'Setup Profile', done: true },
      { key: 'add_staff', label: 'Add Staff', done: false },
      { key: 'add_members', label: 'Add Members', done: false },
    ],
    daysInTrial: 5, trialDaysLeft: 9
  },
  {
    id: 'o2', gymName: 'Cardio Kings', ownerName: 'Neha Gupta', adminEmail: 'neha@cardiokings.com',
    phone: '9800001102', plan: 'Enterprise', signupDate: '2025-01-14T00:00:00Z', trialEndsAt: '2025-01-28T00:00:00Z',
    trialStatus: 'TRIAL', onboardingStatus: 'PENDING', emailVerified: false, welcomeEmailSent: true,
    checklist: [
      { key: 'verify_email', label: 'Verify Email', done: false },
      { key: 'setup_profile', label: 'Setup Profile', done: false },
      { key: 'add_staff', label: 'Add Staff', done: false },
      { key: 'add_members', label: 'Add Members', done: false },
    ],
    daysInTrial: 1, trialDaysLeft: 13
  }
];

// ─── affiliates ───────────────────────────────────────────────────────────────
const AFFILIATES = [
  { id: 'af1', name: 'Fitness Blog India', email: 'contact@fitnessblog.in', referralCode: 'FITBLOG20', totalReferred: 145, commissionEarned: 45000, status: 'ACTIVE', joinedAt: '2023-05-10T00:00:00Z', conversionRate: 12.5 },
  { id: 'af2', name: 'John Doe', email: 'john@example.com', referralCode: 'JOHNFIT', totalReferred: 12, commissionEarned: 3500, status: 'ACTIVE', joinedAt: '2024-01-20T00:00:00Z', conversionRate: 8.2 },
];

// ─── superadmin backups ────────────────────────────────────────────────────────
const BACKUPS = [
  { id: 'bk1', tenantName: 'FitLife', databaseName: 'db_fitlife_prod', sizeMB: 450, status: 'SUCCESS', timestamp: '2025-01-15T02:00:00Z' },
  { id: 'bk2', tenantName: 'IronCore', databaseName: 'db_ironcore_prod', sizeMB: 320, status: 'SUCCESS', timestamp: '2025-01-14T02:00:00Z' },
];

// ─── superadmin tickets ───────────────────────────────────────────────────────
const TICKETS = [
  { id: 'tk1', tenantId: 't1', tenantName: 'FitPulse Fitness', reporterEmail: 'admin@fitpulse.com', subject: 'Billing issue for Pro plan', description: 'We were charged twice this month.', status: 'OPEN', priority: 'HIGH', createdAt: '2025-01-15T10:30:00Z', updatedAt: '2025-01-15T10:30:00Z', lastUpdated: '2025-01-15T10:30:00Z', messages: [] },
  { id: 'tk2', tenantId: 't2', tenantName: 'IronCore Gym', reporterEmail: 'admin@ironcore.com', subject: 'How to add custom SMS templates?', description: 'I cannot find the SMS template settings.', status: 'RESOLVED', priority: 'NORMAL', createdAt: '2025-01-10T14:15:00Z', updatedAt: '2025-01-11T09:00:00Z', lastUpdated: '2025-01-11T09:00:00Z', messages: [] },
];

// ─── superadmin jobs ──────────────────────────────────────────────────────────
const JOBS = {
  metrics: { activeJobs: 2, completed24h: 150, failed24h: 3, delayed: 1 },
  jobs: [
    { id: 'jb1', queueName: 'invoice_queue', jobName: 'Daily Invoice Generation', status: 'COMPLETED', attempts: 1, createdAt: '2025-01-15T01:00:00Z' },
    { id: 'jb2', queueName: 'sync_queue', jobName: 'Member Sync', status: 'ACTIVE', attempts: 1, createdAt: '2025-01-15T12:00:00Z' },
  ]
};

// ─── migrations ───────────────────────────────────────────────────────────────
const MIGRATIONS = [
  { id: 'mg1', version: 'v1.5.0', name: 'Add Franchise Tables', status: 'SUCCESS', appliedAt: '2024-12-01T00:00:00Z', executionTimeMs: 1450 },
  { id: 'mg2', version: 'v1.6.0', name: 'Update Churn Indexes', status: 'SUCCESS', appliedAt: '2025-01-05T00:00:00Z', executionTimeMs: 320 },
];

// ─── superadmin usage meters ──────────────────────────────────────────────────
const USAGE_METERS = [
  { id: 'um1', tenantId: 't1', tenantName: 'FitPulse Fitness', metricName: 'SMS', currentValue: 8450, limitValue: 10000, resetDate: '2025-02-01T00:00:00Z', smsSent: 8450, smsLimit: 10000, whatsappMessagesSent: 450, whatsappLimit: 1000, emailsSent: 12000, emailLimit: 50000, apiCallsCount: 450000, databaseGb: 4.5, mediaGb: 12.2, storageLimitGb: 50, activeMembers: 320, totalMembers: 450, memberLimit: 500, staffCount: 12, staffLimit: 20, billingCycleEnd: '2025-02-01T00:00:00Z' },
];

// ─── superadmin features ──────────────────────────────────────────────────────
const FEATURES = [
  { id: 'ft1', key: 'ENABLE_AI_COACH', value: 'true', description: 'Enable AI workout generation', category: 'BETA', dataType: 'boolean' },
];

// ─── superadmin system health ─────────────────────────────────────────────────
const SYSTEM_HEALTH = [
  { id: 'sh1', name: 'Database primary', targetSla: 99.99, actualUptime: 99.98, downtimeIncidents: 1, downtimeMinutes: 5, status: 'WARNING' },
  { id: 'sh2', name: 'API Gateway', targetSla: 99.99, actualUptime: 100, downtimeIncidents: 0, downtimeMinutes: 0, status: 'MET' },
  { id: 'sh3', name: 'FitPulse India - Dedicated DB', targetSla: 99.99, actualUptime: 98.50, downtimeIncidents: 3, downtimeMinutes: 145, status: 'BREACHED' }
];

// ─── audit logs ───────────────────────────────────────────────────────────────
const AUDIT_LOGS = [
  { id: 'au1', actorId: 'u1', actorName: 'Demo Admin', actorRole: 'SUPERADMIN', action: 'TENANT_SUSPENDED', targetId: 't3', targetResource: 'Zenith Health Club', targetName: 'Zenith Health Club', ipAddress: '192.168.1.1', timestamp: '2025-01-15T09:00:00Z' },
  { id: 'au2', actorId: 'u2', actorName: 'System', actorRole: 'SYSTEM', action: 'BACKUP_CREATED', targetId: 'bk1', targetResource: 'db_backup.sql', targetName: 'db_backup.sql', ipAddress: '127.0.0.1', timestamp: '2025-01-15T02:00:00Z' },
];

// ─── infrastructure ───────────────────────────────────────────────────────────
const INFRASTRUCTURE = [
  { id: 'in1', nodeName: 'web-worker-01', region: 'ap-south-1', status: 'HEALTHY', cpuUsage: 45, memoryUsage: 62, uptime: '45d' },
  { id: 'in2', nodeName: 'db-primary', region: 'ap-south-1', status: 'HEALTHY', cpuUsage: 78, memoryUsage: 85, uptime: '120d' },
];

// ─── churn alerts ─────────────────────────────────────────────────────────────
const CANCELLATIONS_ALERTS = [
  { id: 'c1', tenantId: 't1', gymName: 'FitPulse Fitness', ownerName: 'Rajesh', adminEmail: 'admin@fitpulse.com', phone: '1234567890', plan: 'Basic', riskLevel: 'HIGH', actionStatus: 'PENDING', riskScore: 85, lastLoginDays: 14, memberDrop: 10, paymentFailures: 0, renewalDaysLeft: 5, mrrAtRisk: 1000, notes: '', flaggedAt: '2025-01-01T00:00:00Z' },
  { id: 'c2', tenantId: 't2', gymName: 'IronCore Gym', ownerName: 'Sunita', adminEmail: 'admin@ironcore.com', phone: '1234567890', plan: 'Pro', riskLevel: 'LOW', actionStatus: 'CONTACTED', riskScore: 45, lastLoginDays: 2, memberDrop: 20, paymentFailures: 0, renewalDaysLeft: 10, mrrAtRisk: 2000, notes: '', flaggedAt: '2025-01-01T00:00:00Z' }
];

// ─── superadmin dashboard ─────────────────────────────────────────────────────
const SUPERADMIN_DASHBOARD = {
  metrics: {
    totalGyms: 5,
    activeGyms: 3,
    suspendedGyms: 1,
    trialGyms: 1,
    totalEndUsers: 1160,
    monthlyRecurringRevenue: 920000,
    overdueInvoicesCount: 4,
    pendingRevenue: 150000,
    recentOnboards: GYMS.slice(0, 3),
    mrrDeltaPercent: 12.5,
    arrDeltaPercent: 45.2,
    arpu: 28000,
    revenueByTier: [
      { plan: 'Enterprise', amount: 450000, tenantCount: 2 },
      { plan: 'Pro', amount: 300000, tenantCount: 3 },
      { plan: 'Standard', amount: 170000, tenantCount: 5 },
    ],
    revenueByGeography: [
      { region: 'Mumbai', revenue: 620000 },
      { region: 'Pune', revenue: 200000 },
      { region: 'Delhi', revenue: 100000 },
    ],
    platformHealthScore: 92,
  },
  revenue: REVENUE_TREND.map(r => ({ month: r.month, mrr: r.revenue })),
  growth: [
    { month: 'Jul', gyms: 3 }, { month: 'Aug', gyms: 3 }, { month: 'Sep', gyms: 4 },
    { month: 'Oct', gyms: 4 }, { month: 'Nov', gyms: 4 }, { month: 'Dec', gyms: 5 }, { month: 'Jan', gyms: 5 },
  ],
};

// ─── trainer dashboard ────────────────────────────────────────────────────────
const TRAINER_DASHBOARD = {
  todaysSessions: 5,
  completedSessions: 3,
  pendingSessions: 2,
  myMembersCount: 24,
  todaysAttendance: 18,
  pendingWorkoutPlans: 4,
  monthlyEarnings: 45000,
  memberGoalCompletionRate: 82,
  goalCompletionTrend: [
    { month: 'Jul', rate: 75 }, { month: 'Aug', rate: 78 }, { month: 'Sep', rate: 80 },
    { month: 'Oct', rate: 81 }, { month: 'Nov', rate: 85 }, { month: 'Dec', rate: 82 },
  ],
  recentMemberProgress: [
    { id: 'm1', name: 'Rahul Sharma', detail: 'Lost 2kg this month', time: '2h ago' },
    { id: 'm2', name: 'Priya Singh', detail: 'Increased deadlift by 10kg', time: '1d ago' },
  ],
  upcomingSessions: [
    { id: 's1', name: 'Amit Patel', time: '14:00', type: 'Weight Training' },
    { id: 's2', name: 'Sneha Joshi', time: '16:30', type: 'HIIT' },
  ],
  membersByPlan: [
    { plan: 'Gold Plan', count: 14 },
    { plan: 'Annual Pro', count: 10 },
  ],
  trainerProfile: {
    name: 'Ravi Trainer', shiftStart: '06:00', shiftEnd: '14:00', rating: 4.8
  },
  totalPTRevenue: 120000,
  weeklySessionsCompleted: 15,
  avgSessionRating: 4.9,
  activeClientsCount: 20,
  attendanceRate: 92,
  nextSessionTime: '14:00',
};

// ─── attendance ───────────────────────────────────────────────────────────────
const ATTENDANCE = Array.from({ length: 15 }, (_, i) => ({
  id: `att${i + 1}`,
  memberId: MEMBERS[i % 20]!.id,
  memberName: MEMBERS[i % 20]!.name,
  memberPhone: MEMBERS[i % 20]!.phone,
  branchId: BRANCHES[i % 4]!.id,
  branchName: BRANCHES[i % 4]!.name,
  checkInTime: `0${6 + (i % 4)}:${String(i * 7 % 60).padStart(2, '0')}`,
  checkOutTime: `0${8 + (i % 4)}:${String(i * 9 % 60).padStart(2, '0')}`,
  date: `2025-01-${String((i % 28) + 1).padStart(2, '0')}`,
  status: ['present', 'late', 'absent'][i % 3],
  planName: PLANS[i % 4]!.name,
  sessionType: ['General', 'PT', 'Class'][i % 3] as 'General' | 'PT' | 'Class'
}));

// ─── superadmin branches ──────────────────────────────────────────────────────
const SUPERADMIN_BRANCHES = [
  { id: 'b1', tenantId: 't1', tenantName: 'FitLife', branchName: 'Andheri East', name: 'Andheri East', location: 'Andheri', city: 'Mumbai', state: 'MH', managerName: 'Raj', managerEmail: 'raj@fit.com', phone: '999', status: 'ACTIVE', memberCount: 320, totalMembers: 320, staffCount: 12, monthlyRevenue: 450000, createdAt: '2023-01-01', updatedAt: '2023-01-01' }
];

// ─── superadmin plans ─────────────────────────────────────────────────────────
const SUPERADMIN_PLANS = [
  { id: 'p1', name: 'Basic', priceMonthly: 1000, priceAnnual: 10000, maxMembers: 500, maxStaff: 10, dbLimitGb: 5, binaryLimitGb: 10, features: ['Access'], activeTenants: 45, isPublic: true, trialDays: 14, setupFee: 0, currency: 'INR' },
];

// ─── superadmin invoices ──────────────────────────────────────────────────────
const SUPERADMIN_INVOICES = [
  { id: 'inv1', tenantId: 't1', tenantName: 'FitLife', amount: 15000, currency: 'INR', status: 'PAID', issuedAt: '2025-01-01', dueDate: '2025-01-15', issuedDate: '2025-01-01', paidDate: '2025-01-10', paidAt: '2025-01-10', paymentMethod: 'CARD', invoiceType: 'RECURRING', planName: 'Pro' }
];

// ─── superadmin coupons ───────────────────────────────────────────────────────
const SUPERADMIN_COUPONS = [
  { id: 'c1', code: 'WELCOME20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 100, currentUses: 42, status: 'ACTIVE', expiryDate: '2025-03-31T00:00:00Z', isDeleted: false },
];

// ─── superadmin messaging ─────────────────────────────────────────────────────
const MESSAGING_MESSAGES = [
  { id: 'msg1', tenantId: 't1', tenantName: 'FitLife Andheri', channel: 'EMAIL', subject: 'System Update', body: 'Please update your system', status: 'SENT', sentAt: '2025-01-15T10:00:00Z', scheduledAt: null, createdAt: '2025-01-15T09:00:00Z' },
  { id: 'msg2', tenantId: 't2', tenantName: 'PowerZone Bandra', channel: 'SMS', subject: 'Payment Failed', body: 'Your last payment failed', status: 'FAILED', sentAt: null, scheduledAt: null, createdAt: '2025-01-14T09:00:00Z' },
];

const MESSAGING_NOTIFICATIONS = [
  { id: 'notif1', title: 'High CPU Usage', body: 'Server CPU is above 90%', type: 'CRITICAL', read: false, createdAt: '2025-01-16T10:00:00Z' },
  { id: 'notif2', title: 'New Tenant Signup', body: 'FitLife Andheri joined', type: 'INFO', read: true, createdAt: '2025-01-15T10:00:00Z' },
];

const MESSAGING_TENANTS = [
  { id: 't1', name: 'FitLife Andheri', plan: 'Enterprise' },
  { id: 't2', name: 'PowerZone Bandra', plan: 'Pro' },
];

// ─── superadmin broadcasts ────────────────────────────────────────────────────
const BROADCASTS = [
  { id: 'bc1', title: 'System Maintenance', content: 'Downtime expected', status: 'SENT', targetGymIds: ['g1', 'g2'], scheduledDate: null, sentDate: '2025-01-01T00:00:00Z', totalRecipients: 45, deliveredCount: 45, failedCount: 0, audience: 'ALL_TENANTS' },
  { id: 'bc2', title: 'New Feature Launch', content: 'AI Coach is here', status: 'SCHEDULED', targetGymIds: ['g1'], scheduledDate: '2025-02-01T00:00:00Z', sentDate: null, totalRecipients: 10, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY' }
];

// ─── superadmin reports ───────────────────────────────────────────────────────
const REPORTS = {
  revenue: [{ month: 'Jan', mrr: 5000, newRevenue: 1000, cancelledRevenue: 0, netRevenue: 6000, tenantCount: 45 }],
  cancellations: [{ id: 'c1', gymName: 'FitLife', ownerName: 'Raj', plan: 'Basic', cancelledAt: '2025-01-01', reason: 'Too expensive', mrr: 1000, daysActive: 365 }],
  health: [{ id: 't1', gymName: 'FitLife', plan: 'Basic', score: 95, grade: 'A', memberCount: 320, lastLogin: '2025-01-01', paymentHealth: 'GOOD', featureUsage: 80, supportTickets: 0 }]
};

// ─── main router ─────────────────────────────────────────────────────────────

// ─── ADMIN SPECIFIC MOCKS ───────────────────────────────────────────────
const ADMIN_REPORTS = {
  revenueByGym: BRANCHES.map(b => ({ gymId: b.id, gymName: b.name, revenue: b.revenue, expenses: b.revenue * 0.4, profit: b.revenue * 0.6, trend: b.trend, trendPercent: 12.5 })),
  revenueByMethod: [
    { method: 'UPI', amount: 450000, count: 120 },
    { method: 'Card', amount: 350000, count: 85 },
    { method: 'Cash', amount: 120000, count: 40 }
  ],
  revenueByPlan: PLANS.map(p => ({ planName: p.name, amount: p.price * p.membersCount, count: p.membersCount })),
  monthlyRevenue: REVENUE_TREND.map(r => ({ month: r.month, revenue: r.revenue, expenses: r.expenses, profit: r.profit })),
  membershipGrowth: BRANCHES.map(b => ({ gymId: b.id, gymName: b.name, newMembers: 45, renewals: 120, exits: 5, netGrowth: 40, activeMembers: b.activeMembers })),
  attendanceSummary: BRANCHES.map(b => ({ gymId: b.id, gymName: b.name, avgDailyAttendance: Math.floor(b.activeMembers * 0.4), peakDay: 'Monday', attendanceRate: 40, totalCheckIns: b.activeMembers * 12 })),
  payrollSummary: BRANCHES.map(b => ({ gymId: b.id, gymName: b.name, totalStaff: 8, totalPayroll: 240000, paid: 240000, pending: 0, advances: 5000 })),
  pnlSummary: BRANCHES.map(b => ({ gymId: b.id, gymName: b.name, revenue: b.revenue, membershipRevenue: b.revenue * 0.9, storeRevenue: b.revenue * 0.1, totalExpenses: b.revenue * 0.4, staffCost: b.revenue * 0.25, operationalCost: b.revenue * 0.15, netProfit: b.revenue * 0.6, profitMargin: 60 })),
  kpis: {
    totalRevenue: 4850000,
    totalExpenses: 1850000,
    netProfit: 3000000,
    totalMembers: 1160,
    newMembers: 125,
    avgAttendanceRate: 45,
    cancellationRate: 2.1
  }
};

const ADMIN_ATTENDANCE_SUMMARY = {
  todayTotal: 312,
  todayPresent: 285,
  todayLate: 27,
  weeklyAverage: 295,
  peakHour: '18:00',
  trendVsLastWeek: 5.4,
  uniqueMembersThisMonth: 850
};

const ADMIN_MEMBERS_SUMMARY = {
  totalMembers: 1160,
  activeMembers: 980,
  expiredMembers: 100,
  pendingMembers: 80,
  expiringThisWeek: 18,
  expiringThisMonth: 45,
  totalOutstanding: 142000,
  newThisMonth: 48
};

const ADMIN_MEMBERS = Array.from({ length: 20 }, (_, i) => ({
  id: `m${i + 1}`,
  name: ['Rahul Sharma','Priya Singh','Amit Patel','Sneha Joshi','Kiran Kumar','Divya Nair','Rohan Gupta','Meera Pillai','Arjun Reddy','Pooja Iyer','Vishal Verma','Anjali Desai','Siddharth Rao','Kavya Menon','Nikhil Shah','Ritu Agarwal','Deepak Tiwari','Sunita Yadav','Manish Jain','Neha Mishra'][i],
  email: `user${i + 1}@gymsmart.com`,
  phone: `98${String(10000000 + i * 1111111).substring(0, 8)}`,
  gender: i % 2 === 0 ? 'Male' : 'Female',
  address: 'Mumbai, Maharashtra',
  branchId: BRANCHES[i % 4]!.id,
  branchName: BRANCHES[i % 4]!.name,
  planName: PLANS[i % 4]!.name,
  billingCycle: 'monthly',
  status: ['active', 'active', 'active', 'pending', 'expired'][i % 5],
  joinDate: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  paidAmount: PLANS[i % 4]!.price,
  pendingAmount: i % 5 === 3 ? 1500 : 0,
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`
}));

const ADMIN_STORE_SUMMARY = {
  totalProducts: 45, totalOrders: 128, totalRevenue: 85000,
  lowStockProducts: [
    { id: 'p1', name: 'Whey Protein 1kg', category: 'Supplements', price: 2999, stock: 4, isActive: true },
    { id: 'p2', name: 'Gym Towel', category: 'Accessories', price: 299, stock: 2, isActive: true }
  ]
};

const ADMIN_STORE_ORDERS = Array.from({ length: 10 }, (_, i) => ({
  id: `ord${i + 1}`,
  total: 2999 + i * 500,
  method: ['UPI', 'Card', 'Cash'][i % 3],
  status: ['completed', 'pending'][i % 2],
  createdAt: `2025-01-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  items: [
    { id: `item${i + 1}`, qty: 1, price: 2999, product: { name: 'Whey Protein 1kg' } }
  ]
}));

const ADMIN_SALES_INITIAL_DATA = {
  overviewData: REVENUE_TREND.map(r => ({ date: `2024-${r.month}-01`, revenue: r.revenue })),
  membershipReport: [
    { plan: 'Gold Plan', totalMembers: 390, activeMembers: 350, revenue: 2339610, receivable: 15000, received: 2339610, remaining: 15000, refund: 0 }
  ],
  membershipTotals: { activeCount: 980, revenue: 4850000, totalReceivable: 142000, totalReceived: 4850000, remaining: 142000, refunds: 5000 },
  pendingPayments: ADMIN_MEMBERS.filter(m => m.pendingAmount > 0),
  pendingTotal: 142000,
  allMemberships: ADMIN_MEMBERS,
  allMembershipsTotal: 1160,
  storeOrders: ADMIN_STORE_ORDERS,
  storeOrdersTotal: 128,
  storeSummary: ADMIN_STORE_SUMMARY
};

const ADMIN_PAYMENTS = ADMIN_MEMBERS.map((m, i) => ({
  id: `pay${i + 1}`,
  memberId: m.id,
  amount: m.paidAmount,
  method: ['UPI', 'Card', 'Cash'][i % 3],
  status: 'COMPLETED',
  invoiceNo: `INV-2025-${1000 + i}`,
  paidAt: `2025-01-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  member: { name: m.name, email: m.email, phone: m.phone, plan: { name: m.planName } }
}));

const EXPENSES = Array.from({ length: 15 }, (_, i) => ({
  id: `exp${i + 1}`,
  amount: 5000 + i * 1000,
  category: ['Rent', 'Salaries', 'Utilities', 'Maintenance', 'Marketing'][i % 5],
  branchId: BRANCHES[i % 4]!.id,
  branchName: BRANCHES[i % 4]!.name,
  date: `2025-01-${String((i % 28) + 1).padStart(2, '0')}`,
  recordedBy: 'Admin',
  vendor: ['XYZ Corp', 'City Power', 'Max Cleaners'][i % 3]
}));

const ADMIN_FINANCE_SUMMARY = {
  totalRevenue: 4850000, monthlyRevenue: 850000, pendingAmount: 142000,
  totalPayments: 1250,
  totalExpenses: 1850000,
  netProfit: 3000000,
  revenueByMethod: { UPI: 250000, Cash: 150000, Card: 450000, NetBanking: 0 },
  monthlyData: REVENUE_TREND.map(r => ({ month: r.month, revenue: r.revenue }))
};

const ADMIN_FINANCE_PNL = BRANCHES.map(b => ({
  branchId: b.id,
  branchName: b.name,
  location: b.city,
  revenue: b.revenue,
  expenses: b.revenue * 0.4,
  netProfit: b.revenue * 0.6,
  marginPct: 60,
  status: 'PROFITABLE',
  momDelta: 12.5,
  revenueBreakdown: { memberships: b.revenue * 0.7, ptSessions: b.revenue * 0.2, products: b.revenue * 0.1, other: 0 },
  expenseBreakdown: { rent: b.revenue * 0.1, salaries: b.revenue * 0.15, utilities: b.revenue * 0.05, maintenance: b.revenue * 0.05, marketing: b.revenue * 0.05 }
}));

const ADMIN_PLANS_REVENUE = PLANS.map((p, i) => ({
  id: p.id,
  planName: p.name,
  tier: ['Basic', 'Standard', 'Premium', 'VIP'][i % 4],
  totalRevenue: p.price * p.membersCount,
  activeSubscriptions: p.membersCount,
  newSignups: 15,
  renewalRate: 85.5
}));

export function getMockResponse(path: string): unknown {
  const p = path.toLowerCase();

  // Auth
  if (p.includes('/auth/login'))   return ok({ accessToken: 'mock_token', refreshToken: 'mock_refresh', user: { id: 'u1', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' } });
  if (p.includes('/auth/me'))      return ok({ id: 'u1', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' });

  // Superadmin Specific
  if (p.includes('/superadmin/dashboard')) return ok(SUPERADMIN_DASHBOARD, 'Superadmin stats fetched');
  if (p.includes('/superadmin/branches') || p.includes('/branch')) return ok(SUPERADMIN_BRANCHES, 'Branches fetched');
  if (p.includes('/superadmin/saas-billing/plans')) return ok(SUPERADMIN_PLANS, 'Plans fetched');
  if (p.includes('/superadmin/saas-billing/invoices') || p.includes('/invoice')) return ok(SUPERADMIN_INVOICES, 'Invoices fetched');
  if (p.includes('/superadmin/saas-billing/coupons') || p.includes('/coupon')) return ok(SUPERADMIN_COUPONS, 'Coupons fetched');
  if (p.includes('/superadmin/messaging/messages')) return ok(MESSAGING_MESSAGES, 'Messages fetched');
  if (p.includes('/superadmin/messaging/notifications')) return ok(MESSAGING_NOTIFICATIONS, 'Notifications fetched');
  if (p.includes('/superadmin/messaging/tenants')) return ok(MESSAGING_TENANTS, 'Tenants fetched');
  if (p.includes('/superadmin/broadcast')) return ok(BROADCASTS, 'Broadcasts fetched');
  if (p.includes('/superadmin/reports/revenue')) return ok(REPORTS.revenue, 'Revenue fetched');
  if (p.includes('/superadmin/reports/cancellations')) return ok(REPORTS.cancellations, 'Cancellations fetched');
  if (p.includes('/superadmin/reports/health')) return ok(REPORTS.health, 'Health fetched');
  if (p.includes('/superadmin/reports')) return ok(REPORTS, 'Reports fetched');
  
  if (p.includes('/franchise')) return ok(FRANCHISES, 'Franchises fetched');
  if (p.includes('/onboarding')) return ok(ONBOARDING, 'Onboarding data fetched');
  if (p.includes('/affiliate')) return ok(AFFILIATES, 'Affiliates fetched');
  if (p.includes('/backup')) return ok(BACKUPS, 'Backups fetched');
  if (p.includes('/ticket')) return ok(TICKETS, 'Tickets fetched');
  if (p.includes('/superadmin/system-ops/jobs')) return ok(JOBS.jobs, 'Jobs fetched');
  if (p.includes('/job')) return ok(JOBS, 'Jobs fetched');
  if (p.includes('/superadmin/system/migrations')) return ok({ tenants: GYMS.map((g, i) => ({ id: g.id, name: g.name, plan: g.plan, databaseVersion: i === 1 ? 'v2.4.0' : 'v2.4.1' })) }, 'Migrations fetched');
  if (p.includes('/migration') || p.includes('/superadmin/system-ops/migrations')) return ok(MIGRATIONS, 'Migrations fetched');
  if (p.includes('/usage-meter')) return ok(USAGE_METERS, 'Usage meters fetched');
  if (p.includes('/superadmin/features')) return ok({ flags: mockFlags, notes: mockNotes }, 'Features fetched');
  if (p.includes('/feature') || p.includes('/setting')) return ok(FEATURES, 'Features fetched');
  if (p.includes('/audit')) return ok(AUDIT_LOGS, 'Audit logs fetched');
  if (p.includes('/system')) return ok(SYSTEM_HEALTH, 'System health fetched');
  if (p.includes('/infrastructure')) return ok(INFRASTRUCTURE, 'Infrastructure fetched');
  if (p.includes('/cancellations')) return ok(CANCELLATIONS_ALERTS, 'Churn alerts fetched');
  
  if (p.includes('/analytics')) {
    return ok({
      metrics: {
        mrr: 920000, arr: 11040000, cancellationRate: 1.2, ltv: 250000, cac: 12000,
        activeTenants: 145, arpu: 28000, mrrDeltaPercent: 12.5, arrDeltaPercent: 45.2, churnDeltaPercent: -0.5
      },
      monthly: [
        { month: 'Jul', mrr: 750000, tenantCount: 120, cancelledCount: 2 },
        { month: 'Aug', mrr: 780000, tenantCount: 125, cancelledCount: 1 },
        { month: 'Sep', mrr: 800000, tenantCount: 128, cancelledCount: 3 },
        { month: 'Oct', mrr: 820000, tenantCount: 135, cancelledCount: 1 },
        { month: 'Nov', mrr: 860000, tenantCount: 140, cancelledCount: 2 },
        { month: 'Dec', mrr: 900000, tenantCount: 142, cancelledCount: 1 },
        { month: 'Jan', mrr: 920000, tenantCount: 145, cancelledCount: 0 },
      ],
      planRevenue: [
        { plan: 'Enterprise', revenue: 450000, tenantCount: 25 },
        { plan: 'Pro', revenue: 300000, tenantCount: 50 },
        { plan: 'Standard', revenue: 170000, tenantCount: 70 },
      ]
    }, 'Analytics data fetched');
  }
  
  if (p.includes('/impersonate')) {
    return ok({ token: 'mock_ghost_token_123' }, 'Impersonation successful');
  }
  
  if (p.includes('/gym')) return ok(GYMS, 'Gyms fetched');

  // Trainer Specific
  if (p.includes('/trainer/dashboard')) return ok(TRAINER_DASHBOARD, 'Trainer stats fetched');

  if (p.includes('/trainer/earnings')) {
    const { MOCK_EARNINGS_DATA } = require('@/app/trainer/earnings/earnings_fixtures/TrainerEarningsMockData');
    return ok(MOCK_EARNINGS_DATA, 'Trainer earnings fetched');
  }

  if (p.includes('/trainer/attendance')) {
    const { MOCK_ATTENDANCE_RECORDS } = require('@/app/trainer/attendance/attendance_fixtures/TrainerAttendanceMockData');
    return ok({ data: MOCK_ATTENDANCE_RECORDS, total: MOCK_ATTENDANCE_RECORDS.length }, 'Trainer attendance fetched');
  }

  if (p.includes('/trainer/members')) {
    const { MOCK_TRAINER_MEMBERS } = require('@/app/trainer/members/members_fixtures/TrainerMembersMockData');
    return ok({ data: MOCK_TRAINER_MEMBERS, total: MOCK_TRAINER_MEMBERS.length }, 'Trainer members fetched');
  }

  if (p.includes('/trainer/schedule')) {
    const { MOCK_TRAINER_SCHEDULE_DATA } = require('@/app/trainer/schedule/schedule_fixtures/TrainerScheduleMockData');
    return ok(MOCK_TRAINER_SCHEDULE_DATA, 'Trainer schedule fetched');
  }

  if (p.includes('/trainer/progress')) {
    const { MOCK_TRAINER_PROGRESS_RECORDS } = require('@/app/trainer/progress-tracking/progress_fixtures/TrainerProgressMockData');
    return ok({ data: MOCK_TRAINER_PROGRESS_RECORDS, total: MOCK_TRAINER_PROGRESS_RECORDS.length }, 'Trainer progress fetched');
  }
  
  if (p.includes('/trainer/workout')) {
    const { MOCK_TRAINER_WORKOUT_PLANS } = require('@/app/trainer/workout/workout_fixtures/TrainerWorkoutMockData');
    return ok({ data: MOCK_TRAINER_WORKOUT_PLANS, total: MOCK_TRAINER_WORKOUT_PLANS.length }, 'Trainer workouts fetched');
  }

  if (p.includes('/trainer/sessions')) {
    const { MOCK_TRAINER_SESSIONS } = require('@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData');
    return ok({ data: MOCK_TRAINER_SESSIONS, total: MOCK_TRAINER_SESSIONS.length }, 'Trainer sessions fetched');
  }
  // Admin Module Specific
  if (p.includes('/admin/dashboard'))    return ok(DASHBOARD_STATS, 'Admin dashboard stats fetched');

  // Admin Sales
  if (p.includes('/admin/sales/overview')) return ok({ monthlyRevenue: ADMIN_SALES_INITIAL_DATA.overviewData }, 'Sales overview fetched');
  if (p.includes('/admin/sales/membership-report')) return ok({ report: ADMIN_SALES_INITIAL_DATA.membershipReport, totals: ADMIN_SALES_INITIAL_DATA.membershipTotals }, 'Sales membership report fetched');
  if (p.includes('/admin/sales/pending-payments')) return ok({ members: ADMIN_SALES_INITIAL_DATA.pendingPayments, total: ADMIN_SALES_INITIAL_DATA.pendingTotal }, 'Sales pending payments fetched');
  if (p.includes('/admin/sales/all-memberships')) return ok({ members: ADMIN_SALES_INITIAL_DATA.allMemberships, total: ADMIN_SALES_INITIAL_DATA.allMembershipsTotal }, 'Sales all memberships fetched');

  // Admin Finance
  if (p.includes('/fetchpayments')) return ok({ payments: ADMIN_PAYMENTS, total: ADMIN_PAYMENTS.length }, 'Payments fetched');
  if (p.includes('/fetchexpenses')) return ok(EXPENSES, 'Expenses fetched');
  if (p.includes('/admin/finance/summary')) return ok(ADMIN_FINANCE_SUMMARY, 'Finance summary fetched');
  if (p.includes('/admin/finance/pnl')) return ok(ADMIN_FINANCE_PNL, 'Pnl comparison fetched');

  // Admin Plans
  if (p.includes('/admin/plans/fetchplanrevenue')) return ok(ADMIN_PLANS_REVENUE, 'Plan revenue fetched');
  if (p.includes('/admin/plans')) return ok(SUPERADMIN_PLANS, 'Admin plans fetched');

  // Admin Reports
  if (p.includes('/admin/reports/fetchreportdata')) return ok(ADMIN_REPORTS, 'Admin reports fetched');

  if (p.includes('/admin/reports')) return ok(ADMIN_REPORTS, 'Admin reports fetched');
  if (p.includes('/admin/sales') || p.includes('/admin/finance')) return ok(ADMIN_SALES_INITIAL_DATA, 'Admin sales fetched');
  if (p.includes('/admin/members/summary')) return ok(ADMIN_MEMBERS_SUMMARY, 'Admin members summary fetched');
  if (p.includes('/admin/members'))      return ok(ADMIN_MEMBERS, 'Admin members fetched');
  if (p.includes('/admin/attendance/summary')) return ok(ADMIN_ATTENDANCE_SUMMARY, 'Admin attendance summary fetched');
  if (p.includes('/admin/attendance'))   return ok(ATTENDANCE, 'Admin attendance fetched');
  if (p.includes('/admin/hr'))           return ok({ staff: STAFF, total: STAFF.length }, 'Admin hr fetched');

  // ── Manager Module Specific ──────────────────────────────────────────────────
  // These entries match the apiFetch path patterns used by manager modules.
  // They serve as fallback when MSW hasn't started yet or hasn't intercepted.

  if (p.includes('/manager/dashboard')) return ok({
    totalMembers: 1245, activeMembers: 1100, newMembersThisMonth: 45,
    totalRevenue: 45000000, monthlyRevenue: 8500000, pendingPayments: 12000,
    totalStaff: 25, activeStaff: 22, totalProducts: 450, lowStockCount: 12,
    totalInquiries: 156, newInquiries: 34, todayAttendance: 245,
    trainerAttendance: { present: 18, total: 20 },
    memberGrowth: [{ month: 'Jan', count: 1100 }, { month: 'Feb', count: 1150 }, { month: 'Mar', count: 1200 }, { month: 'Apr', count: 1220 }, { month: 'May', count: 1245 }],
    revenueChart: [{ month: 'Jan', revenue: 7500000 }, { month: 'Feb', revenue: 8000000 }, { month: 'Mar', revenue: 7800000 }, { month: 'Apr', revenue: 8200000 }, { month: 'May', revenue: 8500000 }],
    membersByPlan: [{ plan: 'Annual', count: 450 }, { plan: 'Half-Yearly', count: 300 }, { plan: 'Quarterly', count: 250 }, { plan: 'Monthly', count: 245 }],
    membersByStatus: { active: 1100, pending: 45, expired: 100 },
    recentMembers: [
      { id: '1', name: 'John Doe', plan: 'Annual', status: 'Active', joinDate: '2024-05-01', paidAmount: 1500000 },
      { id: '2', name: 'Jane Smith', plan: 'Quarterly', status: 'Pending', joinDate: '2024-05-05', paidAmount: 0 },
      { id: '3', name: 'Bob Johnson', plan: 'Monthly', status: 'Active', joinDate: '2024-05-10', paidAmount: 150000 },
    ],
    recentPayments: [
      { id: '1', invoiceNumber: 'INV-001', amount: 1500000, method: 'UPI', paidAt: '2024-05-01T10:00:00Z', member: { name: 'John Doe' } },
      { id: '2', invoiceNumber: 'INV-002', amount: 150000, method: 'Card', paidAt: '2024-05-10T14:30:00Z', member: { name: 'Bob Johnson' } },
    ],
    pendingPaymentsList: [
      { id: '2', name: 'Jane Smith', pendingAmount: 400000, expiryDate: '2024-06-05' },
      { id: '4', name: 'Alice Brown', pendingAmount: 1500000, expiryDate: '2024-06-15' },
    ],
    expiringMemberships: [
      { id: '5', name: 'Charlie Davis', pendingAmount: 0, expiryDate: '2024-05-20' },
      { id: '6', name: 'Eve Wilson', pendingAmount: 0, expiryDate: '2024-05-25' },
    ],
    churnRate: 4.2, revenueGrowthPercent: 12.5, todayCollection: 4500, frozenMembershipsCount: 15, totalPTRevenue: 25000,
  }, 'Dashboard stats fetched');

  if (p.includes('/manager/inquiries/stats')) return ok({ total: 45, new: 12, followUp: 18, converted: 10, lost: 5 }, 'Stats fetched');
  if (p.includes('/manager/inquiries/plans-snapshot')) return ok([
    { id: '1', name: 'Standard Plan', price1Month: 100000, price3Month: 250000, price6Month: 450000, price12Month: 800000 },
    { id: '2', name: 'Premium Plan', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1500000 },
  ], 'Plans fetched');
  if (p.includes('/manager/inquiries/plans')) return ok([{ name: 'Personal Training' }, { name: 'Yoga Class' }, { name: 'CrossFit' }], 'Plans fetched');
  if (p.includes('/manager/inquiries')) return ok({ inquiries: [
    { id: 'inq-001', name: 'Rahul Sharma', phone: '+91 9876543210', email: 'rahul.s@example.com', interest: 'Personal Training', status: 'NEW', source: 'Website', notes: 'Looking for weight loss.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), followUpLogs: [] },
    { id: 'inq-002', name: 'Priya Patel', phone: '+91 9876543211', interest: 'Yoga Class', status: 'FOLLOW_UP', source: 'Walk-in', followUpDate: new Date(Date.now() + 86400000 * 3).toISOString(), createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), followUpLogs: [{ date: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Called, asked to call back.' }] },
    { id: 'inq-003', name: 'Amit Kumar', phone: '+91 9876543212', email: 'amit.k@example.com', interest: 'Yearly Membership', status: 'CONVERTED', source: 'Referral', createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), followUpLogs: [] },
    { id: 'inq-004', name: 'Sneha Gupta', phone: '+91 9876543213', interest: 'Weight Training', status: 'LOST', source: 'Instagram', createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), followUpLogs: [] },
    { id: 'inq-005', name: 'Vikram Singh', phone: '+91 9876543214', email: 'vikram.s@example.com', interest: 'CrossFit', status: 'NEW', source: 'Facebook', createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), followUpLogs: [] },
  ], total: 5, page: 1, limit: 10 }, 'Inquiries fetched');

  if (p.includes('/manager/members/summary')) return ok({ totalMembers: 1245, activeMembers: 1100, pendingMembers: 45, expiredMembers: 100 }, 'Summary fetched');
  if (p.includes('/manager/members')) return ok({ members: MEMBERS.map(m => ({ ...m, id: m.id, memberId: m.id, membershipStatus: m.status, membershipPlan: m.plan, phone: m.phone, gender: m.gender, age: m.age })), total: MEMBERS.length }, 'Members fetched');

  if (p.includes('/manager/attendance/summary')) return ok({ totalToday: 245, members: 227, trainers: 18 }, 'Summary fetched');
  if (p.includes('/manager/attendance')) return ok({ records: Array.from({ length: 10 }, (_, i) => ({ id: `att-${i+1}`, memberId: `m${i+1}`, memberName: MEMBERS[i]?.name || `Member ${i+1}`, date: new Date(Date.now() - 86400000 * i).toISOString().split('T')[0], checkInTime: '07:00', checkOutTime: '08:30', status: 'present' })), total: 245 }, 'Attendance fetched');

  if (p.includes('/manager/hr/staff') && p.includes('/attendance')) return ok({ records: [], total: 0 }, 'Staff attendance fetched');
  if (p.includes('/manager/hr/staff')) return ok({ staff: STAFF.map((s, i) => ({ ...s, staffId: s.id, designation: s.role, department: 'General', phone: `98${i}0000000`, email: `${(s.name || '').replace(' ', '').toLowerCase()}@gym.com`, salary: s.salary || 0, dateOfJoining: s.joinDate || new Date().toISOString(), employmentType: 'full-time', attendance: { present: 22, absent: 2, total: 24 } })), total: STAFF.length }, 'Staff fetched');
  if (p.includes('/manager/hr/shifts')) return ok({ shifts: [{ id: 'sh1', name: 'Morning', startTime: '06:00', endTime: '14:00' }, { id: 'sh2', name: 'Evening', startTime: '14:00', endTime: '22:00' }], total: 2 }, 'Shifts fetched');
  if (p.includes('/manager/hr')) return ok({ staff: STAFF, total: STAFF.length }, 'HR data fetched');

  if (p.includes('/manager/finance/summary')) return ok({ totalRevenue: 8500000, totalExpenses: 2100000, netProfit: 6400000, pendingPayments: 450000 }, 'Finance summary fetched');
  if (p.includes('/manager/finance/pnl')) return ok({ months: REVENUE_TREND.map(r => ({ month: r.month, revenue: r.revenue, expenses: r.expenses, profit: r.profit })) }, 'PnL fetched');
  if (p.includes('/manager/finance')) return ok({ payments: Array.from({ length: 5 }, (_, i) => ({ id: `pay-${i+1}`, memberId: `m${i+1}`, memberName: MEMBERS[i]?.name || `Member ${i+1}`, amount: 150000 + i * 50000, method: ['UPI', 'Card', 'Cash'][i % 3], date: new Date(Date.now() - 86400000 * i).toISOString(), status: 'completed' })), total: 5 }, 'Finance fetched');

  if (p.includes('/manager/plans')) return ok({ plans: PLANS, total: PLANS.length }, 'Plans fetched');

  if (p.includes('/manager/sales/pending')) return ok({ members: MEMBERS.slice(0, 5).map(m => ({ ...m, pendingAmount: 150000, dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] })), total: 5 }, 'Pending fetched');
  if (p.includes('/manager/sales')) return ok({ sales: Array.from({ length: 8 }, (_, i) => ({ id: `s-${i+1}`, memberId: `m${i+1}`, memberName: MEMBERS[i]?.name || `Member ${i+1}`, plan: PLANS[i % 4]?.name || 'Basic Plan', amount: 150000 + i * 30000, date: new Date(Date.now() - 86400000 * i).toISOString(), paymentMethod: ['UPI', 'Card', 'Cash'][i % 3] })), total: 8 }, 'Sales fetched');

  if (p.includes('/manager/store/products')) return ok({ products: Array.from({ length: 8 }, (_, i) => ({ id: `prod-${i+1}`, name: ['Whey Protein', 'Creatine', 'BCAA', 'Pre-workout', 'Gym Gloves', 'Shaker', 'Resistance Band', 'Yoga Mat'][i], category: ['Supplements', 'Supplements', 'Supplements', 'Supplements', 'Accessories', 'Accessories', 'Equipment', 'Equipment'][i], price: (500 + i * 200) * 100, stock: [50, 30, 25, 20, 15, 40, 10, 35][i], sku: `SKU-${1000 + i}`, status: i === 6 ? 'low_stock' : 'in_stock' })), total: 8 }, 'Products fetched');
  if (p.includes('/manager/store')) return ok({ products: [], total: 0 }, 'Store fetched');

  if (p.includes('/manager/communications')) return ok({ messages: [], total: 0 }, 'Messages fetched');
  if (p.includes('/manager/notifications')) return ok({ notifications: [], total: 0 }, 'Notifications fetched');
  if (p.includes('/manager/reports')) return ok({ data: [], summary: {} }, 'Reports fetched');
  if (p.includes('/manager/referrals')) return ok({ referrals: [], total: 0 }, 'Referrals fetched');
  if (p.includes('/manager/expenses')) return ok({ expenses: [], total: 0 }, 'Expenses fetched');
  if (p.includes('/manager/library')) return ok({ items: [], total: 0 }, 'Library fetched');
  if (p.includes('/manager/schedule')) return ok({ sessions: [], total: 0 }, 'Schedule fetched');
  if (p.includes('/manager/workout')) return ok({ plans: [], total: 0 }, 'Workout fetched');
  if (p.includes('/manager/profile')) return ok({ id: 'u1', name: 'Demo Manager', email: 'manager@gymsmart.com', role: 'manager', phone: '9800000001', avatar: null }, 'Profile fetched');
  if (p.includes('/manager/settings')) return ok({ gymName: 'GymSmart Demo', currency: 'INR', timezone: 'Asia/Kolkata' }, 'Settings fetched');
  if (p.includes('/manager/pt')) return ok({ trainers: [], sessions: [], total: 0 }, 'PT fetched');

  // Admin / Manager Dashboard
  if (p.includes('/dashboard'))    return ok(DASHBOARD_STATS);

  // Members
  if (p.includes('/member'))       return ok(MEMBERS, 'Members fetched');

  // Plans
  if (p.includes('/plan'))         return ok(PLANS, 'Plans fetched');

  // Payments / Sales
  if (p.includes('/payment') || p.includes('/sale') || p.includes('/invoice')) return ok(PAYMENTS, 'Payments fetched');

  // Branches
  if (p.includes('/branch'))       return ok(BRANCHES, 'Branches fetched');

  // Staff / HR
  if (p.includes('/staff') || p.includes('/hr') || p.includes('/employee')) return ok(STAFF, 'Staff fetched');

  // Attendance
  if (p.includes('/attendance'))   return ok(ATTENDANCE, 'Attendance fetched');

  // Notifications
  if (p.includes('/notification')) return ok(NOTIFICATIONS, 'Notifications fetched');

  // Coupons
  if (p.includes('/coupon'))       return ok(COUPONS, 'Coupons fetched');

  // Announcements / Broadcasts
  if (p.includes('/announcement') || p.includes('/broadcast')) return ok(ANNOUNCEMENTS, 'Announcements fetched');



  // Revenue / Finance / Reports
  if (p.includes('/revenue') || p.includes('/finance') || p.includes('/report') || p.includes('/pnl')) {
    return ok({ trend: REVENUE_TREND, attendance: ATTENDANCE_TREND, payments: PAYMENTS, branches: BRANCHES });
  }

  // Settings / Profile
  if (p.includes('/setting') || p.includes('/profile')) {
    return ok({ id: 'u1', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', phone: '9800000001', avatar: null });
  }

  // Generic catch-all — return empty list
  return ok([], 'No data');
}
