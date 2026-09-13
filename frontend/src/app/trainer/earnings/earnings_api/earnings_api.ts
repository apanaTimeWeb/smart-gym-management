import { TrainerEarningsDataSchema, type TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';
import { MOCK_EARNINGS_DATA } from '@/app/trainer/earnings/earnings_fixtures/TrainerEarningsMockData';

export const earningsApi = {
  getEarningsData: async (startDate?: string, endDate?: string): Promise<TrainerEarningsData> => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate latency
    return TrainerEarningsDataSchema.parse(MOCK_EARNINGS_DATA);
  }
};
