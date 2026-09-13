// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/manager/dashboard/ManagerDashboardUrlConfig';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

export const dashboardApi = {
  getStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    const q = range ? `?range=${range}` : '';
    const [kpiRes, chartsRes, recentRes] = await Promise.all([
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.STATS}${q}`),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.CHARTS}${q}`),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.RECENT}${q}`),
    ]);
    return {
      success: true,
      message: 'Stats fetched successfully',
      data: {
        ...(kpiRes.data || {}),
        ...(chartsRes.data || {}),
        ...(recentRes.data || {}),
      } as DashboardStats,
    };
  },
};
