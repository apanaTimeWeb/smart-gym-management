'use client';// DATA FLOW: Plans API → TanStack Query → Plans list view; mutations invalidate the authoritative list.
// RESPONSIBILITY: Owns Superadmin Plans list server queries, mutation orchestration, cache invalidation and destructive confirmation.
import { useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { plansApi } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi';
import { SUPERADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_constants/SuperadminPlansQueryKeys';
import { useSuperadminPlansStore } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_store/useSuperadminPlansStore';

import type { SuperadminPlanListMutationInput } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansListMutationTypes';
import type { SuperadminPlansListDestructiveActionTarget } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansUiTypes';



/**
 * Purpose: Owns the Plans list server-state lifecycle and critical archive/delete flow.
 * Inputs: none; the hook reads module-scoped UI state and the Plans API.
 * Output: list data, query state, modal opener, mutations, and the guarded destructive action.
 * Side effects: TanStack Query invalidation and user feedback toasts after mutations.
 * Invariant: backend plan records remain TanStack Query state; Zustand owns UI-only modal state.
 */
/**
 * @description Manages plans state, queries, and UI interactions for useSuperadminPlansList.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminPlansList → consuming feature component.
export function useSuperadminPlansList() {
  const openEditModal = useSuperadminPlansStore((state) => state.openEditModal);
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeysRef = useRef(new Map<string, string>());

  const plansQuery = useQuery({
    queryKey: SUPERADMIN_PLANS_QUERY_KEYS.all,
    queryFn: () => plansApi.fetchPlans(),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => plansApi.deletePlan(id, idempotencyKey),
    onSuccess: (response, variables) => {
      toast.success(response.message, { id: 'superadmin-plan-delete-success' });
      idempotencyKeysRef.current.delete(`delete:${variables.id}`);
      idempotencyKeysRef.current.delete(`archive:${variables.id}`);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLANS_QUERY_KEYS.all });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : String(error), { id: 'superadmin-plan-delete-error' });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => plansApi.archivePlan(id, idempotencyKey),
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-plan-archive-success' });
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLANS_QUERY_KEYS.all });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : String(error), { id: 'superadmin-plan-archive-error' });
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

    const keyName = `${hasActiveTenants ? 'archive' : 'delete'}:${plan.id}`;
    idempotencyKeysRef.current.set(keyName, idempotencyKeysRef.current.get(keyName) ?? crypto.randomUUID());
    const idempotencyKey = idempotencyKeysRef.current.get(keyName) as string;
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
