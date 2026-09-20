'use client';
// RESPONSIBILITY: Owns Trainer earnings server state; URL parameters are the single source of truth for browse state.
// DATA FLOW: URL search/date/sort/page -> query key -> Trainer Earnings API -> rendered KPI/history state.
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { earningsApi } from '@/app/trainer/earnings/earnings_api/TrainerEarnings_api';
import { EARNINGS_ITEMS_PER_PAGE, EARNINGS_SORT_OPTIONS, type EarningsSortDirection, type EarningsSortField } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

/**
 * Reads the canonical earnings browse state from the URL and includes every server-side parameter in the query identity.
 * @returns TanStack Query state for the current earnings filters and page.
 */
export function useTrainerEarningsQuery() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? EARNINGS_SORT_OPTIONS[0].value;
  const sortBy: EarningsSortField = EARNINGS_SORT_OPTIONS.some((option) => option.value === sortByValue) ? sortByValue as EarningsSortField : EARNINGS_SORT_OPTIONS[0].value;
  const sortDirection: EarningsSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  return useQuery({
    queryKey: ['trainer', 'earnings', { startDate, endDate, search, page, limit: EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection }],
    queryFn: () => earningsApi.fetchEarningsData(startDate, endDate, search, page, EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection),
    staleTime: 5 * 60 * 1000,
  });
}
