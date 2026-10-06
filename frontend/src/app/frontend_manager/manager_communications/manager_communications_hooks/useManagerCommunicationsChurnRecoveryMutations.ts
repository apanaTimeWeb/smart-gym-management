'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/frontend_manager/manager_communications/manager_communications_api/ManagerCommunicationsApi';
import { ManagerCommunicationsQueryKeys } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsQueryKeys';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import type { CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsChurnRecoveryMutations.
 * @dependencies Uses ManagerIdempotency, ManagerCommunicationsApi, ManagerToastService, ManagerCommunicationsTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsChurnRecoveryMutations owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsChurnRecoveryMutations(closeComposer: () => void) {
  const qc = useQueryClient();
  const winBackIntentRef = useRef<{ signature: string; key: string } | null>(null);

  const winBackMutation = useMutation({
    mutationFn: (payload: {
      memberId: string;
      memberName: string;
      phone: string;
      email: string;
      channel: CommChannel;
      templateTier: WinBackTemplateTier;
      message: string;
      subject: string;
      idempotencyKey: string;
    }) => ManagerCommunicationsApi.sendWinBackMessage(payload),
    onSuccess: (res, variables) => {
      if (winBackIntentRef.current?.key === variables.idempotencyKey) winBackIntentRef.current = null;
      showManagerSuccessToast(res.message, 'manager-churn-winback-success');
      closeComposer();
      qc.invalidateQueries({ queryKey: ManagerCommunicationsQueryKeys.all });
    },
    onError: (err) => showManagerErrorToast(err, 'manager-communications-churn-error') });

  const sendWinBackMessage = (payload: Omit<Parameters<typeof ManagerCommunicationsApi.sendWinBackMessage>[0], 'idempotencyKey'>) => {
    const signature = JSON.stringify(payload);
    const current = winBackIntentRef.current;
    const key = current?.signature === signature ? current.key : createManagerIdempotencyKey();
    winBackIntentRef.current = { signature, key };
    winBackMutation.mutate({ ...payload, idempotencyKey: key });
  };

  return { winBackMutation, sendWinBackMessage };
}
