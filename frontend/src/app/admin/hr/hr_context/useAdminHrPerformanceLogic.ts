"use client";

// DATA FLOW: feature API/schema → hook/context → useAdminHrPerformanceLogic consumers.
// RESPONSIBILITY: Logic layer for Staff Performance Dashboard. Handles API fetching,
// client-side sorting, and deriving KPI aggregates.
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import type { 
  StaffPerformanceRecord, 
  PerformancePeriod, 
  PerformanceSortKey, 
  PerformanceSortDirection,
  PerformanceAggregates
} from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export function useAdminHrPerformanceLogic() {
  const [period, setPeriod] = useState<PerformancePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<PerformanceSortKey>('rating');
  const [sortDir, setSortDir] = useState<PerformanceSortDirection>('desc');

  const debouncedSearch = useDebounce(searchQuery, 300);

  useAdminUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as PerformancePeriod) },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: setSearchQuery },
  ]);

  const { data: rawResponse, isLoading, isError } = useQuery({
    queryKey: ['admin', 'hr', 'performance', { period, search: debouncedSearch, sortKey, sortDir }],
    queryFn: () => hrApi.fetchStaffPerformance(period, { search: debouncedSearch, sortKey, sortDir }),
  });

  const sortedData = rawResponse?.data ?? [];

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
    handleSort: (k: any) => {},
    sortedData,
    aggregates,
    isLoading,
    isError,
  };
}
