// DATA FLOW: Reply form → validated reply mutation → ticket API/MSW → updated ticket message list → query reconciliation.
/**
 * Owns the Superadmin ticket reply mutation and keeps list/detail server state coherent.
 * It accepts validated reply text, exposes the authoritative API response message, and
 * invalidates ticket queries so the next read includes the new message.
 */
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { replyToTicket } from '@/app/superadmin/tickets/tickets_api/SuperadminTicketsApi';
import { replySchema } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import type { SuperadminTicketsReplyFormValues } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsReplyFormTypes';

/** Owns ticket reply mutations, including payload validation and detail/list cache invalidation. */
/** Purpose: Owns the useSuperadminTicketReply data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminTicketReply() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ ticketId, values }: { ticketId: string; values: SuperadminTicketsReplyFormValues }) => replyToTicket(ticketId, replySchema.parse(values).replyText),
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'tickets'] });
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'tickets', 'detail', variables.ticketId] });
    },
  });
  return {
    sendReply: mutation.mutateAsync,
    isSending: mutation.isPending,
    error: mutation.error,
  };
}
