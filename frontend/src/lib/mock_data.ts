// RESPONSIBILITY: Centralized mock data for offline/demo mode.
// DATA FLOW: apiFetch → getMockResponse() → hardcoded data when backend is unreachable.
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
  churnRate: 4.2, retentionRate: 87.3, arpm: 4680,
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
  { id: 'g1', name: 'FitLife Andheri', owner: 'Rajesh Patel', city: 'Mumbai', status: 'active', members: 420, plan: 'Enterprise', revenue: 185000, createdAt: '2023-03-01' },
  { id: 'g2', name: 'PowerZone Bandra', owner: 'Sunita Reddy', city: 'Mumbai', status: 'active', members: 340, plan: 'Pro', revenue: 142000, createdAt: '2023-05-15' },
  { id: 'g3', name: 'IronHouse Powai', owner: 'Vikram Singh', city: 'Mumbai', status: 'active', members: 220, plan: 'Standard', revenue: 98000, createdAt: '2023-07-20' },
  { id: 'g4', name: 'FlexFit Thane', owner: 'Meena Joshi', city: 'Thane', status: 'trial', members: 180, plan: 'Trial', revenue: 60000, createdAt: '2024-01-10' },
  { id: 'g5', name: 'ZenGym Pune', owner: 'Arun Kumar', city: 'Pune', status: 'inactive', members: 0, plan: 'Standard', revenue: 0, createdAt: '2022-12-01' },
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
  branch: BRANCHES[i % 4]!.name,
  checkIn: `2025-01-${String((i % 28) + 1).padStart(2, '0')}T0${6 + (i % 4)}:${String(i * 7 % 60).padStart(2, '0')}:00`,
  checkOut: `2025-01-${String((i % 28) + 1).padStart(2, '0')}T${8 + (i % 4)}:${String(i * 9 % 60).padStart(2, '0')}:00`,
  duration: 90 + (i % 30),
}));

// ─── main router ─────────────────────────────────────────────────────────────
export function getMockResponse(path: string): unknown {
  const p = path.toLowerCase();

  // Auth
  if (p.includes('/auth/login'))   return ok({ accessToken: 'mock_token', refreshToken: 'mock_refresh', user: { id: 'u1', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' } });
  if (p.includes('/auth/me'))      return ok({ id: 'u1', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' });

  // Superadmin Specific
  if (p.includes('/superadmin/dashboard')) return ok(SUPERADMIN_DASHBOARD, 'Superadmin stats fetched');
  if (p.includes('/gym')) return ok(GYMS, 'Gyms fetched');

  // Trainer Dashboard
  if (p.includes('/trainer/dashboard')) return ok(TRAINER_DASHBOARD, 'Trainer stats fetched');

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
