

export const DUMMY_TENANTS: Tenant[] = [
  {
    id: 't-101',
    name: 'Iron Forge Fitness',
    ownerName: 'John Carter',
    adminEmail: 'john@ironforge.com',
    phone: '+1 555-0101',
    status: 'ACTIVE',
    plan: 'PRO',
    createdAt: '2025-10-01',
    memberCount: 845,
    monthlyRevenue: 12500,
    databaseVersion: 'v2.4.1'
  },
  {
    id: 't-102',
    name: 'Vitality Studio',
    ownerName: 'Sarah Jenkins',
    adminEmail: 'sarah@vitality.com',
    phone: '+1 555-0102',
    status: 'ACTIVE',
    plan: 'BASIC',
    createdAt: '2026-02-15',
    memberCount: 230,
    monthlyRevenue: 3450,
    databaseVersion: 'v2.4.1'
  },
  {
    id: 't-103',
    name: 'Apex Muscle Gym',
    ownerName: 'Mike Tyson',
    adminEmail: 'mike@apexmuscle.com',
    phone: '+1 555-0103',
    status: 'SUSPENDED',
    plan: 'ENTERPRISE',
    createdAt: '2025-05-20',
    memberCount: 2100,
    monthlyRevenue: 45000,
    databaseVersion: 'v2.3.9' // needs migration
  },
  {
    id: 't-104',
    name: 'Core Wellness Hub',
    ownerName: 'Emma Stone',
    adminEmail: 'emma@corewellness.com',
    phone: '+1 555-0104',
    status: 'TRIAL',
    plan: 'BASIC',
    createdAt: '2026-07-01',
    memberCount: 45,
    monthlyRevenue: 0,
    databaseVersion: 'v2.4.1'
  },
  {
    id: 't-105',
    name: 'Titanium Lifting Club',
    ownerName: 'David Goggins',
    adminEmail: 'david@titanium.com',
    phone: '+1 555-0105',
    status: 'ACTIVE',
    plan: 'PRO',
    createdAt: '2026-01-10',
    memberCount: 950,
    monthlyRevenue: 14250,
    databaseVersion: 'v2.4.1'
  }
];

export const DUMMY_DASHBOARD_METRICS: SaaSDashboardMetrics = {
  totalGyms: 142,
  activeGyms: 128,
  suspendedGyms: 5,
  totalEndUsers: 45200,
  monthlyRecurringRevenue: 28500, // This is SaaS revenue (what gym owners pay us)
  recentOnboards: [DUMMY_TENANTS[3], DUMMY_TENANTS[1], DUMMY_TENANTS[4]]
};

export const DUMMY_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    tenantId: 't-101',
    tenantName: 'Iron Forge Fitness',
    actorEmail: 'admin@ironforge.com',
    actorRole: 'ADMIN',
    action: 'DELETE_MEMBER',
    targetEntity: 'Member',
    targetId: 'm-9923',
    timestamp: '2026-07-10T09:15:00Z',
    details: 'Deleted member John Doe due to non-payment'
  },
  {
    id: 'log-002',
    tenantId: 't-101',
    tenantName: 'Iron Forge Fitness',
    actorEmail: 'staff1@ironforge.com',
    actorRole: 'STAFF',
    action: 'CREATE_PAYMENT',
    targetEntity: 'Payment',
    targetId: 'pay-8812',
    timestamp: '2026-07-10T10:30:22Z',
    details: 'Collected $150 via Credit Card for monthly renewal'
  },
  {
    id: 'log-003',
    tenantId: 't-102',
    tenantName: 'Vitality Studio',
    actorEmail: 'admin@vitality.com',
    actorRole: 'ADMIN',
    action: 'UPDATE_PLAN_PRICE',
    targetEntity: 'Plan',
    targetId: 'plan-02',
    timestamp: '2026-07-09T14:45:10Z',
    details: 'Changed Basic Plan monthly price from $40 to $45'
  },
  {
    id: 'log-004',
    tenantId: 't-103',
    tenantName: 'Apex Muscle Gym',
    actorEmail: 'SYSTEM',
    actorRole: 'SYSTEM',
    action: 'SUSPEND_TENANT',
    targetEntity: 'Tenant',
    targetId: 't-103',
    timestamp: '2026-07-08T00:01:00Z',
    details: 'Automated suspension due to failed SaaS subscription payment'
  }
];

export const REVENUE_CHART_DATA = [
  { month: 'Jan', mrr: 21000 },
  { month: 'Feb', mrr: 22500 },
  { month: 'Mar', mrr: 24000 },
  { month: 'Apr', mrr: 24500 },
  { month: 'May', mrr: 26000 },
  { month: 'Jun', mrr: 27200 },
  { month: 'Jul', mrr: 28500 },
];

export const GYM_GROWTH_DATA = [
  { month: 'Jan', newGyms: 12, churned: 1 },
  { month: 'Feb', newGyms: 15, churned: 2 },
  { month: 'Mar', newGyms: 18, churned: 0 },
  { month: 'Apr', newGyms: 10, churned: 3 },
  { month: 'May', newGyms: 22, churned: 1 },
  { month: 'Jun', newGyms: 25, churned: 2 },
  { month: 'Jul', newGyms: 20, churned: 1 },
];

export const DUMMY_SUBSCRIPTION_PLANS: import('../superadmin_types/superadmin_types').SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'BASIC',
    priceMonthly: 49,
    priceAnnual: 490,
    maxMembers: 200,
    maxStaff: 2,
    features: ['Member Management', 'Basic Billing', 'Attendance Tracking'],
    activeTenants: 45
  },
  {
    id: 'plan-pro',
    name: 'PRO',
    priceMonthly: 99,
    priceAnnual: 990,
    maxMembers: 1000,
    maxStaff: 10,
    features: ['Everything in Basic', 'WhatsApp Integration', 'Advanced Reports', 'Diet Plans'],
    activeTenants: 68
  },
  {
    id: 'plan-enterprise',
    name: 'ENTERPRISE',
    priceMonthly: 249,
    priceAnnual: 2490,
    maxMembers: 5000,
    maxStaff: 50,
    features: ['Everything in Pro', 'Custom Branding', 'API Access', 'Dedicated Support Manager'],
    activeTenants: 15
  }
];

export const DUMMY_SUPPORT_TICKETS: import('../superadmin_types/superadmin_types').SupportTicket[] = [
  { id: 'TKT-1001', tenantName: 'Iron Forge Fitness', subject: 'WhatsApp Integration failing', status: 'OPEN', priority: 'HIGH', createdAt: '2026-07-11T08:00:00Z', lastUpdated: '2026-07-11T08:15:00Z' },
  { id: 'TKT-1002', tenantName: 'Apex Muscle Gym', subject: 'Need help exporting member data', status: 'IN_PROGRESS', priority: 'MEDIUM', createdAt: '2026-07-10T14:30:00Z', lastUpdated: '2026-07-10T16:00:00Z' },
  { id: 'TKT-1003', tenantName: 'Vitality Studio', subject: 'Billing cycle issue', status: 'RESOLVED', priority: 'LOW', createdAt: '2026-07-09T09:10:00Z', lastUpdated: '2026-07-09T11:45:00Z' },
  { id: 'TKT-1004', tenantName: 'Core Wellness Hub', subject: 'Database extremely slow during peak hours', status: 'OPEN', priority: 'CRITICAL', createdAt: '2026-07-11T09:45:00Z', lastUpdated: '2026-07-11T09:50:00Z' }
];

export const DUMMY_BACKGROUND_JOBS: import('../superadmin_types/superadmin_types').BackgroundJob[] = [
  { id: 'job-9821', queueName: 'email_queue', jobName: 'SendWelcomeEmail', status: 'FAILED', attempts: 3, error: 'SMTP Connection Timeout', createdAt: '2026-07-11T09:45:00Z' },
  { id: 'job-9822', queueName: 'billing_queue', jobName: 'ProcessMonthlyRenewals', status: 'ACTIVE', attempts: 1, createdAt: '2026-07-11T09:55:00Z' },
  { id: 'job-9823', queueName: 'report_queue', jobName: 'GenerateDailyMetrics', status: 'COMPLETED', attempts: 1, createdAt: '2026-07-11T00:01:00Z' },
  { id: 'job-9824', queueName: 'email_queue', jobName: 'SendRenewalReminders', status: 'DELAYED', attempts: 0, createdAt: '2026-07-11T10:00:00Z' },
  { id: 'job-9825', queueName: 'email_queue', jobName: 'SendWelcomeEmail', status: 'FAILED', attempts: 3, error: 'Invalid Recipient Email Address', createdAt: '2026-07-11T09:46:00Z' }
];

export const DUMMY_BACKUPS: import('../superadmin_types/superadmin_types').BackupRecord[] = [
  { id: 'bkp-1', tenantName: 'Iron Forge Fitness', databaseName: 'tenant_db_101', sizeMB: 1450.5, status: 'SUCCESS', timestamp: '2026-07-11T02:00:00Z' },
  { id: 'bkp-2', tenantName: 'Apex Muscle Gym', databaseName: 'tenant_db_103', sizeMB: 3200.0, status: 'IN_PROGRESS', timestamp: '2026-07-11T10:00:00Z' },
  { id: 'bkp-3', tenantName: 'Vitality Studio', databaseName: 'tenant_db_102', sizeMB: 450.2, status: 'SUCCESS', timestamp: '2026-07-11T02:05:00Z' },
  { id: 'bkp-4', tenantName: 'Core Wellness Hub', databaseName: 'tenant_db_104', sizeMB: 85.1, status: 'FAILED', timestamp: '2026-07-11T02:10:00Z' }
];

export const DUMMY_INVOICES: import('../superadmin_types/superadmin_types').SaaSInvoice[] = [
  { id: 'inv-881', tenantName: 'Iron Forge Fitness', amount: 99.00, currency: 'USD', status: 'PAID', date: '2026-07-01T08:00:00Z', planName: 'PRO' },
  { id: 'inv-882', tenantName: 'Apex Muscle Gym', amount: 249.00, currency: 'USD', status: 'FAILED', date: '2026-07-05T08:00:00Z', planName: 'ENTERPRISE' },
  { id: 'inv-883', tenantName: 'Vitality Studio', amount: 49.00, currency: 'USD', status: 'PAID', date: '2026-07-02T08:00:00Z', planName: 'BASIC' },
  { id: 'inv-884', tenantName: 'Titanium Lifting Club', amount: 99.00, currency: 'USD', status: 'PENDING', date: '2026-07-10T08:00:00Z', planName: 'PRO' },
];

export const DUMMY_FEATURE_FLAGS: import('../superadmin_types/superadmin_types').FeatureFlag[] = [
  { id: 'ff-1', name: 'AI_DIET_PLANNER', description: 'Generates diet plans using LLMs', isGlobalEnabled: false, enabledTenantIds: ['t-101', 't-103'] },
  { id: 'ff-2', name: 'WHATSAPP_INTEGRATION', description: 'Automated WhatsApp reminders', isGlobalEnabled: true, enabledTenantIds: [] },
  { id: 'ff-3', name: 'FINGERPRINT_SCANNER', description: 'Hardware integration for biometric attendance', isGlobalEnabled: false, enabledTenantIds: ['t-103'] },
];

export const DUMMY_RELEASE_NOTES: import('../superadmin_types/superadmin_types').ReleaseNote[] = [
  { id: 'rn-1', version: 'v2.5.0', title: 'WhatsApp Integration is Live!', content: 'You can now connect your gym WhatsApp account...', date: '2026-07-01T10:00:00Z', isPublished: true },
  { id: 'rn-2', version: 'v2.6.0', title: 'AI Diet Planner Beta', content: 'Testing out the new AI diet planner...', date: '2026-07-15T10:00:00Z', isPublished: false },
];

export const DUMMY_MIGRATIONS: import('../superadmin_types/superadmin_types').SchemaMigration[] = [
  { id: 'mig-001', name: '1689000000001-CreateUsersTable', appliedAt: '2026-01-01T00:00:00Z', status: 'SUCCESS' },
  { id: 'mig-002', name: '1689000000002-AddGSTToInvoices', appliedAt: '2026-06-15T00:00:00Z', status: 'SUCCESS' },
  { id: 'mig-003', name: '1689000000003-CreateDietPlans', appliedAt: null, status: 'PENDING' },
];

export const DUMMY_GLOBAL_AUDIT_LOGS: import('../superadmin_types/superadmin_types').GlobalAuditLog[] = [
  { id: 'gal-1', actorName: 'John Admin', actorRole: 'SUPERADMIN', action: 'CREATE_TENANT', targetResource: 'Iron Forge Fitness', timestamp: '2026-07-10T10:00:00Z', ipAddress: '192.168.1.1' },
  { id: 'gal-2', actorName: 'Sarah Support', actorRole: 'SUPPORT_AGENT', action: 'RESET_TENANT_PASSWORD', targetResource: 'Vitality Studio', timestamp: '2026-07-11T11:30:00Z', ipAddress: '192.168.1.15' },
  { id: 'gal-3', actorName: 'John Admin', actorRole: 'SUPERADMIN', action: 'UPDATE_PLAN_PRICE', targetResource: 'PRO Plan', timestamp: '2026-07-11T12:00:00Z', ipAddress: '192.168.1.1' },
  { id: 'gal-4', actorName: 'Mike Billing', actorRole: 'BILLING_ADMIN', action: 'ISSUE_REFUND', targetResource: 'Apex Muscle Gym', timestamp: '2026-07-11T14:45:00Z', ipAddress: '192.168.1.20' }
];

export const DUMMY_BROADCASTS: import('../superadmin_types/superadmin_types').Broadcast[] = [
  { id: 'bc-1', title: 'Scheduled Maintenance', content: 'Database maintenance will occur on Sunday at 2 AM EST.', status: 'SCHEDULED', audience: 'ALL_TENANTS', scheduledDate: '2026-07-20T02:00:00Z', sentDate: null },
  { id: 'bc-2', title: 'New Feature: AI Diet Planner', content: 'We are thrilled to announce the AI Diet Planner for PRO tenants.', status: 'SENT', audience: 'PRO_ONLY', scheduledDate: null, sentDate: '2026-07-01T10:00:00Z' },
  { id: 'bc-3', title: 'Billing Issue Resolved', content: 'The recent Stripe processing delays have been resolved.', status: 'SENT', audience: 'ALL_TENANTS', scheduledDate: null, sentDate: '2026-07-10T15:30:00Z' }
];

export const DUMMY_COUPONS: import('../superadmin_types/superadmin_types').Coupon[] = [
  { id: 'cpn-1', code: 'LAUNCH50', discountPercentage: 50, maxUses: 100, currentUses: 85, status: 'ACTIVE', expiryDate: '2026-12-31T23:59:59Z' },
  { id: 'cpn-2', code: 'WELCOME20', discountPercentage: 20, maxUses: 1000, currentUses: 1000, status: 'DEPLETED', expiryDate: '2026-12-31T23:59:59Z' },
  { id: 'cpn-3', code: 'WINTERSALE', discountPercentage: 30, maxUses: 50, currentUses: 10, status: 'EXPIRED', expiryDate: '2026-02-28T23:59:59Z' }
];

export const DUMMY_AFFILIATES: import('../superadmin_types/superadmin_types').Affiliate[] = [
  { id: 'aff-1', name: 'Fitness Gurus LLC', email: 'partners@fitnessgurus.com', referralCode: 'FG2026', totalReferred: 14, commissionEarned: 2100.50, status: 'ACTIVE', joinedAt: '2025-11-15T08:00:00Z' },
  { id: 'aff-2', name: 'Gym Consultants Inc', email: 'hello@gymconsultants.com', referralCode: 'GCI-PRO', totalReferred: 45, commissionEarned: 6750.00, status: 'ACTIVE', joinedAt: '2025-06-10T10:30:00Z' },
  { id: 'aff-3', name: 'Bob Smith', email: 'bob.smith@gmail.com', referralCode: 'BOBSMITH', totalReferred: 0, commissionEarned: 0, status: 'INACTIVE', joinedAt: '2026-01-20T14:15:00Z' }
];

