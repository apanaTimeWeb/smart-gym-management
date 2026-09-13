// RESPONSIBILITY: TanStack Query hooks for the Trainer Schedule module server state.
// DATA FLOW: trainerScheduleApi → useQuery → components
import { useQuery } from '@tanstack/react-query';
import { trainerScheduleApi } from '@/app/trainer/schedule/schedule_api/TrainerScheduleApi';

export function useTrainerScheduleQuery() {
  return useQuery({
    queryKey: ['trainer', 'schedule'],
    queryFn: trainerScheduleApi.getSchedule,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
