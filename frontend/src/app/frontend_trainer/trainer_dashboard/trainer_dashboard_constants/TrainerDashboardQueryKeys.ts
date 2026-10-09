// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Dashboard server state.
import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardDateRangeTypes';

import type { TrainerDashboardQueryParams } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardQueryParamsTypes';



export type { TrainerDashboardQueryParams };

export const TRAINER_DASHBOARD_QUERY_KEYS = {
  all: ['trainer_dashboard'] as const,
  statsAll: () => [...TRAINER_DASHBOARD_QUERY_KEYS.all, 'stats'] as const,
  stats: (range?: TrainerDashboardDateRange, startDate?: string, endDate?: string) => [...TRAINER_DASHBOARD_QUERY_KEYS.statsAll(), { range, startDate, endDate }] as const,
} as const;
