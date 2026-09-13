// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → ManagerDashboardMain → useManagerDashboardLogic → DashboardContext → KPI/Chart components
'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { DashboardContextType, FetchState, DashboardStats, TimeRange } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/useManagerDashboardQueries';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
export function useManagerDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const { data: statsData, isLoading, isError, error: queryError } = useDashboardStatsQuery(range);

  const stats = useMemo(() => statsData || initialData || null, [statsData, initialData]);
  const status: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const error = isError ? (queryError as Error).message : '';

  // Not used in UI but kept to satisfy context type contract for now
  const timeRange = 'monthly' as TimeRange;
  const setTimeRange = () => {};
  const startDate = '';
  const endDate = '';
  const setCustomDateRange = () => {};

  return { stats, status, error, timeRange, setTimeRange, startDate, endDate, setCustomDateRange };
}

