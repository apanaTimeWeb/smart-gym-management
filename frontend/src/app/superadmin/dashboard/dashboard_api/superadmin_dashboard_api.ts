// RESPONSIBILITY: Exposes typed API functions specific to the Dashboard module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminDashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardUrlConfig';
import type { SuperadminDashboardApiData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardMockData';

export const superadminDashboardApi = {
  fetchDashboardData: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<any>>(`${SuperadminDashboardUrlConfig.BACKEND_API.DASHBOARD_DATA}${q}`);
  },
  fetchDashboardMetrics: () => apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${SuperadminDashboardUrlConfig.BACKEND_API.DASHBOARD_DATA}/metrics`),
};
