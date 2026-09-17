import { AdminDashboardUrlConfig } from '@/app/admin/dashboard/admin_dashboard_url_config';
import { dashboardStatsSchema } from '@/app/admin/dashboard/dashboard_types/AdminDashboardSchemas';
import type { ApiResponse } from '@/lib/api';
import { apiFetch } from '@/lib/api';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';

export interface AdminDashboardStatsParams {
  range: string;
  startDate?: string;
  endDate?: string;
  branchId?: string;
}

export const dashboardApi = {
  fetchDashboardStats: async (params: AdminDashboardStatsParams) => {
    const query = new URLSearchParams({ range: params.range });
    if (params.startDate) query.set('startDate', params.startDate);
    if (params.endDate) query.set('endDate', params.endDate);
    if (params.branchId) query.set('branchId', params.branchId);

    return apiFetch<ApiResponse<DashboardStats>>(
      `${AdminDashboardUrlConfig.api.base}/fetchDashboardStats?${query.toString()}`,
      { method: 'GET', dataSchema: dashboardStatsSchema },
    );
  },
};
