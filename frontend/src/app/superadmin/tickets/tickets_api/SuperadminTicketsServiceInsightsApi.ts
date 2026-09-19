// RESPONSIBILITY: Provides API access for the Support Performance & Service Levels feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminTicketsV1UrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_service_insights_url_config';
import { SuperadminTicketsV1DataSchema, type SuperadminTicketsV1Data } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types';
export async function fetchTicketServiceInsights(): Promise<ApiResponse<SuperadminTicketsV1Data>> {
    return apiFetch<ApiResponse<SuperadminTicketsV1Data>>(SuperadminTicketsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminTicketsV1DataSchema });
}
