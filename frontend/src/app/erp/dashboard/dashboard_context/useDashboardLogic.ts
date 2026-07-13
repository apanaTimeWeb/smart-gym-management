// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: DashboardContext -> useDashboardLogic.ts (Hook) -> dashboard_api.ts (API)

import { useState, useEffect } from 'react';
import { dashboardApi } from '@/app/erp/dashboard/dashboard_api/dashboard_api';
import { type DashboardStats } from '@/lib/api';
import { DashboardContextType, FetchState } from '@/app/erp/dashboard/dashboard_types/dashboard_types';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
export function useDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const [stats, setStats] = useState<DashboardStats | null>(initialData || null);
  const [status, setStatus] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [error, setError] = useState('');

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
