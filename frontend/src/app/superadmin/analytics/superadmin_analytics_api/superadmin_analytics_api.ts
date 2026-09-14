import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueMetrics } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';

import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/superadmin/analytics/superadmin_analytics_api/SuperadminAnalyticsMockData';

export const analyticsApi = {
  getRevenueMetrics: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_ANALYTICS as unknown as SuperadminAnalyticsData };
  },
};
