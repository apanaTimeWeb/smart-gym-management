import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const ssrDashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.BASE}/stats`);
  },
};
