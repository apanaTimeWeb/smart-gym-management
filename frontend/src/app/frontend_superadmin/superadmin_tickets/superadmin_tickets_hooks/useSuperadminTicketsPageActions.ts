'use client';
// DATA FLOW: Ticket UI action → ticket mutation hook → authoritative response/cache → visible table/modal state.
// RESPONSIBILITY: Owns close/assign workflows for the root Tickets view.
import { useSuperadminTicketsTicketMutations } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketMutations';

/**
 * @description Owns ticket mutation orchestration so the root view only composes the table and modal states.
 * @dependencies Uses the feature-owned ticket mutation hook and its Query reconciliation contract.
 * @edge-case Duplicate assign clicks are rejected while the mutation is pending.
 */
export function useSuperadminTicketsPageActions() {
  const mutations = useSuperadminTicketsTicketMutations();
  const handleCloseTicket = async (ticketId: string) => { await mutations.closeTicket(ticketId); };
  const handleConfirmAssign = async (ticketId: string, assignee: string) => {
    if (!assignee.trim() || mutations.isAssigning) return false;
    await mutations.assignTicket({ ticketId, input: { assignee: assignee.trim() } });
    return true;
  };
  return { ...mutations, handleCloseTicket, handleConfirmAssign };
}
