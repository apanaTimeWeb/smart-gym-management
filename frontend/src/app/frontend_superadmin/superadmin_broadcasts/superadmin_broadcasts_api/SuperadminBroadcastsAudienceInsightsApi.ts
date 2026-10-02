import { SuperadminBroadcastsV1DataSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config';

import type { SuperadminBroadcastsV1Data } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsV1Types';
import type { ApiResponse } from '@/lib/api';


export async function fetchBroadcastAudienceInsights(): Promise<ApiResponse<SuperadminBroadcastsV1Data>> {
    return apiFetch<ApiResponse<SuperadminBroadcastsV1Data>>(MODULE_URLS.AUDIENCE_INSIGHTS.BACKEND_API.BASE, { dataSchema: SuperadminBroadcastsV1DataSchema });
}
