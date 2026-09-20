'use client';
// RESPONSIBILITY: Owns Dashboard server state. URL parameters are the canonical owner of shareable date-range state.
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import { dashboardApi } from '@/app/trainer/dashboard/dashboard_api/TrainerDashboard_api';

/** Owns useTrainerDashboardQuery behavior for this Trainer module. */
export function useTrainerDashboardQuery() {
  const searchParams = useSearchParams();
  const range = searchParams.get('range') ?? 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  return useQuery({
    queryKey: ['trainer', 'dashboard', { range, startDate, endDate }],
    queryFn: () => dashboardApi.fetchDashboardStats(range, startDate, endDate),
    meta: { endpoint: DashboardUrlConfig.BACKEND_API.STATS },
    staleTime: 5 * 60 * 1000,
  });
}
