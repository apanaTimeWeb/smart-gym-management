// RESPONSIBILITY: Exposes typed API functions specific to the Dashboard module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminDashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardUrlConfig';
import type { SuperadminDashboardApiData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardMockData';

export const superadminDashboardApi = {
  fetchDashboardData: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA };
  },
};
