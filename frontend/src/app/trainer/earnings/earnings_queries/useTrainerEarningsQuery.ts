'use client';
// RESPONSIBILITY: Owns Trainer earnings server state. Query identity includes every server-driven filter/page input.
import { useQuery } from '@tanstack/react-query';
import { earningsApi } from '@/app/trainer/earnings/earnings_api/TrainerEarnings_api';
import { useTrainerEarningsStore } from '@/app/trainer/earnings/earnings_store/useTrainerEarningsStore';
import { useSearchParams } from 'next/navigation';

export function useTrainerEarningsQuery() {
  const searchParams = useSearchParams();
  const { search, currentPage } = useTrainerEarningsStore();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  return useQuery({
    queryKey: ['trainer', 'earnings', { startDate, endDate, search, page: currentPage, limit: 10 }],
    queryFn: () => earningsApi.fetchEarningsData(startDate, endDate, search, currentPage, 10),
    staleTime: 5 * 60 * 1000,
  });
}
