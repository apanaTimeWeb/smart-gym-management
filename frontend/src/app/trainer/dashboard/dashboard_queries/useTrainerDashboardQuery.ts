// RESPONSIBILITY: TanStack Query hook for fetching Trainer Dashboard data.
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/trainer/dashboard/dashboard_api/TrainerDashboard_api';
import { useTrainerDashboardStore } from '@/app/trainer/dashboard/dashboard_store/useTrainerDashboardStore';

export function useTrainerDashboardQuery() {
  const { timeRange, startDate, endDate } = useTrainerDashboardStore();

  return useQuery({
    queryKey: ['trainer', 'dashboard', timeRange, startDate, endDate],
    queryFn: () => dashboardApi.getStats(timeRange, startDate, endDate),
    staleTime: 5 * 60 * 1000,
  });
}
