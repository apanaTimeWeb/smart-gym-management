import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardApi';

export const managerDashboardQueryKeys = {
  all: ['manager', 'dashboard'] as const,
  stats: (range?: string) => [...managerDashboardQueryKeys.all, 'stats', range] as const,
};

export function useDashboardStatsQuery(range?: string) {
  return useQuery({
    queryKey: managerDashboardQueryKeys.stats(range),
    queryFn: () => dashboardApi.getStats(range).then(res => res.data),
  });
}
