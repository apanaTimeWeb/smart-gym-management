// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_api.ts
import { AnalyticsApiDataSchema } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AnalyticsApiData } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import { AnalyticsUrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_url_config';
import { z } from "zod";

export const analyticsApi = {
  fetchRevenueMetrics: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<AnalyticsApiData>>(`${AnalyticsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: AnalyticsApiDataSchema });
  },
};

