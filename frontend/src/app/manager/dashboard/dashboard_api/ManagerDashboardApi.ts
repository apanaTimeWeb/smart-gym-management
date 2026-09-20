import { apiFetch } from '@/lib/api';
import { dashboardStatsSchema } from '@/app/manager/dashboard/dashboard_schemas/ManagerDashboardSchema';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import type { ApiResponse } from '@/lib/api';


export const dashboardApi = {
  fetchDashboardStats: async (params?: Record<string, string>): Promise<ApiResponse<DashboardStats>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: dashboardStatsSchema });
  } };
