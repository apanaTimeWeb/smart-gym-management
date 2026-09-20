// RESPONSIBILITY: Provides API access for the Message Templates & Campaign Results feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminMessagingV1UrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_template_insights_url_config';
import { SuperadminMessagingV1DataSchema, type SuperadminMessagingV1Data } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1Types';
export async function fetchMessagingTemplateInsights(): Promise<ApiResponse<SuperadminMessagingV1Data>> {
    return apiFetch<ApiResponse<SuperadminMessagingV1Data>>(SuperadminMessagingV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminMessagingV1DataSchema });
}
