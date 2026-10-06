'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerMaintenanceApi } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceApi';
import { ManagerMaintenanceQueryKeys } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_constants/ManagerMaintenanceQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceTickets.
 * @dependencies Uses ManagerMaintenanceApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMaintenanceTickets owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceTickets() {
  return useQuery({
    queryKey: ManagerMaintenanceQueryKeys.lists(),
    queryFn: async () => (await ManagerMaintenanceApi.fetchMaintenanceIssues()).data ?? [],
  });
}
