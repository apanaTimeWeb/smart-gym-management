'use client';
/** Coordinates the Manager / feature. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerPlansMembershipApi } from '@/app/manager/plans/plans_api/ManagerPlansMembershipApi';
import type { ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';

type ManagerPlansMembershipMutationInput<TPayload> = { payload: TPayload; idempotencyKey: string };

export function useManagerPlansMembershipMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'membership-overview'] });

  const activateMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansActivatePayload>) => managerPlansMembershipApi.activateMembership(payload, idempotencyKey), onSuccess: invalidate });
  const renewMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansRenewPayload>) => managerPlansMembershipApi.renewMembership(payload, idempotencyKey), onSuccess: invalidate });
  const freezeMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerPlansMembershipMutationInput<ManagerPlansFreezePayload>) => managerPlansMembershipApi.freezeMembership(payload, idempotencyKey), onSuccess: invalidate });

  return { activateMutation, renewMutation, freezeMutation };
}
