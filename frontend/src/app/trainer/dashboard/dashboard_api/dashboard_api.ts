import { DashboardStatsSchema, type DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';
import { apiFetch } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';

export const dashboardApi = {
  getStats: async (range?: string, startDate?: string, endDate?: string): Promise<DashboardStats> => {
    const params = new URLSearchParams();
    if (range) params.append('range', range);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<unknown>(`${DashboardUrlConfig.BACKEND_API.STATS}${q}`);
    return DashboardStatsSchema.parse(raw);
  },
};
