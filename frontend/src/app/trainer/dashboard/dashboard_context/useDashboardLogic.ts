// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → TrainerDashboardMain → useDashboardLogic → DashboardContext → KPI/Chart components
'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '@/app/trainer/dashboard/dashboard_api/dashboard_api';
import type { DashboardContextType, FetchState, DashboardStats, TimeRange } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 * Bug #7 fix: uses proper cancelled flag pattern instead of setTimeout anti-pattern.
 */
export function useDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const [stats, setStats] = useState<DashboardStats | null>(initialData ?? null);
  const [status, setStatus] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const setCustomDateRange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  // Bug #7 fix: direct async effect with cancelled flag instead of setTimeout(() => {...}, 0)
  // The setTimeout pattern masks React strict-mode double-invocation and causes loading flash.
  // Deps: timeRange, startDate, endDate — refetch when range or custom dates change
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    dashboardApi
      .getStats(timeRange !== 'custom' ? timeRange : undefined, startDate || undefined, endDate || undefined)
      .then(res => {
        if (!cancelled) {
          setStats(res.data);
          setStatus('success');
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError((e as Error).message);
          setStatus('error');
        }
      });
    return () => { cancelled = true; };
  }, [timeRange, startDate, endDate]);

  return {
    stats,
    status,
    error,
    timeRange,
    setTimeRange,
    startDate,
    endDate,
    setCustomDateRange
  };
}
