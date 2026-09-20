'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProgressEntry, updateProgressEntry, deleteProgressEntry } from '@/app/trainer/progress-tracking/progress-tracking_api/TrainerProgressApi';
import type { CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

/**
 * Owns Trainer Progress mutation state and invalidates server queries after successful writes.
 */
export function useTrainerProgressMutations() {
  const queryClient = useQueryClient();

  const createEntry = useMutation({
    mutationFn: ({ memberId, dto, idempotencyKey }: { memberId: string; dto: CreateProgressEntryDto; idempotencyKey: string }) =>
      createProgressEntry(memberId, dto, idempotencyKey),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  const updateEntry = useMutation({
    mutationFn: ({ memberId, entryId, dto, idempotencyKey }: { memberId: string; entryId: string; dto: Partial<CreateProgressEntryDto>; idempotencyKey: string }) =>
      updateProgressEntry(memberId, entryId, dto, idempotencyKey),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: ({ memberId, entryId, idempotencyKey }: { memberId: string; entryId: string; idempotencyKey: string }) =>
      deleteProgressEntry(memberId, entryId, idempotencyKey),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  return { createEntry, updateEntry, deleteEntry };
}
