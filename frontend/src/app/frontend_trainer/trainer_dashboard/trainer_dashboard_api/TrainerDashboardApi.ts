import { apiFetch } from '@/lib/api';

import { TrainerDashboardStatsSchema } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_schemas/TrainerDashboardDomainSchemas';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_url_config';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import type { TrainerDashboardStats } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardTypes';

import type { ApiResponse } from '@/lib/api';

export const TrainerDashboardApi = {
  fetchDashboardStats: async (range?: string, startDate?: string, endDate?: string): Promise<TrainerDashboardStats> => {
    const params = new URLSearchParams();
    if (range) params.append('range', range);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_DASHBOARD_URLS.API.STATS}${q}`);
    const response = TrainerInfrastructureApiResponseSchema(TrainerDashboardStatsSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};

