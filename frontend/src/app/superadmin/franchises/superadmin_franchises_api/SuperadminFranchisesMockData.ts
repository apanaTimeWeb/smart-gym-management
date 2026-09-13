import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';

export const MOCK_SUPERADMIN_FRANCHISES: SuperadminFranchise[] = [
  {
    id: 'f1', franchiseName: 'Gold Gym Group', ownerName: 'Alice Johnson', ownerEmail: 'alice@goldgym.com',
    phone: '9876543210', status: 'ACTIVE', branchCount: 15, totalMembers: 5000, totalStaff: 150,
    totalMonthlyRevenue: 500000, plan: 'Enterprise', city: 'Mumbai', state: 'MH',
    gstin: '27AABCU9603R1ZX', createdAt: '2023-01-10'
  },
  {
    id: 'f2', franchiseName: 'Anytime Fitness India', ownerName: 'Bob Smith', ownerEmail: 'bob@anytime.com',
    phone: '9876543211', status: 'ACTIVE', branchCount: 8, totalMembers: 2500, totalStaff: 80,
    totalMonthlyRevenue: 250000, plan: 'Pro', city: 'Delhi', state: 'DL',
    createdAt: '2023-05-15'
  },
  {
    id: 'f3', franchiseName: 'Cult Fit Mini', ownerName: 'Charlie', ownerEmail: 'charlie@cultfit.com',
    phone: '9876543212', status: 'SUSPENDED', branchCount: 2, totalMembers: 300, totalStaff: 10,
    totalMonthlyRevenue: 30000, plan: 'Basic', city: 'Bangalore', state: 'KA',
    createdAt: '2023-08-20'
  }
];
