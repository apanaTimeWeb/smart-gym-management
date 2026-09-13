import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProgressEntry, updateProgressEntry, deleteProgressEntry } from '../progress_api/TrainerProgressApi';
import type { CreateProgressEntryDto } from '../progress_types/TrainerProgressTypes';

export function useTrainerProgressMutations() {
  const queryClient = useQueryClient();

  const createEntry = useMutation({
    mutationFn: ({ memberId, dto }: { memberId: string; dto: CreateProgressEntryDto }) =>
      createProgressEntry(memberId, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  const updateEntry = useMutation({
    mutationFn: ({ memberId, entryId, dto }: { memberId: string; entryId: string; dto: Partial<CreateProgressEntryDto> }) =>
      updateProgressEntry(memberId, entryId, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: ({ memberId, entryId }: { memberId: string; entryId: string }) =>
      deleteProgressEntry(memberId, entryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'entries', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'progress', 'summary', variables.memberId] });
    },
  });

  return { createEntry, updateEntry, deleteEntry };
}
