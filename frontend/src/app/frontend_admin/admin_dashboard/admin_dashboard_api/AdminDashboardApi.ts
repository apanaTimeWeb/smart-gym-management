import type { AdminDashboardStatsParams } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardQueryTypes';
import { ADMIN_DASHBOARD_API } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_url_config';
import { dashboardStatsSchema } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_schemas/AdminDashboardSchemas';
import type { ApiResponse } from '@/lib/api';
import { apiFetch } from '@/lib/api';
import type { DashboardStats } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardTypes';


export const AdminDashboardApi = {
  fetchDashboardStats: async (params: AdminDashboardStatsParams) => {
    const query = new URLSearchParams({ range: params.range });
    if (params.startDate) query.set('startDate', params.startDate);
    if (params.endDate) query.set('endDate', params.endDate);
    if (params.branchId) query.set('branchId', params.branchId);

    return apiFetch<ApiResponse<DashboardStats>>(
      `${ADMIN_DASHBOARD_API.stats}?${query.toString()}`,
      { method: 'GET', dataSchema: dashboardStatsSchema },
    );
  },
};
