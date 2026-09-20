// DATA FLOW: URL filter → Superadmin Gyms API → TanStack Query → V1 controls/table; mutations invalidate authoritative V1 data.
// RESPONSIBILITY: Owns URL-backed tenant filter state and bulk-action mutation orchestration for the V1 business-controls feature.
'use client';

import { useMemo, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchGymsBusinessControls, updateGymsBulkAction } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsBusinessControlsApi';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUrlState } from '@/hooks/useUrlState';
import type { SuperadminGymsV1BulkAction, SuperadminGymsV1BulkMutationRequest } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

/**
 * Purpose: Owns V1 tenant filter state in the URL and server-state for bulk tenant actions.
 * Inputs: current query-string filter; bulk requests include selected tenant IDs and an optional target plan.
 * Output: query state plus filter setter and a confirmation-guarded bulk action function.
 * Side effects: TanStack Query invalidation and backend-message toasts after bulk mutations.
 * Invariant: tenant rows remain server state and are never copied into Zustand/local business state.
 */
export function useSuperadminGymsV1() {
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const { getParam, setParam } = useUrlState();
  const filterKey = getParam('v1Filter', 'all');
  const queryParams = useMemo(() => ({ filter: filterKey }), [filterKey]);

  const query = useQuery({
    queryKey: ['superadmin', 'gyms_business_controls', queryParams],
    queryFn: () => fetchGymsBusinessControls(queryParams),
  });

  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getBulkIntentKey = (action: SuperadminGymsV1BulkAction, gymIds: string[], targetPlan?: string) => {
    const intentKey = JSON.stringify([action, [...gymIds].sort(), targetPlan ?? null]);
    const existing = idempotencyKeysRef.current.get(intentKey);
    if (existing) return { intentKey, key: existing };
    const key = crypto.randomUUID();
    idempotencyKeysRef.current.set(intentKey, key);
    return { intentKey, key };
  };

  const bulkMutation = useMutation({
    mutationFn: ({ body, idempotencyKey }: { body: SuperadminGymsV1BulkMutationRequest; idempotencyKey: string }) => updateGymsBulkAction(body, idempotencyKey),
    onSuccess: (response, variables) => {
      const intentKey = JSON.stringify([variables.body.action, [...variables.body.gymIds].sort(), variables.body.targetPlan ?? null]);
      idempotencyKeysRef.current.delete(intentKey);
      toast.success(response.message, { id: 'superadmin-gyms-v1-bulk-success' });
      void queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms_business_controls'] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-gyms-v1-bulk-error' });
    },
  });

  const setFilterKey = (value: string) => setParam('v1Filter', value);
  const executeBulkAction = async (action: SuperadminGymsV1BulkAction, gymIds: string[], targetPlan?: string) => {
    if (gymIds.length === 0) return;
    const critical = action === 'Suspend selected' || action === 'Extend trial' || action === 'Move plan';
    if (critical) {
      const confirmed = await confirm({
        title: `${action}`,
        message: `Apply "${action}" to ${gymIds.length} selected tenant${gymIds.length === 1 ? '' : 's'}?`,
        type: action === 'Suspend selected' ? 'danger' : 'warning',
        confirmText: 'Continue',
      });
      if (!confirmed) return;
    }
    const body: SuperadminGymsV1BulkMutationRequest = { action, gymIds, ...(targetPlan ? { targetPlan } : {}) };
    const { key: idempotencyKey } = getBulkIntentKey(action, gymIds, targetPlan);
    await bulkMutation.mutateAsync({ body, idempotencyKey });
  };

  return { query, filterKey, setFilterKey, executeBulkAction, isBulkPending: bulkMutation.isPending };
}
