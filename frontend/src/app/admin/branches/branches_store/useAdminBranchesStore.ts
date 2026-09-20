// DATA FLOW: feature API/schema → hook/context → useAdminBranchesStore consumers.
// RESPONSIBILITY: Owns UI-only branch filter, date-range, selection, and drawer-view state.
import { create } from 'zustand';
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';
import type { AdminBranchesStatusFilter, DetailView } from '@/app/admin/branches/branches_types/AdminBranchesUiTypes';

interface AdminBranchesStore {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: AdminBranchesStatusFilter;
  setStatusFilter: (value: AdminBranchesStatusFilter) => void;
  timeRange: AdminBranchesTimeRange;
  setTimeRange: (range: AdminBranchesTimeRange) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;
  detailView: DetailView | null;
  setDetailView: (view: DetailView | null) => void;
}

/** Coordinates BranchesStore state, data flow, and feature behavior. */
export const useAdminBranchesStore = create<AdminBranchesStore>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
  statusFilter: 'all',
  setStatusFilter: (value) => set({ statusFilter: value }),
  timeRange: 'monthly',
  setTimeRange: (range) => set({ timeRange: range }),
  startDate: '',
  setStartDate: (date) => set({ startDate: date }),
  endDate: '',
  setEndDate: (date) => set({ endDate: date }),
  selectedBranchId: null,
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
  detailView: null,
  setDetailView: (view) => set({ detailView: view }),
}));
