// RESPONSIBILITY: Provides API access for the Audience Segmentation feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminBroadcastsV1UrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_audience_insights_url_config';
import { SuperadminBroadcastsV1DataSchema, type SuperadminBroadcastsV1Data } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsV1Types';
export async function fetchBroadcastAudienceInsights(): Promise<ApiResponse<SuperadminBroadcastsV1Data>> {
    return apiFetch<ApiResponse<SuperadminBroadcastsV1Data>>(SuperadminBroadcastsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminBroadcastsV1DataSchema });
}
