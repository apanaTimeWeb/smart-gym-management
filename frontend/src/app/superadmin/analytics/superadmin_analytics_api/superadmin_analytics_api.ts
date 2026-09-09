import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueMetrics } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';

export const analyticsApi = {
  getRevenueMetrics: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<RevenueMetrics>>('/api/superadmin/analytics/revenue' + qs);
  },
};
