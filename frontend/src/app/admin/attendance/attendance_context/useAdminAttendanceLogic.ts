// RESPONSIBILITY: Data logic hook for Admin Attendance. Fetches records + summary + trend, applies filters, paginates.
// DATA FLOW: Mock API → useAdminAttendanceLogic → AdminAttendanceMain → child components
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { fetchAttendanceRecords, fetchAttendanceSummary, fetchAttendanceTrend } from '@/app/admin/attendance/attendance_api/attendance_api';
import { ATTENDANCE_ITEMS_PER_PAGE } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, FetchState } from '@/app/admin/attendance/attendance_types/attendance_types';

export function useAdminAttendanceLogic() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();

  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [error, setError] = useState('');
  const [allRecords, setAllRecords] = useState<AdminAttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AdminAttendanceSummary | null>(null);
  const [trend, setTrend] = useState<AdminAttendanceTrendPoint[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      const [records, summaryData, trendData] = await Promise.all([
        fetchAttendanceRecords(),
        fetchAttendanceSummary(),
        fetchAttendanceTrend(),
      ]);
      setAllRecords(records);
      setSummary(summaryData);
      setTrend(trendData);
      setFetchState('success');
    } catch {
      setError('Failed to load attendance data.');
      setFetchState('error');
    }
  }, []);

  // Dependency array: loadAll is stable (useCallback with no deps)
  useEffect(() => { void loadAll(); }, [loadAll]);

  const filteredRecords = useMemo(() => {
    const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : branchFilter;
    return allRecords.filter((r) => {
      const matchesBranch = activeBranch === 'all' || r.branchId === activeBranch;
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      const matchesSearch =
        !debouncedSearch ||
        r.memberName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        r.memberPhone.includes(debouncedSearch);
      return matchesBranch && matchesStatus && matchesSearch;
    });
  }, [allRecords, selectedBranchId, branchFilter, statusFilter, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ATTENDANCE_ITEMS_PER_PAGE));
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ATTENDANCE_ITEMS_PER_PAGE,
    currentPage * ATTENDANCE_ITEMS_PER_PAGE
  );

  return {
    records: paginatedRecords,
    allFilteredCount: filteredRecords.length,
    summary,
    trend,
    fetchState,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll,
    dateRange,
  };
}
