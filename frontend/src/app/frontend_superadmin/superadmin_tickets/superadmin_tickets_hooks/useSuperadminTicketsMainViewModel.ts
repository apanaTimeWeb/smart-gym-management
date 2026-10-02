'use client';import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';
import { useSuperadminTickets } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTickets';
import { useSuperadminTicketsTicketMutations } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketMutations';
import { useSuperadminTicketsStore } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_store/useSuperadminTicketsStore';



// DATA FLOW: API / URL state / module client state → useState → superadmin_tickets view components.
/**
 * @description Owns ticket page form state, modal state, dialog accessibility, query state, and mutation callbacks for the Main view.
 * @dependencies Delegates server state to feature query/mutation hooks and shared session/dialog infrastructure to approved global hooks.
 * @edge-case Assignment modal state is reset on cancel or after successful assignment; repeated assignment is blocked while the mutation is pending.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminTicketsMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin tickets main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminTicketsMainViewModel() {
  const t = useTranslations('superadmin_tickets');
  const [assigneeInput, setAssigneeInput] = useState('');
  const query = useSuperadminTickets();
  const mutations = useSuperadminTicketsTicketMutations();
  const store = useSuperadminTicketsStore();
  const assignDialogRef = useSuperadminLayoutDialogA11y(Boolean(store.assignModalTicketId), () => {
    if (mutations.isAssigning) return;
    store.setAssignModalTicketId(null);
    setAssigneeInput('');
  });

  const handleCloseTicket = async (ticketId: string): Promise<void> => {
    await mutations.closeTicket(ticketId);
  };

  const handleOpenAssign = (ticketId: string): void => {
    setAssigneeInput('');
    store.setAssignModalTicketId(ticketId);
  };

  const handleConfirmAssign = async (): Promise<void> => {
    const ticketId = store.assignModalTicketId;
    if (!ticketId || !assigneeInput.trim() || mutations.isAssigning) return;
    await mutations.assignTicket({ ticketId, input: { assignee: assigneeInput } });
    store.setAssignModalTicketId(null);
    setAssigneeInput('');
  };

  return {
    t,
    ...query,
    ...store,
    ...mutations,
    assigneeInput,
    setAssigneeInput,
    assignDialogRef,
    handleCloseTicket,
    handleOpenAssign,
    handleConfirmAssign,
  };
}
