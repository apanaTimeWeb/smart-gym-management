import { SupportTicketSchema } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
// RESPONSIBILITY: Modularized API client for the Tickets module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { z } from "zod";

export const ticketsApi = {
  fetchTickets: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SupportTicket[]>>(`${TicketsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SupportTicketSchema) });
  },
  fetchTicketById: (id: string) =>
    apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SupportTicketSchema }),
  updateTicket: (id: string, body: Partial<SupportTicket>) =>
    apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: SupportTicketSchema
    }),
  closeTicket: (id: string) =>
    apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}/close`, {
      method: 'POST',
        dataSchema: SupportTicketSchema
    }),

  replyToTicket: (id: string, content: string) =>
    apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      dataSchema: SupportTicketSchema,
    }),
  assignTicket: (id: string, assignee: string) =>
    apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ assignee }),
        dataSchema: SupportTicketSchema
    }),
};
