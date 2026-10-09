"use client";
// RESPONSIBILITY: Owns Trainer earnings server state; URL parameters are the single source of truth for browse state.
// DATA FLOW: URL search/date/sort/page -> query key -> Trainer Earnings API -> rendered KPI/history state.
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { TrainerEarningsApi } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_api/TrainerEarningsApi';

import { TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_constants/TrainerEarningsConstants';

import { TRAINER_EARNINGS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_constants/TrainerEarningsQueryKeys';

import { TrainerEarningsResolveTrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_utils/TrainerEarningsResolveTrainerEarningsDateRange';

import type { TrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_types/TrainerEarningsDateRangeTypes';

import type { TrainerEarningsEarningsSortDirection, TrainerEarningsEarningsSortField } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_types/TrainerEarningsSortTypes';








/**
 * @description Owns useTrainerEarningsQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerEarningsQuery state and data flow for the earnings feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerEarningsQuery() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const rangeParam = searchParams.get('range') ?? 'this_month';
  const range = rangeParam as TrainerEarningsDateRange;
  const defaultRange = range === 'custom' ? null : TrainerEarningsResolveTrainerEarningsDateRange(range);
  const startDate = searchParams.get('startDate') ?? defaultRange?.startDate ?? '';
  const endDate = searchParams.get('endDate') ?? defaultRange?.endDate ?? '';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortBy: TrainerEarningsEarningsSortField = TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS.some((option) => option.value === sortByValue) ? sortByValue as TrainerEarningsEarningsSortField : TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortDirection: TrainerEarningsEarningsSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  return useQuery({
    queryKey: TRAINER_EARNINGS_QUERY_KEYS.data({ startDate, endDate, search, page, limit: TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection }),
    queryFn: () => TrainerEarningsApi.fetchEarningsData(startDate, endDate, search, page, TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection),
    staleTime: 5 * 60 * 1000,
  });
}
