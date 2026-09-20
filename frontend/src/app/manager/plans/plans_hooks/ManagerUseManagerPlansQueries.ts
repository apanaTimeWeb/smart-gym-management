// DATA FLOW: components → hooks → API layer → backend
// RESPONSIBILITY: Provides TanStack Query hooks for the Manager Plans module.
'use client';
/** Manages UsePlansQueries for the Manager module. */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import type { ManagerPlansChangeRequestPayload } from '@/app/manager/plans/plans_types/ManagerPlansChangeRequestTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchPlans(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'plans', 'list', params],
    queryFn: async () => {
      const res = await plansApi.fetchPlans(params);
      return res.data ?? { plans: [], total: 0 };
    },
    staleTime: 5 * 60 * 1000 });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useRequestPlanChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ManagerPlansChangeRequestPayload) => plansApi.createChangeRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'list'] });
    } });
}
