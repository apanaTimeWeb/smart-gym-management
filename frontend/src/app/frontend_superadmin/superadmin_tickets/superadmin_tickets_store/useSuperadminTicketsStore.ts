import { SUPERADMIN_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';
// DATA FLOW: feature API/schema → hook/context → useSuperadminTicketsStore consumers.
// RESPONSIBILITY: Zustand store for Superadmin Tickets UI state (filters, pagination, modals)
import { create } from 'zustand';

import type { SuperadminTicketsState } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsStoreTypes';
import type { TicketStatus, TicketPriority } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';

/**
 * Purpose: Zustand store for Superadmin Tickets UI state (filters, pagination, modals).
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Zustand store for Superadmin Tickets UI state (filters, pagination, modals).
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export const useSuperadminTicketsStore = create<SuperadminTicketsState>((set) => ({
    search: '',
    setSearch: (search) => set({ search, currentPage: 1 }),
    showFilter: false,
    setShowFilter: (showFilter) => set({ showFilter }),
    statusFilter: SUPERADMIN_TICKETS_ALL_FILTER,
    setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
    priorityFilter: SUPERADMIN_TICKETS_ALL_FILTER,
    setPriorityFilter: (priorityFilter) => set({ priorityFilter, currentPage: 1 }),
    currentPage: 1,
    setCurrentPage: (currentPage) => set({ currentPage }),
    replyModalTicketId: null,
    setReplyModalTicketId: (replyModalTicketId) => set({ replyModalTicketId }),
    assignModalTicketId: null,
    setAssignModalTicketId: (assignModalTicketId) => set({ assignModalTicketId }),
}));
