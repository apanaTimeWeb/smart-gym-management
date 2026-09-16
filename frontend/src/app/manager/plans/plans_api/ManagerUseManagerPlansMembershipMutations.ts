import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerPlansMembershipApi } from '@/app/manager/plans/plans_api/ManagerPlansMembershipApi';
import type { ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';

export function useManagerPlansMembershipMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['manager', 'plans', 'membership-overview'] });

  const activateMutation = useMutation({ mutationFn: (payload: ManagerPlansActivatePayload) => managerPlansMembershipApi.activateMembership(payload), onSuccess: invalidate });
  const renewMutation = useMutation({ mutationFn: (payload: ManagerPlansRenewPayload) => managerPlansMembershipApi.renewMembership(payload), onSuccess: invalidate });
  const freezeMutation = useMutation({ mutationFn: (payload: ManagerPlansFreezePayload) => managerPlansMembershipApi.freezeMembership(payload), onSuccess: invalidate });

  return { activateMutation, renewMutation, freezeMutation };
}
