// RESPONSIBILITY: Provides API access for the Message Templates & Campaign Results feature within Superadmin only.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminMessagingV1DataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1Schema';
import { SuperadminMessagingV1UrlConfig } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

import type { SuperadminMessagingV1Data } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchMessagingTemplateInsights(): Promise<ApiResponse<SuperadminMessagingV1Data>> {
    return apiFetch<ApiResponse<SuperadminMessagingV1Data>>(SuperadminMessagingV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminMessagingV1DataSchema });
}
