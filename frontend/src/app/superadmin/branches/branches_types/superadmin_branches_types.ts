// RESPONSIBILITY: All TypeScript types for the Superadmin Branches module.

export type BranchStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface SuperadminBranch {
  id: string;
  tenantId: string;
  tenantName: string;
  branchName: string;
  location: string;
  city: string;
  state: string;
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
