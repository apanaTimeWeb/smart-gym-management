import { SuperadminTicketsV1DataSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsV1Schema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

// RESPONSIBILITY: Provides API access for the Support Performance & Service Levels feature within Superadmin only.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';

import type { SuperadminTicketsV1Data } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsV1Types';
import type { ApiResponse } from '@/lib/api';



export async function fetchTicketServiceInsights(): Promise<ApiResponse<SuperadminTicketsV1Data>> {
    return apiFetch<ApiResponse<SuperadminTicketsV1Data>>(MODULE_URLS.SERVICE_INSIGHTS.BACKEND_API.BASE, { dataSchema: SuperadminTicketsV1DataSchema });
}
