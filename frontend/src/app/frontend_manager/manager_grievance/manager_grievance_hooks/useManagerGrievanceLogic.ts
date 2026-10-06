import { useMemo, useRef } from 'react';
import { useManagerGrievanceMutations } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceMutations';
import { useManagerGrievanceTickets } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceQueries';
import { useManagerGrievanceUrlState } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceUrlState';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import type { CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievance/manager_grievance_types/ManagerGrievanceTypes';

/**
 * @description Coordinates grievance feature server state, URL-backed search, and mutation actions for the Manager grievance route.
 * @dependencies Uses the module-owned query, mutation, URL-state, idempotency, and type contracts.
 * @edge-case Keeps search shareable, filters rendered tickets from the current query result, and returns mutation success as an explicit boolean without swallowing UI loading state.
 */
// DATA FLOW: TanStack Query + URL state → useManagerGrievanceLogic → ManagerGrievanceMain → ManagerGrievanceContent
/**
 * @description useManagerGrievanceLogic owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerGrievanceLogic() {
  const createKeyRef = useRef<string | null>(null);
  const resolveKeyByIdRef = useRef(new Map<string, string>());
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerGrievanceTickets();
  const { createGrievanceTicket, resolveGrievanceTicket } = useManagerGrievanceMutations();
  const { search, setSearch } = useManagerGrievanceUrlState();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTickets = useMemo(() => tickets.filter((ticket) => (
    !normalizedSearch
      || ticket.memberName.toLowerCase().includes(normalizedSearch)
      || ticket.issue.toLowerCase().includes(normalizedSearch)
  )), [normalizedSearch, tickets]);

  const handleCreateTicket = async (payload: CreateGrievanceTicketPayload) => {
    try {
      const idempotencyKey = createKeyRef.current ?? createManagerIdempotencyKey(); createKeyRef.current = idempotencyKey; await createGrievanceTicket.mutateAsync({ payload, idempotencyKey });
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string, resolutionNote: string) => {
    try {
      const idempotencyKey = resolveKeyByIdRef.current.get(id) ?? createManagerIdempotencyKey(); resolveKeyByIdRef.current.set(id, idempotencyKey); await resolveGrievanceTicket.mutateAsync({ id, resolutionNote, idempotencyKey });
      return true;
    } catch {
      return false;
    }
  };

  return {
    tickets: filteredTickets,
    search,
    setSearch,
    isPending,
    isError,
    error,
    reload: refetch,
    createTicket: handleCreateTicket,
    resolveTicket: handleResolveTicket,
    isCreating: createGrievanceTicket.isPending,
    isResolving: resolveGrievanceTicket.isPending,
  };
}
