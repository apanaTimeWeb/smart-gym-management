// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { create } from 'zustand';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

export type DetailView = "revenue" | "expenses" | "staff" | "students";

interface AdminBranchesStore {
  timeRange: AdminBranchesTimeRange;
  setTimeRange: (range: AdminBranchesTimeRange) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  detailView: DetailView | null;
  setDetailView: (view: DetailView | null) => void;
}

export const useAdminBranchesStore = create<AdminBranchesStore>((set) => ({
  timeRange: 'monthly',
  setTimeRange: (range) => set({ timeRange: range }),
  startDate: '',
  setStartDate: (date) => set({ startDate: date }),
  endDate: '',
  setEndDate: (date) => set({ endDate: date }),
  selectedBranch: null,
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  detailView: null,
  setDetailView: (view) => set({ detailView: view }),
}));

