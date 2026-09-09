// RESPONSIBILITY: Custom hook for managing the logic of the Support Tickets page
// DATA FLOW: API -> useSuperadminTicketsData -> useSuperadminTickets -> SuperadminTicketsClient

import { useSuperadminTicketsData } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketsData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
import { useSuperadminTicketsStore } from '@/app/superadmin/tickets/tickets_store/useSuperadminTicketsStore';
import { MOCK_TICKETS } from '@/app/superadmin/tickets/tickets_utils/SuperadminTicketsConstants';

const IS_DEV = process.env.NODE_ENV === 'development';
const ITEMS_PER_PAGE = 10;

export function useSuperadminTickets() {
  const { data: apiTickets, fetchState, error } = useSuperadminTicketsData<SupportTicket[]>(SuperadminUrlConfig.BACKEND_API.TICKETS_BASE);

  const {
    search,
    statusFilter,
    priorityFilter,
    currentPage,
  } = useSuperadminTicketsStore();

  // Use mock data in development when API returns empty or null
  const tickets: SupportTicket[] = (() => {
    if (apiTickets && (apiTickets as SupportTicket[]).length > 0) return apiTickets as SupportTicket[];
    return IS_DEV ? MOCK_TICKETS : [];
  })();

  const filtered = tickets.filter(t => {
    const matchesSearch = t.tenantName?.toLowerCase().includes(search.toLowerCase()) ||
                          t.subject?.toLowerCase().includes(search.toLowerCase()) ||
                          t.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedTickets = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return {
    fetchState,
    error,
    totalPages,
    paginatedTickets,
  };
}
