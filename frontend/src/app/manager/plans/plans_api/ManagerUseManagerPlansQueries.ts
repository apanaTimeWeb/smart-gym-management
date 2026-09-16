// RESPONSIBILITY: Provides TanStack Query hooks for the Manager Plans module.
// DATA FLOW: components → hooks → API layer → backend
/** Manages UsePlansQueries for the Manager module. */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { managerPlansChangeRequestApi } from '@/app/manager/plans/plans_api/ManagerPlansChangeRequestApi';
import type { ManagerPlansChangeRequestPayload } from '@/app/manager/plans/plans_types/ManagerPlansChangeRequestTypes';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';

export function useFetchPlans() {
  return useQuery({
    queryKey: ['manager', 'plans', 'list'],
    queryFn: async () => {
      const res = await plansApi.getAll();
      if (!res.data) throw new Error('Failed to fetch plans');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRequestPlanChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ManagerPlansChangeRequestPayload) => managerPlansChangeRequestApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'list'] });
    },
  });
}
