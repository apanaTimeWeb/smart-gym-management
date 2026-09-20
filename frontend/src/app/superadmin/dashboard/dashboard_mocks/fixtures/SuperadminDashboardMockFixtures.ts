import type { SuperadminDashboardApiData } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardTypes';
export const MOCK_SUPERADMIN_DASHBOARD_DATA: SuperadminDashboardApiData = {
    metrics: {
        totalGyms: 120,
        activeGyms: 105,
        suspendedGyms: 5,
        trialGyms: 10,
        totalEndUsers: 15400,
        monthlyRecurringRevenue: 250000,
        overdueInvoicesCount: 12,
        pendingRevenue: 1500000,
        recentOnboards: [
            {
                id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com',
                phone: '9876543210', status: 'ACTIVE', plan: 'Pro', createdAt: '2026-08-01',
                memberCount: 200, monthlyRevenue: 500000, databaseVersion: 'v1.2'
            },
            {
                id: 't2', name: 'Fit Life Studio', ownerName: 'Jane Smith', adminEmail: 'jane@fitlife.com',
                phone: '9876543211', status: 'TRIAL', plan: 'Basic', createdAt: '2026-08-15',
                memberCount: 50, monthlyRevenue: 0, databaseVersion: 'v1.2'
            }
        ],
        trialsExpiringIn7Days: 3,
        mrrDeltaPercent: 12.5,
        arrDeltaPercent: 24.0,
        arpu: 2380,
        revenueByTier: [
            { plan: 'Basic', amount: 5000000, tenantCount: 50 },
            { plan: 'Pro', amount: 15000000, tenantCount: 55 },
            { plan: 'Enterprise', amount: 5000000, tenantCount: 15 }
        ],
        platformHealthScore: 92,
        revenueByGeography: [
            { region: 'India', revenue: 17500000 },
            { region: 'UAE', revenue: 4500000 },
            { region: 'Singapore', revenue: 3000000 },
        ],
    },
    revenue: [
        { month: 'Jan', mrr: 15000000 },
        { month: 'Feb', mrr: 16000000 },
        { month: 'Mar', mrr: 18000000 },
        { month: 'Apr', mrr: 21000000 },
        { month: 'May', mrr: 23000000 },
        { month: 'Jun', mrr: 25000000 },
    ],
    growth: [
        { month: 'Jan', gyms: 50 },
        { month: 'Feb', gyms: 60 },
        { month: 'Mar', gyms: 75 },
        { month: 'Apr', gyms: 90 },
        { month: 'May', gyms: 105 },
        { month: 'Jun', gyms: 120 },
    ],
};
