import { useState, useEffect } from 'react';
import { dashboardApi, type DashboardStats } from '@/lib/api';
import { DashboardContextType } from '@/app/erp/dashboard/dashboard_types/dashboard_types';

export function useDashboardLogic(initialData?: DashboardStats | null): DashboardContextType {
  const [stats, setStats] = useState<DashboardStats | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) return;
    dashboardApi.getStats()
      .then(res => setStats(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [initialData]);

 return {
 stats,
 loading,
 error
 };
}
