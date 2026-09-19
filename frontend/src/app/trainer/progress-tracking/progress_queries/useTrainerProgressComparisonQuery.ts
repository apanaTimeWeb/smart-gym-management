'use client';
// RESPONSIBILITY: Owns comparison-member server-state queries. UI components consume query results instead of maintaining API data copies.
import { useQueries } from '@tanstack/react-query';
import { fetchProgressEntries } from '@/app/trainer/progress-tracking/progress_api/TrainerProgressApi';

export function useTrainerProgressComparisonQueries(memberIds: string[]) {
  return useQueries({
    queries: memberIds.map((memberId) => ({
      queryKey: ['trainer', 'progress', 'entries', memberId],
      queryFn: () => fetchProgressEntries(memberId),
      enabled: Boolean(memberId),
      staleTime: 5 * 60 * 1000,
    })),
  });
}
