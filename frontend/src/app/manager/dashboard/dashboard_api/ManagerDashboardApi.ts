// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/manager/dashboard/ManagerDashboardUrlConfig';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import { MOCK_DASHBOARD_STATS } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardMockData';

export const dashboardApi = {
  getStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      message: 'Stats fetched successfully',
      data: MOCK_DASHBOARD_STATS,
    };
  },
};
