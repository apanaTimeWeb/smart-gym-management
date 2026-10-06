"use client";
// RESPONSIBILITY: Logic layer for Staff Performance Dashboard. Handles API fetching,
import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: feature API/schema → hook/context → useAdminHrPerformanceLogic consumers.
// client-side sorting, and deriving KPI aggregates.
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrDebounce } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrDebounce';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrApi';
import { sortAdminHrPerformanceRecords } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrPerformanceSortUtils';
import type { 
  StaffPerformanceRecord, 
  PerformancePeriod, 
  PerformanceSortKey, 
  PerformanceSortDirection,
  PerformanceAggregates
} from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';
/**
 * @description useAdminHrPerformanceLogic: Logic layer for Staff Performance Dashboard. Handles API fetching,
 * @dependencies Consumes AdminHrQueryKeys, useAdminLayoutDebounce, useAdminLayoutUrlQuerySync, AdminHrApi, AdminHrPerformanceSortUtils, AdminHrPerformanceTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrPerformanceLogic() {
  const [period, setPeriod] = useState<PerformancePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<PerformanceSortKey>('rating');
  const [sortDir, setSortDir] = useState<PerformanceSortDirection>('desc');

  const debouncedSearch = useAdminHrDebounce(searchQuery, 300);

  useAdminLayoutUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as PerformancePeriod) },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: (val) => setSearchQuery(val as string) },
  ]);

  const { data: rawResponse, isPending, isError } = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('performance', { period, search: debouncedSearch, sortKey, sortDir }),
    queryFn: () => AdminHrApi.fetchStaffPerformance(period, { search: debouncedSearch, sortKey, sortDir }),
  });

  const sourceData = rawResponse?.data ?? [];
  const sortedData = sortAdminHrPerformanceRecords(sourceData, sortKey, sortDir);

  const aggregates: PerformanceAggregates = (() => {
    if (sortedData.length === 0) return { totalSessions: 0, totalMembersAdded: 0, avgAttendance: 0, avgRating: 0, topPerformersCount: 0, lowPerformersCount: 0 };
    const sessions = sortedData.reduce((sum, staff) => sum + staff.sessionsTaken, 0);
    const members = sortedData.reduce((sum, staff) => sum + staff.membersAdded, 0);
    const attendance = sortedData.reduce((sum, staff) => sum + staff.attendancePct, 0);
    const rating = sortedData.reduce((sum, staff) => sum + staff.rating, 0);
    return {
      totalSessions: sessions,
      totalMembersAdded: members,
      avgAttendance: attendance / sortedData.length,
      avgRating: rating / sortedData.length,
      topPerformersCount: sortedData.filter((staff) => staff.status === 'EXCELLENT').length,
      lowPerformersCount: sortedData.filter((staff) => staff.status === 'POOR').length,
    };
  })();

  return {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort: (key: PerformanceSortKey) => {
      setSortKey((currentKey) => {
        if (currentKey !== key) {
          setSortDir('desc');
          return key;
        }
        setSortDir((currentDirection) => currentDirection === 'asc' ? 'desc' : 'asc');
        return currentKey;
      });
    },
    sortedData,
    aggregates,
    isPending,
    isError,
  };
}
