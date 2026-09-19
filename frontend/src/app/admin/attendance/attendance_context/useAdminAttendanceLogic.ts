"use client";
// RESPONSIBILITY: Coordinates Attendance URL/filter state and server data; no business filtering or pagination is performed in the view.
// DATA FLOW: URL/Attendance store → typed query params → AdminAttendanceApi → Zod/MSW → TanStack Query → Attendance views.
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import { fetchAttendanceRecords, fetchAttendanceSummary, fetchAttendanceTrend, type AdminAttendanceQueryParams } from '@/app/admin/attendance/attendance_api/AdminAttendanceApi';
import { ATTENDANCE_ITEMS_PER_PAGE } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';

export function useAdminAttendanceLogic() {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminAttendanceStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => useAdminAttendanceStore.getState().setStatusFilter(val as AttendanceStatus | 'all') },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminAttendanceStore.getState().setBranchFilter },
    { key: 'range', value: dateRange, defaultValue: 'today', setValue: (val) => useAdminAttendanceStore.getState().setDateRange(val as DateRangeFilter) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const debouncedSearch = useDebounce(search, 300);
  const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : (branchFilter !== 'all' ? branchFilter : undefined);
  const params: AdminAttendanceQueryParams = { page: currentPage, limit: ATTENDANCE_ITEMS_PER_PAGE, branchId: activeBranch, search: debouncedSearch || undefined, status: statusFilter === 'all' ? undefined : statusFilter, dateRange };

  const recordsQuery = useQuery({
    queryKey: ['admin', 'attendance', 'records', params],
    queryFn: () => fetchAttendanceRecords(params),
  });
  const summaryParams = { branchId: activeBranch, dateRange } as const;
  const summaryQuery = useQuery({ queryKey: ['admin', 'attendance', 'summary', summaryParams], queryFn: () => fetchAttendanceSummary(summaryParams) });
  const trendQuery = useQuery({ queryKey: ['admin', 'attendance', 'trend', summaryParams], queryFn: () => fetchAttendanceTrend(summaryParams) });

  const records = recordsQuery.data?.data ?? [];
  const allFilteredCount = recordsQuery.data?.meta?.total ?? records.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ATTENDANCE_ITEMS_PER_PAGE));
  const status = recordsQuery.status;
  const error = recordsQuery.error instanceof Error ? recordsQuery.error.message : summaryQuery.error instanceof Error ? summaryQuery.error.message : '';

  return useMemo(() => ({
    records, allFilteredCount, summary: summaryQuery.data?.data ?? null, trend: trendQuery.data?.data ?? [], status, error,
    currentPage, setCurrentPage, totalPages,
    loadAll: async () => { await Promise.all([recordsQuery.refetch(), summaryQuery.refetch(), trendQuery.refetch()]); },
    dateRange,
  }), [records, allFilteredCount, summaryQuery.data, trendQuery.data, status, error, currentPage, setCurrentPage, totalPages, recordsQuery, summaryQuery, trendQuery, dateRange]);
}
