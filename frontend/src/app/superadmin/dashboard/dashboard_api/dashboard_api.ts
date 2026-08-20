// RESPONSIBILITY: Modularized API client for the Dashboard module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SaaSDashboardMetrics } from '@/app/superadmin/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  getData: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE),
  getMetrics: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(`${SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE}/metrics`),
};
