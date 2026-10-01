// RESPONSIBILITY: Provides API access for the Feature Rollouts & Release History feature within Superadmin only.
import { SuperadminFeaturesV1DataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesV1Schema';
import { SuperadminFeaturesV1UrlConfig } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminFeaturesV1Data } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchFeatureRolloutInsights(): Promise<ApiResponse<SuperadminFeaturesV1Data>> {
    return apiFetch<ApiResponse<SuperadminFeaturesV1Data>>(SuperadminFeaturesV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminFeaturesV1DataSchema });
}
