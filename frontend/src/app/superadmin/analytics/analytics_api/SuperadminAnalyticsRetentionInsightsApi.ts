// RESPONSIBILITY: Provides API access for the Customer Retention & Growth Insights feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminAnalyticsV1UrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_retention_insights_url_config';
import { SuperadminAnalyticsV1DataSchema, type SuperadminAnalyticsV1Data } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types';
export async function fetchAnalyticsRetentionInsights(): Promise<ApiResponse<SuperadminAnalyticsV1Data>> {
    return apiFetch<ApiResponse<SuperadminAnalyticsV1Data>>(SuperadminAnalyticsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminAnalyticsV1DataSchema });
}
