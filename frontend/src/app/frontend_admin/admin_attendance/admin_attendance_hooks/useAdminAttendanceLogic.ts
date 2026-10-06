"use client";
import type { AdminAttendanceStatusFilter } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceTypes';
// RESPONSIBILITY: Coordinates Attendance URL/filter state and server data; no business filtering or pagination is performed in the view.

import { ADMIN_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/admin_attendance_constants/AdminAttendanceQueryKeys';
// DATA FLOW: URL/Attendance store → typed query params → AdminAttendanceApi → Zod/MSW → TanStack Query → Attendance views.
import { useMemo } from 'react';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/admin_attendance_store/useAdminAttendanceStore';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { useAdminAttendanceDebounce } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceDebounce';
import { AdminAttendanceApi } from '@/app/frontend_admin/admin_attendance/admin_attendance_api/AdminAttendanceApi';
import type { AdminAttendanceQueryParams } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceQueryTypes';
import { ATTENDANCE_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_attendance/admin_attendance_constants/AdminAttendanceConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceTypes';
/**
 * @description useAdminAttendanceLogic: Coordinates Attendance URL/filter state and server data; no business filtering or pagination is performed in the view.
 * @dependencies Consumes AdminAttendanceQueryKeys, AdminLayoutBackendMessage, useAdminAttendanceStore, useAdminLayoutUrlQuerySync, useAdminLayoutDebounce, AdminAttendanceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAttendanceLogic() {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();
  useAdminLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminAttendanceStore.getState().setSearch(val as string) },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => useAdminAttendanceStore.getState().setStatusFilter(val as any) },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: (val) => useAdminAttendanceStore.getState().setBranchFilter(val as string) },
    { key: 'range', value: dateRange, defaultValue: 'today', setValue: (val) => useAdminAttendanceStore.getState().setDateRange(val as DateRangeFilter) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const debouncedSearch = useAdminAttendanceDebounce(search, 300);
  const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : (branchFilter !== 'all' ? branchFilter : undefined);
  const params: AdminAttendanceQueryParams = { page: currentPage, limit: ATTENDANCE_ITEMS_PER_PAGE, branchId: activeBranch, search: debouncedSearch || undefined, status: statusFilter === 'all' ? undefined : statusFilter, dateRange };

  const recordsQuery = useQuery({
    queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('records', params),
    queryFn: () => AdminAttendanceApi.fetchAttendanceRecords(params),
  });
  const summaryParams = { branchId: activeBranch, dateRange } as const;
  const summaryQuery = useQuery({ queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('summary', summaryParams), queryFn: () => AdminAttendanceApi.fetchAttendanceSummary(summaryParams) });
  const trendQuery = useQuery({ queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('trend', summaryParams), queryFn: () => AdminAttendanceApi.fetchAttendanceTrend(summaryParams) });

  const records = recordsQuery.data?.data ?? [];
  const allFilteredCount = recordsQuery.data?.meta?.total ?? records.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ATTENDANCE_ITEMS_PER_PAGE));
  const status = recordsQuery.status;
  const error = getAdminBackendMessage(recordsQuery.error) ?? getAdminBackendMessage(summaryQuery.error) ?? '';

  return useMemo(() => ({
    records, allFilteredCount, summary: summaryQuery.data?.data ?? null, trend: trendQuery.data?.data ?? [], status, error,
    currentPage, setCurrentPage, totalPages,
    loadAll: async () => { await Promise.all([recordsQuery.refetch(), summaryQuery.refetch(), trendQuery.refetch()]); },
    dateRange,
  }), [records, allFilteredCount, summaryQuery.data, trendQuery.data, status, error, currentPage, setCurrentPage, totalPages, recordsQuery, summaryQuery, trendQuery, dateRange]);
}
