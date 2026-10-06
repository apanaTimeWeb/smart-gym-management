'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/frontend_manager/manager_communications/manager_communications_api/ManagerCommunicationsApi';
import { ManagerCommunicationsQueryKeys } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsQueryKeys';

import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import type { CommFormValues, CommAutomation } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsMutations.
 * @dependencies Uses ManagerIdempotency, ManagerCommunicationsApi, ManagerToastService, ManagerCommunicationsTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsMutations owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsMutations() {
  const qc = useQueryClient();
  const sendIntentRef = useRef<{ signature: string; key: string } | null>(null);
  const automationIntentRef = useRef(new Map<string, { signature: string; key: string }>());

  const sendMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CommFormValues & { recipientCount: number; segmentLabel: string }; idempotencyKey: string }) => ManagerCommunicationsApi.sendCampaign(payload, idempotencyKey),
    onSuccess: (res, variables) => {
      if (sendIntentRef.current?.key === variables.idempotencyKey) sendIntentRef.current = null;
      showManagerSuccessToast(res.message, 'manager-communications-campaign-success');
      qc.invalidateQueries({ queryKey: ManagerCommunicationsQueryKeys.all });
    },
    onError: (err: unknown) => showManagerErrorToast(err, 'manager-communications-campaign-error'),
  });

  const automationMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<CommAutomation>; idempotencyKey: string }) => ManagerCommunicationsApi.updateAutomation(id, payload, idempotencyKey),
    onSuccess: (res, variables) => {
      const intent = automationIntentRef.current.get(variables.id);
      if (intent?.key === variables.idempotencyKey) automationIntentRef.current.delete(variables.id);
      qc.invalidateQueries({ queryKey: ManagerCommunicationsQueryKeys.automations() });
      showManagerSuccessToast(res.message, 'manager-communications-automation-success');
    },
    onError: (err: unknown) => showManagerErrorToast(err, 'manager-communications-automation-error'),
  });

  const sendCampaign = (payload: CommFormValues & { recipientCount: number; segmentLabel: string }) => {
    const signature = JSON.stringify(payload);
    const current = sendIntentRef.current;
    const key = current?.signature === signature ? current.key : createManagerIdempotencyKey();
    sendIntentRef.current = { signature, key };
    sendMutation.mutate({ payload, idempotencyKey: key });
  };

  const updateAutomation = (id: string, payload: Partial<CommAutomation>) => {
    const signature = JSON.stringify(payload);
    const current = automationIntentRef.current.get(id);
    const key = current?.signature === signature ? current.key : createManagerIdempotencyKey();
    automationIntentRef.current.set(id, { signature, key });
    automationMutation.mutate({ id, payload, idempotencyKey: key });
  };

  return { sendMutation, automationMutation, sendCampaign, updateAutomation };
}
