'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/frontend_manager/manager_grievance/manager_grievance_api/ManagerGrievanceApi';
import { ManagerGrievanceQueryKeys } from '@/app/frontend_manager/manager_grievance/manager_grievance_constants/ManagerGrievanceQueryKeys';

import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates grievance feature state and its documented UI/API boundary through useManagerGrievanceMutations.
 * @dependencies Uses ManagerIdempotency, ManagerGrievanceApi, useManagerGrievanceQueries, ManagerToastService.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerGrievanceMutations owns the grievance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerGrievanceMutations() {
  const queryClient = useQueryClient();
  const createGrievanceTicket = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: Parameters<typeof ManagerGrievanceApi.createGrievanceTicket>[0]; idempotencyKey: string }) => ManagerGrievanceApi.createGrievanceTicket(payload, idempotencyKey),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ManagerGrievanceQueryKeys.lists() });
      showManagerSuccessToast(response.message, 'manager-grievance-create-success');
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-grievance-create-error');
    },
  });
  const resolveGrievanceTicket = useMutation({
    mutationFn: ({ id, resolutionNote, idempotencyKey }: { id: string; resolutionNote: string; idempotencyKey: string }) => ManagerGrievanceApi.resolveGrievanceTicket(id, resolutionNote, idempotencyKey),
    onSuccess: async (response, variables) => {
      await queryClient.invalidateQueries({ queryKey: ManagerGrievanceQueryKeys.lists() });
      showManagerSuccessToast(response.message, `manager-grievance-resolve-${variables.id}`);
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-grievance-resolve-error');
    },
  });
  return { createGrievanceTicket, resolveGrievanceTicket };
}
