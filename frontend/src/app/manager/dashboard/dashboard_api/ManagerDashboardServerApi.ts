import { z } from 'zod';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { dashboardStatsSchema } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardSchema';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const ssrDashboardApi = {
  fetchDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.STATS}`, { dataSchema: dashboardStatsSchema });
  },
};
