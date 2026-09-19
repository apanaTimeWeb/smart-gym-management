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
    mutationFn: ({ dto, idempotencyKey }: { dto: CreateSessionDto; idempotencyKey: string }) => createTrainerSession(dto, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const updateSession = useMutation({
    mutationFn: ({ id, dto, idempotencyKey }: { id: string; dto: Partial<CreateSessionDto>; idempotencyKey: string }) => updateTrainerSession(id, dto, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const cancelSession = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => cancelTrainerSession(id, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'sessions'] });
    },
  });

  const markAttendance = useMutation({
    mutationFn: ({ id, memberIds, idempotencyKey }: { id: string; memberIds: string[]; idempotencyKey: string }) => markTrainerSessionAttendance(id, memberIds, idempotencyKey),
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
