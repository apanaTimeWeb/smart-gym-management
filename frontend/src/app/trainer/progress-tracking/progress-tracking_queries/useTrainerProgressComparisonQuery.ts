// RESPONSIBILITY: Owns comparison-member server-state queries and keeps the progress API contract identical to the individual view.
'use client';
import { useQueries } from '@tanstack/react-query';
import { fetchProgressEntries } from '@/app/trainer/progress-tracking/progress-tracking_api/TrainerProgressApi';

/** Fetches complete progress histories used by the comparison view through TanStack Query. */
export function useTrainerProgressComparisonQueries(memberIds: string[]) {
  return useQueries({
    queries: memberIds.map((memberId) => ({
      queryKey: ['trainer', 'progress', 'comparison', { memberId }],
      queryFn: () => fetchProgressEntries({ memberId, page: 1, limit: 1000, sortBy: 'date', sortDirection: 'asc' }),
      enabled: Boolean(memberId),
      staleTime: 5 * 60 * 1000,
    })),
  });
}
