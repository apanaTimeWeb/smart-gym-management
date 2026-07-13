// RESPONSIBILITY: Contains logic, types, or component definition for this module.
import { apiFetch } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/erp/dashboard/dashboard_url_config';
import { DashboardStats } from '@/app/erp/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  getStats: async () => {
    const [kpiRes, chartsRes, recentRes] = await Promise.all([
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.STATS),
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.CHARTS),
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.RECENT),
    ]);
    return {
      success: true,
      data: {
        ...kpiRes.data,
        ...chartsRes.data,
        ...recentRes.data,
      } as DashboardStats,
    };
  },
};

