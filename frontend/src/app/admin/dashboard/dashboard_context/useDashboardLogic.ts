// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → AdminDashboardMain → useDashboardLogic → DashboardContext → KPI/Chart components
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/admin/dashboard/dashboard_api/dashboard_api';
import type { DashboardContextType, FetchState, DashboardStats, TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
export function useDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey: ['adminDashboardStats', timeRange, startDate, endDate],
    queryFn: async () => {
      const res = await dashboardApi.fetchDashboardStats();
      return res.data;
    },
    initialData: initialData || undefined,
  });

  const status: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  return {
    stats: data || null,
    status,
    error: isError ? (queryError as Error).message : '',
    timeRange,
    setTimeRange,
    startDate,
    endDate,
    setCustomDateRange: (start: string, end: string) => {
      setStartDate(start);
      setEndDate(end);
    }
  };
}
