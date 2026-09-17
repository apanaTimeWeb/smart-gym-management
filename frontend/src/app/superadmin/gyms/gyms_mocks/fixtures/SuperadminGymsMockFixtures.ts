import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
export const MOCK_GYMS: Tenant[] = [
    {
        id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com',
        phone: '9876543210', status: 'ACTIVE', plan: 'Pro', createdAt: '2026-08-01',
        memberCount: 200, monthlyRevenue: 5000, databaseVersion: 'v1.2', city: 'Mumbai', state: 'MH',
        staffCount: 15,
    },
    {
        id: 't2', name: 'Fit Life Studio', ownerName: 'Jane Smith', adminEmail: 'jane@fitlife.com',
        phone: '9876543211', status: 'TRIAL', plan: 'Basic', createdAt: '2026-08-15',
        memberCount: 50, monthlyRevenue: 0, databaseVersion: 'v1.2', city: 'Pune', state: 'MH',
        staffCount: 3,
    },
    {
        id: 't3', name: 'Power Gym', ownerName: 'Bob Builder', adminEmail: 'bob@powergym.com',
        phone: '9876543212', status: 'SUSPENDED', plan: 'Enterprise', createdAt: '2022-01-10',
        memberCount: 500, monthlyRevenue: 15000, databaseVersion: 'v1.1', city: 'Delhi', state: 'DL',
        staffCount: 25,
    }
];
export const MOCK_GYM_STATS = {
    total: 3,
    active: 1,
    trial: 1,
    suspended: 1,
    cancelled: 0,
};
