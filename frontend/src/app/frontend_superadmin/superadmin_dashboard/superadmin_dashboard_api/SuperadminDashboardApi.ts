import { SuperadminDashboardApiDataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardTypesSchemas';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardApi owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardTypesSchemas, @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import type { ApiResponse } from '@/lib/api';



export const superadminDashboardApi = {
    fetchDashboard: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminDashboardApiDataSchema });
    },
    fetchDashboardMetrics: () => apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${MODULE_URLS.BACKEND_API.BASE}/metrics`, { dataSchema: SuperadminDashboardApiDataSchema }),
};
