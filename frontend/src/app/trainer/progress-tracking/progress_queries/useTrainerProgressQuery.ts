import { useQuery } from '@tanstack/react-query';
import { fetchProgressEntries, fetchProgressSummary, fetchProgressMembers } from '@/app/trainer/progress-tracking/progress_api/TrainerProgressApi';

export function useTrainerProgressMembersQuery() {
  return useQuery({
    queryKey: ['trainer', 'progress', 'members'],
    queryFn: fetchProgressMembers,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainerProgressEntriesQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'progress', 'entries', memberId],
    queryFn: () => fetchProgressEntries(memberId),
    enabled: !!memberId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainerProgressSummaryQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'progress', 'summary', memberId],
    queryFn: () => fetchProgressSummary(memberId),
    enabled: !!memberId,
    staleTime: 5 * 60 * 1000,
  });
}
