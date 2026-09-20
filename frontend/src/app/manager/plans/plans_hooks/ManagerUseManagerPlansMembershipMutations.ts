// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import type { ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';


type ManagerPlansMembershipMutationInput<TPayload> = { payload: TPayload; idempotencyKey: string };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerPlansMembershipMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'membership-overview'] });

  const activateMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansActivatePayload>) => plansApi.activateMembership(payload, idempotencyKey), onSuccess: invalidate });
  const renewMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansRenewPayload>) => plansApi.renewMembership(payload, idempotencyKey), onSuccess: invalidate });
  const freezeMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansFreezePayload>) => plansApi.freezeMembership(payload, idempotencyKey), onSuccess: invalidate });

  return { activateMutation, renewMutation, freezeMutation };
}
