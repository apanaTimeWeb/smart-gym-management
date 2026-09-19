'use client';
// RESPONSIBILITY: Provides TanStack Query hooks for the Manager Plans module.
// DATA FLOW: components → hooks → API layer → backend
/** Manages UsePlansQueries for the Manager module. */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { managerPlansChangeRequestApi } from '@/app/manager/plans/plans_api/ManagerPlansChangeRequestApi';
import type { ManagerPlansChangeRequestPayload } from '@/app/manager/plans/plans_types/ManagerPlansChangeRequestTypes';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';

export function useFetchPlans(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'plans', 'list', params],
    queryFn: async () => {
      const res = await plansApi.fetchPlans(params);
      return res.data ?? { plans: [], total: 0 };
    },
    staleTime: 5 * 60 * 1000 });
}

export function useRequestPlanChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ManagerPlansChangeRequestPayload) => managerPlansChangeRequestApi.createChangeRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'list'] });
    } });
}
