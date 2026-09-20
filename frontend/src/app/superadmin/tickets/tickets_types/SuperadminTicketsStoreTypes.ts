// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Tickets feature.
import type { TicketPriority, TicketStatus } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';

export interface SuperadminTicketsState {
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
