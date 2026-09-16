"use client";

// RESPONSIBILITY: Coordinates read-only Admin Attendance server state, URL-independent client filters, pagination, and derived records.
// DATA FLOW: AdminAttendanceApi → TanStack Query → useAdminAttendanceLogic → AdminAttendanceMain → attendance components
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useDebounce } from '@/app/admin/admin_utils/useAdminDebounce';
import { fetchAttendanceRecords, fetchAttendanceSummary, fetchAttendanceTrend } from '@/app/admin/attendance/attendance_api/AdminAttendanceApi';
import { ATTENDANCE_ITEMS_PER_PAGE } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';

export function useAdminAttendanceLogic() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminAttendanceStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => useAdminAttendanceStore.getState().setStatusFilter(val as any) },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminAttendanceStore.getState().setBranchFilter },
    { key: 'range', value: dateRange, defaultValue: 'today', setValue: (val) => useAdminAttendanceStore.getState().setDateRange(val as any) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const debouncedSearch = useDebounce(search, 300);

  const recordsQuery = useQuery({
    queryKey: ['admin', 'attendance', 'records', { branchId: selectedBranchId, search: debouncedSearch, status: statusFilter, dateRange }],
    queryFn: fetchAttendanceRecords,
  });
  const summaryQuery = useQuery({
    queryKey: ['admin', 'attendance', 'summary', selectedBranchId, dateRange],
    queryFn: fetchAttendanceSummary,
  });
  const trendQuery = useQuery({
    queryKey: ['admin', 'attendance', 'trend', selectedBranchId, dateRange],
    queryFn: fetchAttendanceTrend,
  });

  const filteredRecords = useMemo(() => {
    const records = recordsQuery.data ?? [];
    const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : branchFilter;
    return records.filter((record) => {
      const matchesBranch = activeBranch === 'all' || record.branchId === activeBranch;
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const normalizedSearch = debouncedSearch.toLowerCase();
      const matchesSearch = !normalizedSearch || record.memberName.toLowerCase().includes(normalizedSearch) || record.memberPhone.includes(debouncedSearch);
      return matchesBranch && matchesStatus && matchesSearch;
    });
  }, [recordsQuery.data, selectedBranchId, branchFilter, statusFilter, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ATTENDANCE_ITEMS_PER_PAGE));
  const records = filteredRecords.slice((currentPage - 1) * ATTENDANCE_ITEMS_PER_PAGE, currentPage * ATTENDANCE_ITEMS_PER_PAGE);

  return {
    records,
    allFilteredCount: filteredRecords.length,
    summary: summaryQuery.data ?? null,
    trend: trendQuery.data ?? [],
    status: recordsQuery.status,
    error: recordsQuery.error instanceof Error ? recordsQuery.error.message : '',
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll: async () => { await Promise.all([recordsQuery.refetch(), summaryQuery.refetch(), trendQuery.refetch()]); },
    dateRange,
  };
}
