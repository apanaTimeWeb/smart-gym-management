import { TrainerEarningsDataSchema, type TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';
import { apiFetch } from '@/lib/api';
import { EarningsUrlConfig } from '@/app/trainer/earnings/earnings_url_config';

export const earningsApi = {
  getEarningsData: async (startDate?: string, endDate?: string): Promise<TrainerEarningsData> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<unknown>(`${EarningsUrlConfig.BACKEND_API.DATA}${q}`);
    return TrainerEarningsDataSchema.parse(raw);
  }
};
