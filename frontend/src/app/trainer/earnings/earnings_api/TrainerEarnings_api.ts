// RESPONSIBILITY: Owns the Trainer Earnings HTTP contract and validates every response before UI consumption.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { EarningsUrlConfig } from '@/app/trainer/earnings/earnings_url_config';
import { TrainerEarningsDataSchema, type TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';
import type { EarningsSortDirection, EarningsSortField } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

export const earningsApi = {
  fetchEarningsData: async (
    startDate?: string,
    endDate?: string,
    search?: string,
    page = 1,
    limit = 10,
    sortBy: EarningsSortField = 'date',
    sortDirection: EarningsSortDirection = 'desc',
  ): Promise<TrainerEarningsData> => {
    const params = new URLSearchParams();
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (search) params.set('search', search);
    params.set('page', String(page));
    params.set('limit', String(limit));
    params.set('sortBy', sortBy);
    params.set('sortDirection', sortDirection);
    const queryString = params.toString();
    const raw = await apiFetch<ApiResponse<unknown>>(`${EarningsUrlConfig.BACKEND_API.DATA}?${queryString}`);
    const response = createTrainerApiResponseSchema(TrainerEarningsDataSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};
