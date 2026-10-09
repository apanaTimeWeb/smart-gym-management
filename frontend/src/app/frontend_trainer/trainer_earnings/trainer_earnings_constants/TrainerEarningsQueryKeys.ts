// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Earnings server state.
import type { TrainerEarningsQueryParams } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_types/TrainerEarningsQueryTypes';
export const TRAINER_EARNINGS_QUERY_KEYS = {
  all: ['trainer_earnings'] as const,
  dataAll: () => [...TRAINER_EARNINGS_QUERY_KEYS.all, 'data'] as const,
  data: (params: TrainerEarningsQueryParams) => [...TRAINER_EARNINGS_QUERY_KEYS.dataAll(), params] as const,
} as const;
