// DATA FLOW: Manager module state/API data → useManagerDashboardQueries → owning Manager UI components.
'use client';
/** Manages UseDashboardQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardApi';


export const managerDashboardQueryKeys = {
  all: ['manager', 'dashboard'] as const,
  stats: (params?: Record<string, string>) => [...managerDashboardQueryKeys.all, 'stats', params] as const };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useDashboardStatsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerDashboardQueryKeys.stats(params),
    queryFn: () => dashboardApi.fetchDashboardStats(params).then(res => res.data) });
}
