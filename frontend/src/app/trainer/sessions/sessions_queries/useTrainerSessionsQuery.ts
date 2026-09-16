// RESPONSIBILITY: Custom query hook for Trainer Sessions.
// DATA FLOW: useTrainerSessionsQuery -> fetchTrainerSessions -> API
import { useQuery } from '@tanstack/react-query';
import { fetchTrainerSessions, fetchTrainerSessionMembers } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';

export function useTrainerSessionsQuery(date: string) {
  return useQuery({
    queryKey: ['trainer', 'sessions', 'list', { date }],
    queryFn: () => fetchTrainerSessions(date),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMembersBasicQuery() {
  return useQuery({
    queryKey: ['trainer', 'sessions', 'membersBasic'],
    queryFn: fetchTrainerSessionMembers,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
