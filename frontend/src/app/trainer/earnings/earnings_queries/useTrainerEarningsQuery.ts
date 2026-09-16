import { useQuery } from '@tanstack/react-query';
import { earningsApi } from '@/app/trainer/earnings/earnings_api/TrainerEarnings_api';
import { useTrainerEarningsStore } from '@/app/trainer/earnings/earnings_store/useTrainerEarningsStore';

export function useTrainerEarningsQuery() {
  const { startDate, endDate } = useTrainerEarningsStore();

  return useQuery({
    queryKey: ['trainer', 'earnings', startDate, endDate],
    queryFn: () => earningsApi.getEarningsData(startDate, endDate),
    staleTime: 5 * 60 * 1000,
  });
}
