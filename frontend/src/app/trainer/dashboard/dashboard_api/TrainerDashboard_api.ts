import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import { DashboardStatsSchema } from '@/app/trainer/dashboard/dashboard_types/TrainerDashboard_types';
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/TrainerDashboard_types';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export const dashboardApi = {
  fetchDashboardStats: async (range?: string, startDate?: string, endDate?: string): Promise<DashboardStats> => {
    const params = new URLSearchParams();
    if (range) params.append('range', range);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<unknown>(`${DashboardUrlConfig.BACKEND_API.STATS}${q}`);
    const response = createTrainerApiResponseSchema(DashboardStatsSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};

