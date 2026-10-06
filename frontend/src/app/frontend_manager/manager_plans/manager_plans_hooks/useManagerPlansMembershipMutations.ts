'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerPlansApi } from '@/app/frontend_manager/manager_plans/manager_plans_api/ManagerPlansApi';
import { ManagerPlansQueryKeys } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansQueryKeys';
import type { ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansMembershipTypes';
type ManagerPlansMembershipMutationInput<TPayload> = { payload: TPayload; idempotencyKey: string };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerPlansMembershipMutations.
 * @dependencies Uses ManagerPlansApi, ManagerPlansMembershipTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerPlansMembershipMutations owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerPlansMembershipMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ManagerPlansQueryKeys.membershipOverview() });

  const activateMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansActivatePayload>) => ManagerPlansApi.activateMembership(payload, idempotencyKey), onSuccess: invalidate });
  const renewMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansRenewPayload>) => ManagerPlansApi.renewMembership(payload, idempotencyKey), onSuccess: invalidate });
  const freezeMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansFreezePayload>) => ManagerPlansApi.freezeMembership(payload, idempotencyKey), onSuccess: invalidate });

  return { activateMutation, renewMutation, freezeMutation };
}
