import { SuperadminDashboardApiDataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardTypesSchemas';
import { SuperadminDashboardUrlConfig } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import type { ApiResponse } from '@/lib/api';

export const superadminDashboardApi = {
    fetchDashboard: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${SuperadminDashboardUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminDashboardApiDataSchema });
    },
    fetchDashboardMetrics: () => apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${SuperadminDashboardUrlConfig.BACKEND_API.BASE}/metrics`, { dataSchema: SuperadminDashboardApiDataSchema }),
};
