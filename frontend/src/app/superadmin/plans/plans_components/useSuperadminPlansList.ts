// DATA FLOW: Plans API → TanStack Query → Plans list view; mutations invalidate the authoritative list.
// RESPONSIBILITY: Owns Superadmin Plans list server queries, mutation orchestration, cache invalidation and destructive confirmation.
'use client';

import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '@/app/superadmin/plans/plans_api/SuperadminPlansApi';
import { useSuperadminPlansStore } from '@/app/superadmin/plans/plans_store/useSuperadminPlansStore';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import type { SuperadminPlanListMutationInput } from '@/app/superadmin/plans/plans_types/SuperadminPlansListMutationTypes';
import type { SuperadminPlansListDestructiveActionTarget } from '@/app/superadmin/plans/plans_types/SuperadminPlansUiTypes';

/**
 * Purpose: Owns the Plans list server-state lifecycle and critical archive/delete flow.
 * Inputs: none; the hook reads module-scoped UI state and the Plans API.
 * Output: list data, query state, modal opener, mutations, and the guarded destructive action.
 * Side effects: TanStack Query invalidation and user feedback toasts after mutations.
 * Invariant: backend plan records remain TanStack Query state; Zustand owns UI-only modal state.
 */
export function useSuperadminPlansList() {
  const openEditModal = useSuperadminPlansStore((state) => state.openEditModal);
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();

  const plansQuery = useQuery({
    queryKey: ['superadmin', 'plans'],
    queryFn: () => plansApi.fetchPlans(),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => plansApi.deletePlan(id, idempotencyKey),
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-plan-delete-success' });
      void queryClient.invalidateQueries({ queryKey: ['superadmin', 'plans'] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-plan-delete-error' });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => plansApi.archivePlan(id, idempotencyKey),
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-plan-archive-success' });
      void queryClient.invalidateQueries({ queryKey: ['superadmin', 'plans'] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-plan-archive-error' });
    },
  });

  const confirmPlanDestructiveAction = async (plan: SuperadminPlansListDestructiveActionTarget) => {
    const hasActiveTenants = (plan.activeTenants ?? 0) > 0;
    const confirmed = await confirm(
      hasActiveTenants
        ? {
            title: 'Cannot Delete Active Plan',
            message: `"${plan.name}" has ${plan.activeTenants} active tenants. Archive it instead to hide it from new signups while keeping existing tenants.`,
            type: 'warning',
            confirmText: 'Archive Plan',
          }
        : {
            title: 'Delete Plan',
            message: `Delete "${plan.name}"? This cannot be undone.`,
            type: 'danger',
            confirmText: 'Delete',
          },
    );
    if (!confirmed) return;

    const idempotencyKey = crypto.randomUUID();
    if (hasActiveTenants) {
      archiveMutation.mutate({ id: plan.id, idempotencyKey });
      return;
    }
    deleteMutation.mutate({ id: plan.id, idempotencyKey });
  };

  return {
    plans: plansQuery.data?.data ?? [],
    isPending: plansQuery.isPending,
    isError: plansQuery.isError,
    openEditModal,
    deleteMutation,
    archiveMutation,
    confirmPlanDestructiveAction,
  };
}
