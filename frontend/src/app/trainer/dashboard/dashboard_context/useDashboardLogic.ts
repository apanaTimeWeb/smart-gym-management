// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → DashboardMain → useDashboardLogic → DashboardContext → KPI/Chart components
'use client';

import { useState, useEffect } from 'react';
import { dashboardApi } from '@/app/trainer/dashboard/dashboard_api/dashboard_api';
import { DashboardContextType, FetchState, DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
export function useDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const [stats, setStats] = useState<DashboardStats | null>(initialData || null);
  const [status, setStatus] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [error, setError] = useState('');

  // Fetch only when no SSR initialData was passed from page.tsx; initialData in deps prevents re-fetch on SSR hydration
  useEffect(() => {
    if (initialData) return;

    setStatus('loading');
    dashboardApi.getStats()
      .then(res => {
        setStats(res.data);
        setStatus('success');
      })
      .catch(e => {
        setError(e.message);
        setStatus('error');
      });
  }, [initialData]);

  return {
    stats,
    status,
    error
  };
}
