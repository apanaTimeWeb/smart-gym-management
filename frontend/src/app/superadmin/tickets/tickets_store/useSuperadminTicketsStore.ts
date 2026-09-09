// RESPONSIBILITY: Zustand store for Superadmin Tickets UI state (filters, pagination, modals)
import { create } from 'zustand';
import type { TicketStatus, TicketPriority } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';

interface SuperadminTicketsState {
  search: string;
  setSearch: (search: string) => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  statusFilter: TicketStatus | 'ALL';
  setStatusFilter: (status: TicketStatus | 'ALL') => void;
  priorityFilter: TicketPriority | 'ALL';
  setPriorityFilter: (priority: TicketPriority | 'ALL') => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  replyModalTicketId: string | null;
  setReplyModalTicketId: (id: string | null) => void;
  assignModalTicketId: string | null;
  setAssignModalTicketId: (id: string | null) => void;
}

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
