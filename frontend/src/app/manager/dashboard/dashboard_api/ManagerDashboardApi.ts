import { apiFetch, type ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/manager/dashboard/ManagerDashboardUrlConfig';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const dashboardApi = {
  getStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    const query = new URLSearchParams(range ? { range } : {}).toString();
    return apiFetch(`/manager/dashboard/stats${query ? `?${query}` : ''}`);
  },
};
