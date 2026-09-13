import type { ApiResponse } from '@/lib/api';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import { MOCK_DASHBOARD_STATS } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardMockData';

export const ssrDashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return {
      success: true,
      message: 'Stats fetched successfully',
      data: MOCK_DASHBOARD_STATS,
    };
  },
};
