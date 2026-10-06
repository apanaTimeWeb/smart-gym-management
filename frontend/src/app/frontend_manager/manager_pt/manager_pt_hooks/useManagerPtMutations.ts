'use client';
// DATA FLOW: PT user action → dedicated mutation hook → ManagerPtApi → Query cache invalidation → PT UI.
import { useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { ManagerPtApi } from '@/app/frontend_manager/manager_pt/manager_pt_api/ManagerPtApi';
import { ManagerPtQueryKeys } from '@/app/frontend_manager/manager_pt/manager_pt_constants/ManagerPtQueryKeys';
import type { CreatePtAssignmentPayload } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';

/**
 * @description Owns PT assignment creation and session-completion mutations with success/error feedback and cache invalidation.
 * @dependencies Uses ManagerPtApi, ManagerPtQueryKeys, idempotency and toast infrastructure.
 * @edge-case Generates the idempotency key at the action boundary for each new user intent; callers can reuse a key when retrying the same intent.
 */
export function useManagerPtMutations() {
  const queryClient = useQueryClient();
  const sessionKeysRef = useRef(new Map<string, string>());
  const createAssignmentMutation = useMutation({
    mutationFn: ({ body, idempotencyKey }: { body: CreatePtAssignmentPayload; idempotencyKey: string }) => ManagerPtApi.createAssignment(body, idempotencyKey),
    onSuccess: (response) => {
      showManagerSuccessToast(response.message, 'manager-pt-success');
      void queryClient.invalidateQueries({ queryKey: ManagerPtQueryKeys.assignments() });
    },
    onError: (error) => showManagerErrorToast(error, 'manager-pt-assign-error'),
  });
  const markSessionMutation = useMutation({
    mutationFn: ({ assignmentId, idempotencyKey }: { assignmentId: string; idempotencyKey: string }) => ManagerPtApi.markSessionComplete(assignmentId, idempotencyKey),
    onSuccess: (response) => {
      showManagerSuccessToast(response.message, 'manager-pt-success');
      void queryClient.invalidateQueries({ queryKey: ManagerPtQueryKeys.assignments() });
    },
    onError: (error) => showManagerErrorToast(error, 'manager-pt-session-error'),
  });
  return {
    createAssignment: createAssignmentMutation.mutateAsync,
    assignmentSaving: createAssignmentMutation.isPending,
    handleMarkSession: async (assignmentId: string) => { const key = sessionKeysRef.current.get(assignmentId) ?? createManagerIdempotencyKey(); sessionKeysRef.current.set(assignmentId, key); const response = await markSessionMutation.mutateAsync({ assignmentId, idempotencyKey: key }); sessionKeysRef.current.delete(assignmentId); return response; },
    sessionSaving: markSessionMutation.isPending,
    markingId: markSessionMutation.isPending ? markSessionMutation.variables?.assignmentId : null,
  };
}
