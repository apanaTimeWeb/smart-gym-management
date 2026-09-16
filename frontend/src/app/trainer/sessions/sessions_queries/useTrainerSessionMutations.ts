// RESPONSIBILITY: Custom mutation hooks for Trainer Sessions.
// DATA FLOW: Component -> useTrainerSessionMutations -> API
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTrainerSession,
  updateTrainerSession,
  cancelTrainerSession,
  markTrainerSessionAttendance,
} from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';
import type { CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export function useTrainerSessionMutations() {
  const queryClient = useQueryClient();

  const createSession = useMutation({
    mutationFn: (dto: CreateSessionDto) => createTrainerSession(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const updateSession = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateSessionDto> }) => updateTrainerSession(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const cancelSession = useMutation({
    mutationFn: (id: string) => cancelTrainerSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const markAttendance = useMutation({
    mutationFn: ({ id, memberIds }: { id: string; memberIds: string[] }) => markTrainerSessionAttendance(id, memberIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  return {
    createSession,
    updateSession,
    cancelSession,
    markAttendance,
  };
}
