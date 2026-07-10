import { Tenant, AuditLog, SaaSDashboardMetrics } from '../superadmin_types/superadmin_types';

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
