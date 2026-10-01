// RESPONSIBILITY: Provides API access for the Customer Retention & Growth Insights feature within Superadmin only.
import { SuperadminAnalyticsV1DataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsV1Schema';
import { SuperadminAnalyticsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminAnalyticsV1Data } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchAnalyticsRetentionInsights(): Promise<ApiResponse<SuperadminAnalyticsV1Data>> {
    return apiFetch<ApiResponse<SuperadminAnalyticsV1Data>>(SuperadminAnalyticsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminAnalyticsV1DataSchema });
}
