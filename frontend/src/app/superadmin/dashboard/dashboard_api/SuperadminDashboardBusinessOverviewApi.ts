// RESPONSIBILITY: Provides API access for the Business Overview feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminDashboardV1UrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_business_overview_url_config';
import { SuperadminDashboardV1DataSchema, type SuperadminDashboardV1Data } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types';
export async function fetchDashboardBusinessOverview(): Promise<ApiResponse<SuperadminDashboardV1Data>> {
    return apiFetch<ApiResponse<SuperadminDashboardV1Data>>(SuperadminDashboardV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminDashboardV1DataSchema });
}
