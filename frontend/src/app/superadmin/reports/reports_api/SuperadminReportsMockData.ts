import type { RevenueRow, ChurnRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/reports_types';

export const MOCK_SUPERADMIN_REPORTS_REVENUE: RevenueRow[] = [
  { month: 'Jan', mrr: 150000, newRevenue: 10000, churnedRevenue: 2000, netRevenue: 8000, tenantCount: 50 },
  { month: 'Feb', mrr: 160000, newRevenue: 15000, churnedRevenue: 5000, netRevenue: 10000, tenantCount: 60 },
  { month: 'Mar', mrr: 180000, newRevenue: 25000, churnedRevenue: 5000, netRevenue: 20000, tenantCount: 75 },
];

export const MOCK_SUPERADMIN_REPORTS_CHURN: ChurnRecord[] = [
  { id: 'ch1', gymName: 'Power Gym', ownerName: 'Bob Builder', plan: 'Enterprise', churnedAt: '2023-11-01', reason: 'Too expensive', mrr: 15000, daysActive: 650 },
  { id: 'ch2', gymName: 'Yoga Center', ownerName: 'Alice Yoga', plan: 'Basic', churnedAt: '2023-11-15', reason: 'Closing business', mrr: 2000, daysActive: 300 },
];

export const MOCK_SUPERADMIN_REPORTS_HEALTH: TenantHealthScore[] = [
  { id: 'th1', gymName: 'Iron Paradise', plan: 'Pro', score: 95, grade: 'A', memberCount: 200, lastLogin: '2023-11-20', paymentHealth: 'GOOD', featureUsage: 85, supportTickets: 1 },
  { id: 'th2', gymName: 'Fit Life Studio', plan: 'Basic', score: 65, grade: 'C', memberCount: 50, lastLogin: '2023-11-01', paymentHealth: 'AT_RISK', featureUsage: 30, supportTickets: 5 },
  { id: 'th3', gymName: 'CrossFit Box', plan: 'Enterprise', score: 45, grade: 'F', memberCount: 10, lastLogin: '2023-10-15', paymentHealth: 'OVERDUE', featureUsage: 10, supportTickets: 12 },
];
