import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { EarningsUrlConfig } from '@/app/trainer/Trainer_url_config';
import { TrainerEarningsDataSchema, type TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export const earningsApi = {
  fetchEarningsData: async (startDate?: string, endDate?: string): Promise<TrainerEarningsData> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<unknown>(`${EarningsUrlConfig.BACKEND_API.DATA}${q}`);
    const response = createTrainerApiResponseSchema(TrainerEarningsDataSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};
