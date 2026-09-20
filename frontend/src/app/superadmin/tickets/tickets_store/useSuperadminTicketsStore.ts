// DATA FLOW: feature API/schema → hook/context → useSuperadminTicketsStore consumers.
// RESPONSIBILITY: Zustand store for Superadmin Tickets UI state (filters, pagination, modals)
import { create } from 'zustand';
import type { TicketStatus, TicketPriority } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import type { SuperadminTicketsState } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsStoreTypes';
/**
 * Purpose: Zustand store for Superadmin Tickets UI state (filters, pagination, modals).
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminTicketsStore = create<SuperadminTicketsState>((set) => ({
    search: '',
    setSearch: (search) => set({ search, currentPage: 1 }),
    showFilter: false,
    setShowFilter: (showFilter) => set({ showFilter }),
    statusFilter: 'ALL',
    setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
    priorityFilter: 'ALL',
    setPriorityFilter: (priorityFilter) => set({ priorityFilter, currentPage: 1 }),
    currentPage: 1,
    setCurrentPage: (currentPage) => set({ currentPage }),
    replyModalTicketId: null,
    setReplyModalTicketId: (replyModalTicketId) => set({ replyModalTicketId }),
    assignModalTicketId: null,
    setAssignModalTicketId: (assignModalTicketId) => set({ assignModalTicketId }),
}));
