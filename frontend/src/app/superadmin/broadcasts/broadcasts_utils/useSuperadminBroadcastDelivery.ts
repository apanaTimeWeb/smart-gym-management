// DATA FLOW: Queue recipient → validated delivery mutation → Broadcasts API/MSW → mutable delivery state → refreshed broadcast result.
/**
 * Owns the Superadmin broadcast recipient-delivery mutation.
 * Input: a broadcast ID and tenant-recipient ID. Output: the validated delivery response.
 * Side effect: the feature server-state cache is invalidated so delivery counters remain authoritative.
 * Invariant: delivery behavior stays inside the broadcasts feature; it never writes notification state directly.
 */
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliverBroadcastToRecipient } from '@/app/superadmin/broadcasts/broadcasts_api/SuperadminBroadcastsApi';
import type { SuperadminBroadcastDeliveryResult } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastDeliveryTypes';
import type { ApiResponse } from '@/lib/api';

/** Owns recipient delivery mutations for Broadcasts and reconciles the relevant query caches. */
export function useSuperadminBroadcastDelivery() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ broadcastId, recipientId, idempotencyKey }: { broadcastId: string; recipientId: string; idempotencyKey: string }) => deliverBroadcastToRecipient(broadcastId, recipientId, idempotencyKey),
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'broadcasts'] });
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'broadcasts', 'detail', variables.broadcastId] });
    },
  });
  return {
    deliverRecipient: mutation.mutateAsync as (variables: { broadcastId: string; recipientId: string; idempotencyKey: string }) => Promise<ApiResponse<SuperadminBroadcastDeliveryResult>>,
    isDelivering: mutation.isPending,
    deliveryError: mutation.error,
  };
}
