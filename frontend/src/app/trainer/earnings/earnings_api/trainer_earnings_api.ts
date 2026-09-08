import { apiFetch, ApiResponse } from '@/lib/api';
import { TrainerEarningsUrlConfig } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsUrlConfig';
import type {
  TrainerEarningsKPIsData,
  TrainerPendingPayout,
  TrainerEarningsHistoryRow,
} from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';

export const trainerEarningsApi = {
  getKPIs: () => apiFetch<ApiResponse<TrainerEarningsKPIsData>>(TrainerEarningsUrlConfig.BACKEND_API.KPIS),
  getPending: () => apiFetch<ApiResponse<TrainerPendingPayout[]>>(TrainerEarningsUrlConfig.BACKEND_API.PENDING),
  getHistory: () => apiFetch<ApiResponse<TrainerEarningsHistoryRow[]>>(TrainerEarningsUrlConfig.BACKEND_API.HISTORY),
};
