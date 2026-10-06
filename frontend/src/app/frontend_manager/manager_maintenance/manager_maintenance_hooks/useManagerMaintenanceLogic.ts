import { useRef } from 'react';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { useManagerMaintenanceMutations } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceMutations';
import { useManagerMaintenanceTickets } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceQueries';
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceLogic.
 * @dependencies Uses useManagerMaintenanceMutations, useManagerMaintenanceQueries, ManagerMaintenanceTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMaintenanceLogic owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceLogic() {
  const createKeyRef = useRef<string | null>(null);
  const resolveKeyByIdRef = useRef(new Map<string, string>());
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerMaintenanceTickets();
  const { createMaintenanceTicket, resolveMaintenanceTicket } = useManagerMaintenanceMutations();

  const handleCreateTicket = async (payload: CreateMaintenanceTicketPayload) => {
    try {
      const idempotencyKey = createKeyRef.current ?? createManagerIdempotencyKey(); createKeyRef.current = idempotencyKey; await createMaintenanceTicket.mutateAsync({ payload, idempotencyKey });
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string) => {
    try {
      const idempotencyKey = resolveKeyByIdRef.current.get(id) ?? createManagerIdempotencyKey(); resolveKeyByIdRef.current.set(id, idempotencyKey); await resolveMaintenanceTicket.mutateAsync({ id, idempotencyKey });
      return true;
    } catch {
      return false;
    }
  };

  return {
    tickets,
    isPending,
    isError,
    error,
    reload: refetch,
    createTicket: handleCreateTicket,
    resolveTicket: handleResolveTicket,
    isCreating: createMaintenanceTicket.isPending,
    isResolving: resolveMaintenanceTicket.isPending,
  };
}
