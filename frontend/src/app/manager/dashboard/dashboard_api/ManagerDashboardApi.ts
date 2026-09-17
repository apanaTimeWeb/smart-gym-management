import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { dashboardStatsSchema } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardSchema';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const dashboardApi = {
  fetchDashboardStats: async (params?: Record<string, string>): Promise<ApiResponse<DashboardStats>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: dashboardStatsSchema });
  },
};
