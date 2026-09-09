// RESPONSIBILITY: All TypeScript types for the Superadmin Franchises module.

export type FranchiseStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface SuperadminFranchise {
  id: string;
  franchiseName: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  status: FranchiseStatus;
  branchCount: number;
  totalMembers: number;
  totalStaff: number;
  totalMonthlyRevenue: number;
  plan: string;
  city: string;
  state: string;
  gstin?: string;
  registrationNumber?: string;
  contractStartDate?: string;
  createdAt: string;
}

export type FranchisesFetchState = 'idle' | 'loading' | 'success' | 'error';
