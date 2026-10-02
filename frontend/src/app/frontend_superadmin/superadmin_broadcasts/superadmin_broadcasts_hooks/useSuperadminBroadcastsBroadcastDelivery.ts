'use client';
// DATA FLOW: Queue recipient → validated delivery mutation → Broadcasts API/MSW → mutable delivery state → refreshed broadcast result.
/**
 * Owns the Superadmin broadcast recipient-delivery mutation.
 * Input: a broadcast ID and tenant-recipient ID. Output: the validated delivery response.
 * Side effect: the feature server-state cache is invalidated so delivery counters remain authoritative.
 * Invariant: delivery behavior stays inside the broadcasts feature; it never writes notification state directly.
 */
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deliverBroadcastToRecipient } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi';
import { SUPERADMIN_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsQueryKeys';

import type { SuperadminBroadcastDeliveryResult } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastDeliveryTypes';
import type { ApiResponse } from '@/lib/api';



/** Owns recipient delivery mutations for Broadcasts and reconciles the relevant query caches. */
/** Purpose: Owns the useSuperadminBroadcastsBroadcastDelivery data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminBroadcastsBroadcastDelivery.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBroadcastsBroadcastDelivery → consuming feature component.
export function useSuperadminBroadcastsBroadcastDelivery() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const mutation = useMutation({
    mutationFn: async ({ broadcastId, recipientId, idempotencyKey }: { broadcastId: string; recipientId: string; idempotencyKey: string }) => {
      const response = await deliverBroadcastToRecipient(broadcastId, recipientId, idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.detail(variables.broadcastId) });
      idempotencyKeysRef.current.delete(`${variables.broadcastId}:${variables.recipientId}`);
    },
  });
  const deliverRecipient = (variables: { broadcastId: string; recipientId: string }) => {
    const intentKey = `${variables.broadcastId}:${variables.recipientId}`;
    const idempotencyKey = idempotencyKeysRef.current.get(intentKey) ?? crypto.randomUUID();
    idempotencyKeysRef.current.set(intentKey, idempotencyKey);
    return mutation.mutateAsync({ ...variables, idempotencyKey }) as Promise<ApiResponse<SuperadminBroadcastDeliveryResult>>;
  };
  return {
    deliverRecipient,
    isDelivering: mutation.isPending,
    deliveryError: mutation.error,
  };
}
