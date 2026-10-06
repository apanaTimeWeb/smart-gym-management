import { AnalyticsApiDataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsTypesSchemas';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsApi owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsTypesSchemas, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_api.ts
import { SUPERADMIN_ANALYTICS_API } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';
import type { ApiResponse } from '@/lib/api';



export const analyticsApi = {
    fetchRevenueMetrics: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<AnalyticsApiData>>(`${SUPERADMIN_ANALYTICS_API.BASE}${q}`, { dataSchema: AnalyticsApiDataSchema });
    },
};
