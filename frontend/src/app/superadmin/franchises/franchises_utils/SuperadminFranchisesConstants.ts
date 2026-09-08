// RESPONSIBILITY: Constants and mock data for the Superadmin Franchises module.
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';

export const FRANCHISES_PAGE_SIZE = 10;

export const FRANCHISE_STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-success-bg text-success border border-success/20',
  INACTIVE: 'bg-input text-secondary border border-border',
  SUSPENDED: 'bg-danger-bg text-danger border border-danger/20',
};

export const MOCK_FRANCHISES: SuperadminFranchise[] = [
  {
    id: 'fr-001',
    franchiseName: 'Flex Fitness Network',
    ownerName: 'Sarah Connor',
    ownerEmail: 'sarah@flexfitness.com',
    phone: '+91 9876543210',
    status: 'ACTIVE',
    branchCount: 5,
    totalMembers: 2100,
    totalStaff: 48,
    totalMonthlyRevenue: 420000,
    plan: 'ENTERPRISE',
    city: 'Bangalore',
    state: 'Karnataka',
    createdAt: '2022-11-01T00:00:00Z',
  },
  {
    id: 'fr-002',
    franchiseName: 'Iron Temple Group',
    ownerName: 'Arnold Strong',
    ownerEmail: 'arnold@irontemple.com',
    phone: '+91 9876543211',
    status: 'ACTIVE',
    branchCount: 3,
    totalMembers: 950,
    totalStaff: 22,
    totalMonthlyRevenue: 190000,
    plan: 'PRO',
    city: 'Mumbai',
    state: 'Maharashtra',
    createdAt: '2023-04-15T00:00:00Z',
  },
  {
    id: 'fr-003',
    franchiseName: 'Zenith Wellness Chain',
    ownerName: 'Mia Wong',
    ownerEmail: 'mia@zenithwellness.com',
    phone: '+91 9876543212',
    status: 'SUSPENDED',
    branchCount: 2,
    totalMembers: 310,
    totalStaff: 14,
    totalMonthlyRevenue: 62000,
    plan: 'STARTER',
    city: 'Hyderabad',
    state: 'Telangana',
    createdAt: '2024-01-10T00:00:00Z',
  },
];
