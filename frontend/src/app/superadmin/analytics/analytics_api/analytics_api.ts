import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueMetrics } from '@/app/superadmin/analytics/analytics_types/analytics_types';

export const analyticsApi = {
  getRevenueMetrics: () => apiFetch<ApiResponse<RevenueMetrics>>('/api/superadmin/analytics/revenue'),
};
