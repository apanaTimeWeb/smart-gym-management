// RESPONSIBILITY: Provides API access for the Feature Rollouts & Release History feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminFeaturesV1UrlConfig } from '@/app/superadmin/features/superadmin_features_rollout_insights_url_config';
import { SuperadminFeaturesV1DataSchema, type SuperadminFeaturesV1Data } from '@/app/superadmin/features/features_types/SuperadminFeaturesV1Types';
export async function fetchFeatureRolloutInsights(): Promise<ApiResponse<SuperadminFeaturesV1Data>> {
    return apiFetch<ApiResponse<SuperadminFeaturesV1Data>>(SuperadminFeaturesV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminFeaturesV1DataSchema });
}
