// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → ManagerDashboardMain → useManagerDashboardLogic → DashboardContext → KPI/Chart components
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { dashboardApi } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardApi';
import type { DashboardContextType, FetchState, DashboardStats, TimeRange } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
export function useManagerDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const [stats, setStats] = useState<DashboardStats | null>(initialData || null);
  const [status, setStatus] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [error, setError] = useState('');

  // Not used in UI but kept to satisfy context type contract for now
  const timeRange = 'monthly' as TimeRange;
  const setTimeRange = () => {};
  const startDate = '';
  const endDate = '';
  const setCustomDateRange = () => {};

  // Fetch only when no SSR initialData was passed from page.tsx; initialData in deps prevents re-fetch on SSR hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus('loading');
    dashboardApi.getStats(range)
      .then(res => {
        setStats(res.data);
        setStatus('success');
      })
      .catch(e => {
        setError(e.message);
        setStatus('error');
      });
  }, [initialData, range]); 

  return { stats, status, error, timeRange, setTimeRange, startDate, endDate, setCustomDateRange };
}

