// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminAttendanceStatusFilter, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceTypes';
export interface AdminAttendanceStoreState {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AdminAttendanceStatusFilter;
  setStatusFilter: (s: AdminAttendanceStatusFilter) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  dateRange: DateRangeFilter;
  setDateRange: (d: DateRangeFilter) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  visibleColumns: string[];
  setVisibleColumns: (cols: string[]) => void;
}
