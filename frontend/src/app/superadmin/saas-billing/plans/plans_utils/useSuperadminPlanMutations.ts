// RESPONSIBILITY: Owns subscription plan create/update mutations and Query reconciliation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '@/app/superadmin/saas-billing/plans/plans_api/SuperadminPlansApi';
import type { CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/saas-billing/plans/plans_types/SuperadminPlansTypes';
/**
 * Purpose: Keeps plan persistence out of modal view components.
 * Inputs: module-owned create/update payloads.
 * Output: mutation actions and pending state.
 * Side effects: invalidates plan list Query state after success.
 * Invariant: plan API calls remain inside the plans feature.
 */
export function useSuperadminPlanMutations() {
  const queryClient = useQueryClient();
  const reconcile = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'plans'] });
  const create = useMutation({ mutationFn: (payload: CreatePlanPayload) => plansApi.createPlan(payload), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await reconcile(); } });
  const update = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: UpdatePlanPayload }) => plansApi.updatePlan(id, payload), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await reconcile(); } });
  return { createPlan: create.mutateAsync, isCreating: create.isPending, updatePlan: update.mutateAsync, isUpdating: update.isPending };
}
