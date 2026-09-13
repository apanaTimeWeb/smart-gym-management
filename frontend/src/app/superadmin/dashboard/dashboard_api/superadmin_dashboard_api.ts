// RESPONSIBILITY: Exposes typed API functions specific to the Dashboard module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminDashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardUrlConfig';
import type { SuperadminDashboardApiData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

export const superadminDashboardApi = {
  fetchDashboardData: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminDashboardApiData>>(
      `${SuperadminDashboardUrlConfig.API.DASHBOARD_DATA}${query}`,
      { method: 'GET' }
    );
  },
};
