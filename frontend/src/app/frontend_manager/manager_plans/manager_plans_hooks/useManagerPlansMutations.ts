'use client';
// DATA FLOW: Plan-change submit → mutation hook → ManagerPlansApi → TanStack Query invalidation → plans UI.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerPlansApi } from '@/app/frontend_manager/manager_plans/manager_plans_api/ManagerPlansApi';
import { ManagerPlansQueryKeys } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansQueryKeys';
import type { ManagerPlansChangeRequestPayload } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansChangeRequestTypes';
import type { Plan } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes';

/**
 * @description Owns the Manager plans change-request mutation and cache invalidation.
 * @dependencies Uses ManagerPlansApi and ManagerPlansQueryKeys only; callers provide an intent-scoped idempotency key.
 * @edge-case Keeps plan server state authoritative by invalidating affected queries only after a successful response.
 */
export function useManagerPlansMutations() {
  const queryClient = useQueryClient();
  const invalidate = async () => { await queryClient.invalidateQueries({ queryKey: ManagerPlansQueryKeys.all }); };
  const createChangeRequest = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: ManagerPlansChangeRequestPayload; idempotencyKey: string }) => ManagerPlansApi.createChangeRequest(payload, idempotencyKey), onSuccess: invalidate });
  const createPlan = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Plan>; idempotencyKey: string }) => ManagerPlansApi.createPlan(payload, idempotencyKey), onSuccess: invalidate });
  const updatePlan = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Plan>; idempotencyKey: string }) => ManagerPlansApi.updatePlan(id, payload, idempotencyKey), onSuccess: invalidate });
  const deletePlan = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerPlansApi.deletePlan(id, idempotencyKey), onSuccess: invalidate });
  return { createChangeRequest, createPlan, updatePlan, deletePlan };
}
