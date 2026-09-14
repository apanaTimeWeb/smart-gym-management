// RESPONSIBILITY: Exposes typed API functions specific to the Dashboard module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_url_config';
import type { SuperadminDashboardApiData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';
import { z } from "zod";

export const superadminDashboardApi = {
  fetchDashboardData: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${DashboardUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  fetchDashboardMetrics: () => apiFetch<ApiResponse<SuperadminDashboardApiData>>(`${DashboardUrlConfig.BACKEND_API.BASE}/metrics`, { dataSchema: z.unknown() }),
};
