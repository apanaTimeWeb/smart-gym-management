'use client';
// DATA FLOW: Inputs enter useSuperadminTicketsTicketMutations, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Superadmin ticket close and assignment mutations; UI components consume only typed mutation actions.
import { useRef } from 'react';

import { SUPERADMIN_TICKETS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_query_keys/SuperadminTicketsQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { TicketAssigneeInputSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';

import type { TicketAssigneeInput } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';

/**
 * Purpose: Own close and assignment server mutations for the Tickets feature.
 * Inputs: validated ticket identifiers and assignee values.
 * Output: mutation actions, pending flags, and last errors.
 * Side effects: reconciles the module's list/detail Query cache after success.
 * Invariant: no ticket server state is owned by Zustand or component-local state.
 
 * @description Own close and assignment server mutations for the Tickets feature.
 * @dependencies validated ticket identifiers and assignee values.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminTicketsTicketMutations() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getKey = (scope: string) => idempotencyKeysRef.current.get(scope) ?? (() => { const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, key); return key; })();
  const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
  const reconcile = async (ticketId: string) => {
    await queryClient.invalidateQueries({ queryKey: SUPERADMIN_TICKETS_QUERY_KEYS.all });
    await queryClient.invalidateQueries({ queryKey: SUPERADMIN_TICKETS_QUERY_KEYS.detail(ticketId) });
  };
  const closeMutation = useMutation({
    mutationFn: (ticketId: string) => ticketsApi.closeTicket(ticketId, getKey(`close:${ticketId}`)),
    onSuccess: async (response, ticketId) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await reconcile(ticketId); clearKey(`close:${ticketId}`);
    },
  });
  const assignMutation = useMutation({
    mutationFn: async ({ ticketId, input }: { ticketId: string; input: TicketAssigneeInput }) => {
      const validated = TicketAssigneeInputSchema.parse(input);
      return ticketsApi.assignTicket(ticketId, validated.assignee, getKey(`assign:${ticketId}`));
    },
    onSuccess: async (response, variables) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await reconcile(variables.ticketId); clearKey(`assign:${variables.ticketId}`);
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
