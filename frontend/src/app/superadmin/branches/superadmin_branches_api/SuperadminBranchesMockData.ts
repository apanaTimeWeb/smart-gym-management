import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';

export const MOCK_SUPERADMIN_BRANCHES: SuperadminBranch[] = [
  {
    id: 'b1', tenantId: 't1', tenantName: 'Iron Paradise', branchName: 'Downtown Main',
    location: 'Downtown', city: 'Mumbai', state: 'MH', managerName: 'Alice', managerEmail: 'alice@iron.com',
    phone: '9876543210', status: 'ACTIVE', memberCount: 150, staffCount: 10, monthlyRevenue: 4000,
    createdAt: '2023-10-01'
  },
  {
    id: 'b2', tenantId: 't1', tenantName: 'Iron Paradise', branchName: 'Andheri East',
    location: 'Andheri East', city: 'Mumbai', state: 'MH', managerName: 'Bob', managerEmail: 'bob@iron.com',
    phone: '9876543211', status: 'ACTIVE', memberCount: 50, staffCount: 5, monthlyRevenue: 1000,
    createdAt: '2023-10-10'
  },
  {
    id: 'b3', tenantId: 't2', tenantName: 'Fit Life Studio', branchName: 'Pune Center',
    location: 'Pune Center', city: 'Pune', state: 'MH', managerName: 'Charlie', managerEmail: 'charlie@fitlife.com',
    phone: '9876543212', status: 'INACTIVE', memberCount: 50, staffCount: 3, monthlyRevenue: 0,
    createdAt: '2023-10-15'
  }
];
