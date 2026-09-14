import { dashboardStatsSchema } from '@/app/admin/dashboard/dashboard_types/dashboard_schemas';
import type { ApiResponse, apiFetch } from '@/lib/api';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import { apiFetch } from '@/lib/api';
import { z } from "zod";

export const dashboardApi = {
  fetchDashboardStats: async (range?: string) => {
            return apiFetch<ApiResponse<z.infer<typeof dashboardStatsSchema>>>('/api/admin/dashboard/fetchDashboardStats', { method: 'GET', dataSchema: dashboardStatsSchema });
        },
};

