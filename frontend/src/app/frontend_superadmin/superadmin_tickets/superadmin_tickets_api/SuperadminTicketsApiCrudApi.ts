import { SuperadminTicketsListDataSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsApiSchema';
import { SupportTicketSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminTicketsApiCrudApi owned by the superadmin_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_TICKETS_API } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';

import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';
import type { ApiResponse } from '@/lib/api';



export const ticketsApi = {
    fetchTickets: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SupportTicket[]>>(`${SUPERADMIN_TICKETS_API.BASE}${q}`, { dataSchema: SuperadminTicketsListDataSchema });
    },
    fetchTicketById: (id: string) => apiFetch<ApiResponse<SupportTicket>>(`${SUPERADMIN_TICKETS_API.BASE}/${id}`, { dataSchema: SupportTicketSchema }),
    updateTicket: (id: string, body: Partial<SupportTicket>, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(`${SUPERADMIN_TICKETS_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    closeTicket: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(SUPERADMIN_TICKETS_API.CLOSE(id), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    assignTicket: (id: string, assignee: string, idempotencyKey: string) => apiFetch<ApiResponse<SupportTicket>>(SUPERADMIN_TICKETS_API.ASSIGN(id), {
        method: 'POST',
        body: JSON.stringify({ assignee }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
};

export async function replyToTicket(id: string, replyText: string, idempotencyKey: string): Promise<ApiResponse<SupportTicket>> {
    return apiFetch<ApiResponse<SupportTicket>>(`${SUPERADMIN_TICKETS_API.BASE}/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ replyText }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema,
    });
}
