// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch, ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiFetch<ApiResponse<DashboardStats>>(DashboardUrlConfig.BACKEND_API.STATS);
  },
};


