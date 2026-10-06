'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerLibraryApi } from '@/app/frontend_manager/manager_library/manager_library_api/ManagerLibraryApi';
import { ManagerLibraryQueryKeys } from '@/app/frontend_manager/manager_library/manager_library_constants/ManagerLibraryQueryKeys';
import type { ManagerLibraryListParams } from '@/app/frontend_manager/manager_library/manager_library_api/ManagerLibraryApi';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietPlansQuery.
 * @dependencies Uses ManagerLibraryApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryDietPlansQuery owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietPlansQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: ManagerLibraryQueryKeys.dietPlans(params), queryFn: () => ManagerLibraryApi.fetchDietPlans(params) });
}

/**
 * @description Loads library exercise records through the module API and canonical query-key registry.
 * @dependencies Uses ManagerLibraryApi and ManagerLibraryQueryKeys; server state remains owned by TanStack Query.
 * @edge-case Preserves empty result sets, request failures, and filter-specific cache identity.
 */
export function useManagerLibraryExercisesQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: ManagerLibraryQueryKeys.exercises(params), queryFn: () => ManagerLibraryApi.fetchExercises(params) });
}
