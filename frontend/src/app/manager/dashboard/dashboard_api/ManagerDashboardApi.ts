import { z } from 'zod';
import { ManagerDashboardUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/manager/Manager_url_config';
import { dashboardStatsSchema } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardSchema';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const dashboardApi = {
  getStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    const query = new URLSearchParams(range ? { range } : {}).toString();
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: dashboardStatsSchema });
  },
};
