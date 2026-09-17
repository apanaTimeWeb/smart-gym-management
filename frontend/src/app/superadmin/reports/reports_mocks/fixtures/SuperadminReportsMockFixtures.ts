// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
export const MOCK_SUPERADMIN_REPORTS_REVENUE: RevenueRow[] = [
    { month: 'Jul', mrr: 216000, newRevenue: 31000, cancelledRevenue: 7000, netRevenue: 24000, tenantCount: 101 },
    { month: 'Aug', mrr: 232000, newRevenue: 36000, cancelledRevenue: 9000, netRevenue: 27000, tenantCount: 109 },
    { month: 'Sep', mrr: 248000, newRevenue: 42000, cancelledRevenue: 8000, netRevenue: 34000, tenantCount: 118 },
];
export const MOCK_SUPERADMIN_REPORTS_CANCELLATIONS: CancellationsRecord[] = [
    { id: 'ch1', gymName: 'Power Gym', ownerName: 'Bob Builder', plan: 'Enterprise', cancelledAt: '2026-09-15', reason: 'Too expensive', mrr: 15000, daysActive: 650 },
    { id: 'ch2', gymName: 'Yoga Center', ownerName: 'Alice Yoga', plan: 'Basic', cancelledAt: '2026-09-12', reason: 'Closing business', mrr: 2000, daysActive: 300 },
    { id: 'ch3', gymName: 'Core Studio', ownerName: 'Cara Singh', plan: 'Pro', cancelledAt: '2026-09-08', reason: 'Low usage', mrr: 4500, daysActive: 410 },
    { id: 'ch4', gymName: 'Urban Strength', ownerName: 'Dan Khan', plan: 'Enterprise', cancelledAt: '2026-09-05', reason: 'Budget change', mrr: 9800, daysActive: 820 },
    { id: 'ch5', gymName: 'Pulse Fitness', ownerName: 'Eva Shah', plan: 'Basic', cancelledAt: '2026-08-28', reason: 'Business pause', mrr: 1800, daysActive: 220 },
    { id: 'ch6', gymName: 'Peak Performance', ownerName: 'Farhan Ali', plan: 'Pro', cancelledAt: '2026-08-20', reason: 'Competitor', mrr: 5200, daysActive: 530 },
];
export const MOCK_SUPERADMIN_REPORTS_HEALTH: TenantHealthScore[] = [
    { id: 'th1', gymName: 'Iron Paradise', plan: 'Pro', score: 95, grade: 'A', memberCount: 200, lastLogin: '2026-09-15', paymentHealth: 'GOOD', featureUsage: 85, supportTickets: 1 },
    { id: 'th2', gymName: 'Fit Life Studio', plan: 'Basic', score: 65, grade: 'C', memberCount: 50, lastLogin: '2026-09-13', paymentHealth: 'AT_RISK', featureUsage: 30, supportTickets: 5 },
    { id: 'th3', gymName: 'CrossFit Box', plan: 'Enterprise', score: 45, grade: 'F', memberCount: 10, lastLogin: '2026-08-15', paymentHealth: 'OVERDUE', featureUsage: 10, supportTickets: 12 },
    { id: 'th4', gymName: 'Powerhouse Gym', plan: 'Pro', score: 82, grade: 'B', memberCount: 180, lastLogin: '2026-09-10', paymentHealth: 'GOOD', featureUsage: 65, supportTickets: 2 },
    { id: 'th5', gymName: 'Zen Athletics', plan: 'Basic', score: 72, grade: 'C', memberCount: 130, lastLogin: '2026-09-06', paymentHealth: 'AT_RISK', featureUsage: 54, supportTickets: 4 },
    { id: 'th6', gymName: 'Urban Strength', plan: 'Enterprise', score: 91, grade: 'A', memberCount: 310, lastLogin: '2026-09-12', paymentHealth: 'GOOD', featureUsage: 88, supportTickets: 1 },
];
