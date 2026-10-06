'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerHrApi } from '@/app/frontend_manager/manager_hr/manager_hr_api/ManagerHrApi';
import { ManagerHrQueryKeys } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrQueryKeys';
/** Loads the selected staff ledger through the Manager HR API contract. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrLedgerQuery.
 * @dependencies Uses ManagerHrApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrLedgerQuery owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrLedgerQuery(staffId: string) {
  return useQuery({
    queryKey: ManagerHrQueryKeys.ledger(staffId),
    queryFn: () => ManagerHrApi.fetchLedger(staffId),
    enabled: Boolean(staffId) });
}
