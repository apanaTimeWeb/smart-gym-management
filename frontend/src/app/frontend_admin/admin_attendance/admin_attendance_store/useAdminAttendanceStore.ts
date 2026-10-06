// RESPONSIBILITY: Zustand store for Admin Attendance UI state — filters, pagination, date range.
"use client";
import type { AdminAttendanceStoreState } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceStoreStateTypes';

// DATA FLOW: feature API/schema → hook/context → useAdminAttendanceStore consumers.
import { create } from 'zustand';
import type { AttendanceStatus, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceTypes';
/**
 * @description useAdminAttendanceStore: Zustand store for Admin Attendance UI state — filters, pagination, date range.
 * @dependencies Consumes AdminAttendanceStoreStateTypes, AdminAttendanceTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
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
