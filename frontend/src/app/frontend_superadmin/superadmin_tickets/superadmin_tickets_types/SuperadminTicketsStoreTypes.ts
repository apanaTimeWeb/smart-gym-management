/**
 * @description Feature-owned store type contract for the module.
 * @dependencies Consumed by the owning Zustand store and feature hooks only.
 * @edge-case Keep state serializable and UI-only; server data belongs to TanStack Query.
 */
// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Tickets feature.
import { SUPERADMIN_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';

import type { TicketPriority, TicketStatus } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';



export interface SuperadminTicketsState {
  search: string;
  setSearch: (search: string) => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  statusFilter: TicketStatus | typeof SUPERADMIN_TICKETS_ALL_FILTER;
  setStatusFilter: (status: TicketStatus | typeof SUPERADMIN_TICKETS_ALL_FILTER) => void;
  priorityFilter: TicketPriority | typeof SUPERADMIN_TICKETS_ALL_FILTER;
  setPriorityFilter: (priority: TicketPriority | typeof SUPERADMIN_TICKETS_ALL_FILTER) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  replyModalTicketId: string | null;
  setReplyModalTicketId: (id: string | null) => void;
  assignModalTicketId: string | null;
  setAssignModalTicketId: (id: string | null) => void;
}
