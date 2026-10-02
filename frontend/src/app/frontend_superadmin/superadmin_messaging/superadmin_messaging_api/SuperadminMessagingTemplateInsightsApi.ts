import { SuperadminMessagingV1DataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1Schema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

// RESPONSIBILITY: Provides API access for the Message Templates & Campaign Results feature within Superadmin only.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

import type { SuperadminMessagingV1Data } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1Types';
import type { ApiResponse } from '@/lib/api';



export async function fetchMessagingTemplateInsights(): Promise<ApiResponse<SuperadminMessagingV1Data>> {
    return apiFetch<ApiResponse<SuperadminMessagingV1Data>>(MODULE_URLS.TEMPLATE_INSIGHTS.BACKEND_API.BASE, { dataSchema: SuperadminMessagingV1DataSchema });
}
