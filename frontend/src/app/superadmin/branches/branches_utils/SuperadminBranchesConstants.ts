// RESPONSIBILITY: Constants and mock data for the Superadmin Branches module.
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';

export const BRANCHES_PAGE_SIZE = 10;

export const BRANCH_STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-success-bg text-success border border-success/20',
  INACTIVE: 'bg-input text-secondary border border-border',
  SUSPENDED: 'bg-danger-bg text-danger border border-danger/20',
};

export const MOCK_BRANCHES: SuperadminBranch[] = [
  {
    id: 'br-001',
    tenantId: 'gym-1234',
    tenantName: 'Flex Fitness Central',
    branchName: 'Flex Fitness — Koramangala',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    managerName: 'Ravi Kumar',
    managerEmail: 'ravi@flexfitness.com',
    phone: '+91 9876543210',
    status: 'ACTIVE',
    memberCount: 420,
    staffCount: 12,
    monthlyRevenue: 84000,
    createdAt: '2023-03-10T00:00:00Z',
  },
  {
    id: 'br-002',
    tenantId: 'gym-1234',
    tenantName: 'Flex Fitness Central',
    branchName: 'Flex Fitness — Indiranagar',
    location: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    managerName: 'Priya Sharma',
    managerEmail: 'priya@flexfitness.com',
    phone: '+91 9876543211',
    status: 'ACTIVE',
    memberCount: 310,
    staffCount: 9,
    monthlyRevenue: 62000,
    createdAt: '2023-07-15T00:00:00Z',
  },
  {
    id: 'br-003',
    tenantId: 'gym-5678',
    tenantName: 'Iron Temple Barbell Club',
    branchName: 'Iron Temple — HSR Layout',
    location: 'HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    managerName: 'Suresh Nair',
    managerEmail: 'suresh@irontemple.com',
    phone: '+91 9876543212',
    status: 'SUSPENDED',
    memberCount: 85,
    staffCount: 4,
    monthlyRevenue: 17000,
    createdAt: '2024-01-20T00:00:00Z',
  },
];
