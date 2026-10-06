'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerMembersApi } from '@/app/frontend_manager/manager_members/manager_members_api/ManagerMembersApi';
import { ManagerMembersQueryKeys } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersQueryKeys';
/** Loads available diet-plan snapshots only while the assignment panel is open. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDietPlansQuery.
 * @dependencies Uses ManagerMembersApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDietPlansQuery owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDietPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ManagerMembersQueryKeys.dietPlans(),
    queryFn: () => ManagerMembersApi.fetchMemberDietPlans(),
    enabled });
}
