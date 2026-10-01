// RESPONSIBILITY: Provides API access for the Business Overview feature within Superadmin only.
import { SuperadminDashboardV1DataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardV1Schema';
import { SuperadminDashboardV1UrlConfig } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminDashboardV1Data } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchDashboardBusinessOverview(): Promise<ApiResponse<SuperadminDashboardV1Data>> {
    return apiFetch<ApiResponse<SuperadminDashboardV1Data>>(SuperadminDashboardV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminDashboardV1DataSchema });
}
