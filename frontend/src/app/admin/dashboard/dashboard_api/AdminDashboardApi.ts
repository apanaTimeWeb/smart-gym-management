import { AdminDashboardUrlConfig } from '@/app/admin/dashboard/admin_dashboard_url_config';
import { dashboardStatsSchema } from '@/app/admin/dashboard/dashboard_types/AdminDashboardSchemas';
import type { ApiResponse } from '@/lib/api';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';
import { apiFetch } from '@/lib/api';
import { z } from "zod";

export const dashboardApi = {
  fetchDashboardStats: async (range?: string) => {
            return apiFetch<ApiResponse<z.infer<typeof dashboardStatsSchema>>>(`${AdminDashboardUrlConfig.api.base}/fetchDashboardStats`, { method: 'GET', dataSchema: dashboardStatsSchema });
        },
};

