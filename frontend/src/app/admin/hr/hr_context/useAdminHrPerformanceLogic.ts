// RESPONSIBILITY: Logic layer for Staff Performance Dashboard. Handles API fetching,
// client-side sorting, and deriving KPI aggregates.
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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

  const { data: rawResponse, isLoading, isError } = useQuery({
    queryKey: ['admin_hr_performance', period],
    queryFn: () => hrApi.fetchStaffPerformance(period),
  });

  const staffData = rawResponse?.data || [];

  const handleSort = (key: PerformanceSortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc'); // Default new sort to desc
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return staffData;
    const lowerQ = searchQuery.toLowerCase();
    return staffData.filter(s => 
      s.name.toLowerCase().includes(lowerQ) || 
      s.role.toLowerCase().includes(lowerQ) ||
      s.branchName.toLowerCase().includes(lowerQ)
    );
  }, [staffData, searchQuery]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  const aggregates = useMemo<PerformanceAggregates>(() => {
    if (staffData.length === 0) {
      return {
        totalSessions: 0,
        totalMembersAdded: 0,
        avgAttendance: 0,
        avgRating: 0,
        topPerformersCount: 0,
        lowPerformersCount: 0,
      };
    }

    let sessions = 0;
    let members = 0;
    let totalAtt = 0;
    let totalRating = 0;
    let top = 0;
    let low = 0;

    for (const s of staffData) {
      sessions += s.sessionsTaken;
      members += s.membersAdded;
      totalAtt += s.attendancePct;
      totalRating += s.rating;
      if (s.status === 'EXCELLENT') top++;
      if (s.status === 'POOR') low++;
    }

    return {
      totalSessions: sessions,
      totalMembersAdded: members,
      avgAttendance: totalAtt / staffData.length,
      avgRating: totalRating / staffData.length,
      topPerformersCount: top,
      lowPerformersCount: low,
    };
  }, [staffData]);

  return {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort,
    sortedData,
    aggregates,
    isLoading,
    isError,
  };
}
