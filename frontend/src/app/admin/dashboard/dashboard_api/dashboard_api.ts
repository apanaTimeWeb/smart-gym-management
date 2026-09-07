// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch, ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/admin/dashboard/dashboard_url_config';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  fetchDashboardStats: async (branchId?: string): Promise<ApiResponse<DashboardStats>> => {
    const query = branchId && branchId !== 'all' ? `?branchId=${branchId}` : '';
    const [kpiRes, chartsRes, recentRes] = await Promise.all([
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.STATS}${query}`),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.CHARTS}${query}`),
      apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.RECENT}${query}`),
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

