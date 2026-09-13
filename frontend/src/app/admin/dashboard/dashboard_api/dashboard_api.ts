import type { ApiResponse } from '@/lib/api';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import { apiFetch } from '@/lib/api';

export const dashboardApi = {
  fetchDashboardStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    const qs = range ? `?range=${range}` : '';
    return apiFetch<ApiResponse<DashboardStats>>(`/admin/dashboard${qs}`);
  },
};

