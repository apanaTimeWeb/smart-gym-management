'use client';
// RESPONSIBILITY: TanStack mutation hooks for Trainer Schedule module write operations.
// DATA FLOW: Component → useMutation → trainerScheduleApi → invalidate query cache
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trainerScheduleApi } from '@/app/trainer/schedule/schedule_api/TrainerScheduleApi';
import type { WeeklyAvailability, CreateLeaveDto } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';

/** Owns useTrainerScheduleMutations behavior for this Trainer module. */
export function useTrainerScheduleMutations() {
  const queryClient = useQueryClient();

  const invalidateSchedule = () => {
    void queryClient.invalidateQueries({ queryKey: ['trainer', 'schedule'] });
  };

  const updateAvailability = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: WeeklyAvailability[]; idempotencyKey: string }) => trainerScheduleApi.updateAvailability(data, idempotencyKey),
    onSuccess: invalidateSchedule,
  });

  const requestLeave = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: CreateLeaveDto; idempotencyKey: string }) => trainerScheduleApi.requestLeave(data, idempotencyKey),
    onSuccess: invalidateSchedule,
  });

  return { updateAvailability, requestLeave };
}
