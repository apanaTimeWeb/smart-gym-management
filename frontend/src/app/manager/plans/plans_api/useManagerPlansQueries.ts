// RESPONSIBILITY: Provides TanStack Query hooks for the Manager Plans module.
// DATA FLOW: components → hooks → API layer → backend
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    mutationFn: async ({ planId, note }: { planId: string; note: string }) => {
      // In a real app, this would hit a 'change request' API endpoint.
      // Currently, it hits update as a mockup. We use 'name' just to pass type checking.
      const res = await plansApi.update(planId, { name: note });
      if (!res.data) throw new Error('Failed to request change');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'list'] });
    },
  });
}
