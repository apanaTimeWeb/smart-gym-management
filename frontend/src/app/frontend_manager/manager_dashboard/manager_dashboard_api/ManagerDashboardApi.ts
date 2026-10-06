import { apiFetch } from '@/lib/api';
import { dashboardStatsSchema } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_schemas/ManagerDashboardSchema';
import { ManagerDashboardUrlConfig } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_url_config';
import type { DashboardStats } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboardTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerDashboardApi implementation for the dashboard module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_dashboard/manager_dashboard_schemas/ManagerDashboardSchema; @/app/frontend_manager/manager_dashboard/manager_dashboard_url_config; @/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboardTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerDashboardApi = {
  fetchDashboardStats: async (params?: Record<string, string>): Promise<ApiResponse<DashboardStats>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerDashboardUrlConfig.BACKEND_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: dashboardStatsSchema });
  } };
