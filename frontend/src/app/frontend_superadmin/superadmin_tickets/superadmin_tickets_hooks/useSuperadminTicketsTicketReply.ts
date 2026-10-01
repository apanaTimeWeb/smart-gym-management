'use client';
// DATA FLOW: Reply form → validated reply mutation → ticket API/MSW → updated ticket message list → query reconciliation.
/**
 * Owns the Superadmin ticket reply mutation and keeps list/detail server state coherent.
 * It accepts validated reply text, exposes the authoritative API response message, and
 * invalidates ticket queries so the next read includes the new message.
 */
import { useRef } from 'react';

import { SUPERADMIN_TICKETS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_query_keys/SuperadminTicketsQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { replyToTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { replySchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';

import type { SuperadminTicketsReplyFormValues } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsReplyFormTypes';

/** Owns ticket reply mutations, including payload validation and detail/list cache invalidation. */
/** Purpose: Owns the useSuperadminTicketsTicketReply data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminTicketsTicketReply() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: SuperadminTicketsReplyFormValues }) => {
      const validated = replySchema.parse(values);
      idempotencyKeyRef.current ??= crypto.randomUUID();
      return replyToTicket(id, validated.replyText, idempotencyKeyRef.current);
    },
    onSuccess: async (_response, variables) => {
      if (!_response.success) throw new Error(_response.message);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_TICKETS_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_TICKETS_QUERY_KEYS.detail(variables.id) });
      idempotencyKeyRef.current = null;
    },
  });
  return {
    sendReply: mutation.mutateAsync,
    isSending: mutation.isPending,
    error: mutation.error,
  };
}
