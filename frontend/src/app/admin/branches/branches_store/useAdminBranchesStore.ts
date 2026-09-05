import { create } from 'zustand';
import type { TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';
import type { DetailView } from '@/app/admin/branches/branches_context/useAdminBranchesLogic';

interface AdminBranchesStore {
  timeRange: TimeRange;
  setTimeRange: (t: TimeRange) => void;
  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  selectedBranch: Branch | null;
  setSelectedBranch: (b: Branch | null) => void;
  detailView: DetailView | null;
  setDetailView: (v: DetailView | null) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useAdminBranchesStore = create<AdminBranchesStore>((set) => ({
  timeRange: 'monthly',
  setTimeRange: (t) => set({ timeRange: t }),
  startDate: '',
  setStartDate: (d) => set({ startDate: d }),
  endDate: '',
  setEndDate: (d) => set({ endDate: d }),
  selectedBranch: null,
  setSelectedBranch: (b) => set({ selectedBranch: b }),
  detailView: null,
  setDetailView: (v) => set({ detailView: v }),
  toast: null,
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}));
