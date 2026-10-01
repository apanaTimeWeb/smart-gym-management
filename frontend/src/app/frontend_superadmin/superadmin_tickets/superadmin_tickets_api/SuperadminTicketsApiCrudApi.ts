import { SuperadminTicketsListDataSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SupportTicketSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';
import { SuperadminTicketsUrlConfig } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';

import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';
import type { ApiResponse } from '@/lib/api';

export const ticketsApi = {
    fetchTickets: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SupportTicket[]>>(`${SuperadminTicketsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminTicketsListDataSchema });
    },
    fetchTicketById: (id: string) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminTicketsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SupportTicketSchema }),
    updateTicket: (id: string, body: Partial<SupportTicket>, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminTicketsUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    closeTicket: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(SuperadminTicketsUrlConfig.BACKEND_API.CLOSE(id), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    assignTicket: (id: string, assignee: string, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(SuperadminTicketsUrlConfig.BACKEND_API.ASSIGN(id), {
        method: 'POST',
        body: JSON.stringify({ assignee }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
};

export async function replyToTicket(id: string, replyText: string, idempotencyKey: string): Promise<ApiResponse<SupportTicket>> {
    return apiFetch<ApiResponse<SupportTicket>>(`${SuperadminTicketsUrlConfig.BACKEND_API.BASE}/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ replyText }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema,
    });
}
