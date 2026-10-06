// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesTimeRangeTypes';
import type { AdminBranchesStatusFilter, DetailView } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesUiTypes';
export interface AdminBranchesStore {
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
