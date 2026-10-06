// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersUiTypes';
import type { AdminMembersStatusFilter } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';
export interface AdminMembersStoreState {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AdminMembersStatusFilter;
  setStatusFilter: (s: AdminMembersStatusFilter) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  expiryFilter: AdminMembersExpiryFilter;
  setExpiryFilter: (s: AdminMembersExpiryFilter) => void;
  genderFilter: string;
  setGenderFilter: (s: string) => void;
  planFilter: string;
  setPlanFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
