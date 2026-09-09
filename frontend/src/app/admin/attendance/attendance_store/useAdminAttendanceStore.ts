// RESPONSIBILITY: Zustand store for Admin Attendance UI state — filters, pagination, date range.
import { create } from 'zustand';
import type { AttendanceStatus, DateRangeFilter } from '@/app/admin/attendance/attendance_types/attendance_types';

interface AdminAttendanceStoreState {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AttendanceStatus | 'all';
  setStatusFilter: (s: AttendanceStatus | 'all') => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  dateRange: DateRangeFilter;
  setDateRange: (d: DateRangeFilter) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  visibleColumns: string[];
  setVisibleColumns: (cols: string[]) => void;
}

export const useAdminAttendanceStore = create<AdminAttendanceStoreState>((set) => ({
  search: '',
  setSearch: (s) => set({ search: s, currentPage: 1 }),
  statusFilter: 'all',
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  branchFilter: 'all',
  setBranchFilter: (s) => set({ branchFilter: s, currentPage: 1 }),
  dateRange: 'today',
  setDateRange: (d) => set({ dateRange: d, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
  visibleColumns: ['Member', 'Branch', 'Time', 'Status'],
  setVisibleColumns: (cols) => set({ visibleColumns: cols }),
}));
