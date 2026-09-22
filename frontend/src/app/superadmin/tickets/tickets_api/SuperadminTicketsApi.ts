import { SupportTicketSchema } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
// RESPONSIBILITY: Modularized API client for the Tickets module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SupportTicket } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { z } from "zod";
export const ticketsApi = {
    fetchTickets: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SupportTicket[]>>(`${TicketsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SupportTicketSchema) });
    },
    fetchTicketById: (id: string) => apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SupportTicketSchema }),
    updateTicket: (id: string, body: Partial<SupportTicket>, idempotencyKey?: string) => apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SupportTicketSchema
    }),
    closeTicket: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<SupportTicket>>(TicketsUrlConfig.BACKEND_API.CLOSE(id), {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SupportTicketSchema
    }),
    assignTicket: (id: string, assignee: string, idempotencyKey?: string) => apiFetch<ApiResponse<SupportTicket>>(TicketsUrlConfig.BACKEND_API.ASSIGN(id), {
        method: 'POST',
        body: JSON.stringify({ assignee }),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SupportTicketSchema
    }),
};

export async function replyToTicket(id: string, replyText: string, idempotencyKey?: string): Promise<ApiResponse<SupportTicket>> {
    return apiFetch<ApiResponse<SupportTicket>>(`${TicketsUrlConfig.BACKEND_API.BASE}/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ replyText }),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SupportTicketSchema,
    });
}
