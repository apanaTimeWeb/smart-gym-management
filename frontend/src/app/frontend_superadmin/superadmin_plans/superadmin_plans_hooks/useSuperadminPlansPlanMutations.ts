'use client';
// DATA FLOW: Inputs enter useSuperadminPlansPlanMutations, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns subscription plan create/update mutations and Query reconciliation.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { plansApi } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi';
import { SUPERADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_constants/SuperadminPlansQueryKeys';

import type { CreatePlanPayload, UpdatePlanPayload } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes';


/**
 * Purpose: Keeps plan persistence out of modal view components.
 * Inputs: module-owned create/update payloads.
 * Output: mutation actions and pending state.
 * Side effects: invalidates plan list Query state after success.
 * Invariant: plan API calls remain inside the plans feature.
 */
/**
 * @description Manages plans state, queries, and UI interactions for useSuperadminPlansPlanMutations.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminPlansPlanMutations → consuming feature component.
export function useSuperadminPlansPlanMutations() {
  const queryClient = useQueryClient();
  const createKeyRef = useRef<string | null>(null);
  const updateKeysRef = useRef(new Map<string, string>());
  const reconcile = () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLANS_QUERY_KEYS.all });
  const create = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: CreatePlanPayload; idempotencyKey: string }) => plansApi.createPlan(payload, idempotencyKey), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await reconcile(); createKeyRef.current = null; } });
  const update = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: UpdatePlanPayload; idempotencyKey: string }) => plansApi.updatePlan(id, payload, idempotencyKey), onSuccess: async (_response, variables) => { await reconcile(); updateKeysRef.current.delete(variables.id); } });
  const createPlan = (payload: CreatePlanPayload) => { createKeyRef.current ??= crypto.randomUUID(); return create.mutateAsync({ payload, idempotencyKey: createKeyRef.current }); };
  const updatePlan = (input: { id: string; payload: UpdatePlanPayload }) => { const key = updateKeysRef.current.get(input.id) ?? crypto.randomUUID(); updateKeysRef.current.set(input.id, key); return update.mutateAsync({ ...input, idempotencyKey: key }); };
  return { createPlan, isCreating: create.isPending, updatePlan, isUpdating: update.isPending };
}
