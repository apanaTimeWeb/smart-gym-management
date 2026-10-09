"use client";
// RESPONSIBILITY: Owns Dashboard server state. URL parameters are the canonical owner of shareable date-range state.
// DATA FLOW: Dashboard URL/filter state → TanStack Query → TrainerDashboardApi → validated server data → dashboard UI.
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { TrainerDashboardApi } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_api/TrainerDashboardApi';

import { TRAINER_DASHBOARD_QUERY_KEYS } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_constants/TrainerDashboardQueryKeys';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_url_config';
import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardDateRangeTypes';






/**
 * @description Owns useTrainerDashboardQuery behavior in the Trainer module.
 * @dependencies Dashboard URL/filter state → TanStack Query → TrainerDashboardApi → validated server data → dashboard UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerDashboardQuery state and data flow for the dashboard feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerDashboardQuery() {
  const searchParams = useSearchParams();
  const range = (searchParams.get('range') ?? 'this_month') as TrainerDashboardDateRange;
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  return useQuery({
    queryKey: TRAINER_DASHBOARD_QUERY_KEYS.stats(range, startDate, endDate),
    queryFn: () => TrainerDashboardApi.fetchDashboardStats(range, startDate, endDate),
    meta: { endpoint: TRAINER_DASHBOARD_URLS.API.STATS },
    staleTime: 5 * 60 * 1000,
  });
}
