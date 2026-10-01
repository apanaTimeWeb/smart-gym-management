// RESPONSIBILITY: Owns outbound tenant-message mutation, idempotency, and message-list cache reconciliation.
'use client';

import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_query_keys/SuperadminMessagingQueryKeys';
import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';

// DATA FLOW: API / URL state / module client state → useRef → superadmin_messaging view components.
/**
 * Purpose: Dedicated mutation boundary for sending a Superadmin tenant message.
 * Inputs: validated message payload from the compose form.
 * Output: mutation state and mutateAsync.
 * Side effects: one idempotency key per send intent and targeted message-list invalidation.
 * Invariant: the page/query hook does not instantiate TanStack mutations.
 */
/**
 * @description Sends a tenant-scoped messaging request through the feature API and reconciles server state.
 * @dependencies Uses the messaging API facade, idempotency-key lifecycle, and TanStack Query cache.
 * @edge-case Keeps one key per send intent, surfaces safe failure handling, and invalidates affected lists only after authoritative success.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminMessagingSendMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin messaging send mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminMessagingSendMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  return useMutation({
    mutationFn: async (payload: Parameters<typeof superadminMessagingApi.sendMessage>[0]) => {
      const idempotencyKey = idempotencyKeyRef.current ?? (idempotencyKeyRef.current = crypto.randomUUID());
      const response = await superadminMessagingApi.sendMessage(payload, idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: () => {
      idempotencyKeyRef.current = null;
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.messages });
    },
  });
}
