'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { ManagerMaintenanceApi } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceApi';
import { ManagerMaintenanceQueryKeys } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_constants/ManagerMaintenanceQueryKeys';
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceMutations.
 * @dependencies Uses ManagerIdempotency, ManagerMaintenanceApi, useManagerMaintenanceQueries, ManagerToastService.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMaintenanceMutations owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceMutations() {
  const queryClient = useQueryClient();
  const createMaintenanceTicket = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CreateMaintenanceTicketPayload; idempotencyKey: string }) => ManagerMaintenanceApi.createMaintenanceTicket(payload, idempotencyKey),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ManagerMaintenanceQueryKeys.lists() });
      showManagerSuccessToast(response.message, 'manager-maintenance-create-success');
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-maintenance-create-error');
    },
  });
  const resolveMaintenanceTicket = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerMaintenanceApi.resolveMaintenanceTicket(id, idempotencyKey),
    onSuccess: async (response, id) => {
      await queryClient.invalidateQueries({ queryKey: ManagerMaintenanceQueryKeys.lists() });
      showManagerSuccessToast(response.message, `manager-maintenance-resolve-${id}`);
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-maintenance-resolve-error');
    },
  });
  return { createMaintenanceTicket, resolveMaintenanceTicket };
}
