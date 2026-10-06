'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerProfileApi } from '@/app/frontend_manager/manager_profile/manager_profile_api/ManagerProfileApi';
import { ManagerProfileQueryKeys } from '@/app/frontend_manager/manager_profile/manager_profile_constants/ManagerProfileQueryKeys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileQuery.
 * @dependencies Uses ManagerProfileApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerProfileQuery owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileQuery() {
  return useQuery({ queryKey: ManagerProfileQueryKeys.current(), queryFn: ManagerProfileApi.fetchProfile });
}
