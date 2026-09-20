// DATA FLOW: Inputs enter useSuperadminTicketMutations, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Superadmin ticket close and assignment mutations; UI components consume only typed mutation actions.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsApi } from '@/app/superadmin/tickets/tickets_api/SuperadminTicketsApi';
import { TicketAssigneeInputSchema, type TicketAssigneeInput } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';

/**
 * Purpose: Own close and assignment server mutations for the Tickets feature.
 * Inputs: validated ticket identifiers and assignee values.
 * Output: mutation actions, pending flags, and last errors.
 * Side effects: reconciles the module's list/detail Query cache after success.
 * Invariant: no ticket server state is owned by Zustand or component-local state.
 */
export function useSuperadminTicketMutations() {
  const queryClient = useQueryClient();
  const reconcile = async (ticketId: string) => {
    await queryClient.invalidateQueries({ queryKey: ['superadmin', 'tickets'] });
    await queryClient.invalidateQueries({ queryKey: ['superadmin', 'tickets', 'detail', ticketId] });
  };
  const closeMutation = useMutation({
    mutationFn: (ticketId: string) => ticketsApi.closeTicket(ticketId),
    onSuccess: async (response, ticketId) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await reconcile(ticketId);
    },
  });
  const assignMutation = useMutation({
    mutationFn: async ({ ticketId, input }: { ticketId: string; input: TicketAssigneeInput }) => {
      const validated = TicketAssigneeInputSchema.parse(input);
      return ticketsApi.assignTicket(ticketId, validated.assignee);
    },
    onSuccess: async (response, variables) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await reconcile(variables.ticketId);
    },
  });
  return {
    closeTicket: closeMutation.mutateAsync,
    isClosing: closeMutation.isPending,
    closeError: closeMutation.error,
    assignTicket: assignMutation.mutateAsync,
    isAssigning: assignMutation.isPending,
    assignError: assignMutation.error,
  };
}
