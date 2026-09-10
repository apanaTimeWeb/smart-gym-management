// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  getStats: async (range?: string, startDate?: string, endDate?: string): Promise<ApiResponse<DashboardStats>> => {
    const params = new URLSearchParams();
    if (range) params.set('range', range);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    const q = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<ApiResponse<DashboardStats>>(`${DashboardUrlConfig.BACKEND_API.STATS}${q}`);
  },
};


