// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_api.ts
import { AnalyticsApiDataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsTypesSchemas';
import { SuperadminAnalyticsUrlConfig } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';
import type { ApiResponse } from '@/lib/api';

export const analyticsApi = {
    fetchRevenueMetrics: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<AnalyticsApiData>>(`${SuperadminAnalyticsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: AnalyticsApiDataSchema });
    },
};
