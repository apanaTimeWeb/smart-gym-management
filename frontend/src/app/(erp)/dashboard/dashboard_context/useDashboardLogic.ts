import { useState, useEffect } from 'react';
import { dashboardApi, type DashboardStats } from '@/lib/api';
import { DashboardContextType } from '@/app/(erp)/dashboard/dashboard_types/dashboard_types';

export function useDashboardLogic(): DashboardContextType {
 const [stats, setStats] = useState<DashboardStats | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 useEffect(() => {
 dashboardApi.getStats()
 .then(res => setStats(res.data))
 .catch(e => setError(e.message))
 .finally(() => setLoading(false));
 }, []);

 return {
 stats,
 loading,
 error
 };
}
