import type { ApiResponse } from '@/lib/api';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import { apiFetch } from '@/lib/api';

import { MOCK_ADMIN_DASHBOARD } from '@/app/admin/dashboard/dashboard_api/AdminDashboardMockData';

export const dashboardApi = {
  fetchDashboardStats: async (range?: string): Promise<ApiResponse<DashboardStats>> => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_DASHBOARD };
  },
};

