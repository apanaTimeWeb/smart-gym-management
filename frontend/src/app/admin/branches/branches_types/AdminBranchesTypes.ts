// RESPONSIBILITY: TypeScript types for the Admin Branches module.

export type BranchStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface AdminBranch {
  id: string;
  name: string;
  location: string;
  city: string;
  managerName: string;
  managerEmail: string;
  phone: string;
  status: BranchStatus;
  memberCount: number;
  staffCount: number;
  monthlyRevenue: number;
  createdAt: string;
}

export type BranchesFetchState = 'idle' | 'loading' | 'success' | 'error';
