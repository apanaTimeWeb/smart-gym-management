'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/frontend_manager/manager_grievance/manager_grievance_api/ManagerGrievanceApi';
import { ManagerGrievanceQueryKeys } from '@/app/frontend_manager/manager_grievance/manager_grievance_constants/ManagerGrievanceQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates grievance feature state and its documented UI/API boundary through useManagerGrievanceTickets.
 * @dependencies Uses ManagerGrievanceApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerGrievanceTickets owns the grievance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerGrievanceTickets() {
  return useQuery({
    queryKey: ManagerGrievanceQueryKeys.lists(),
    queryFn: async () => (await ManagerGrievanceApi.fetchGrievanceTickets()).data ?? [],
  });
}
