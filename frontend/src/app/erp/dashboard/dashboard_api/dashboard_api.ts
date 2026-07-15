// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch, ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/erp/dashboard/dashboard_url_config';
import { DashboardStats } from '@/app/erp/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const [kpiRes, chartsRes, recentRes] = await Promise.all([
      apiFetch<ApiResponse<Partial<DashboardStats>>>(DashboardUrlConfig.BACKEND_API.STATS),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(DashboardUrlConfig.BACKEND_API.CHARTS),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(DashboardUrlConfig.BACKEND_API.RECENT),
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

