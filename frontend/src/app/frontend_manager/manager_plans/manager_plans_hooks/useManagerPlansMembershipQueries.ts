'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerPlansApi } from '@/app/frontend_manager/manager_plans/manager_plans_api/ManagerPlansApi';
import { ManagerPlansQueryKeys } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansQueryKeys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerPlansMembershipOverviewQuery.
 * @dependencies Uses ManagerPlansApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerPlansMembershipOverviewQuery owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerPlansMembershipOverviewQuery() {
  return useQuery({
    queryKey: ManagerPlansQueryKeys.membershipOverview(),
    queryFn: async () => {
      const response = await ManagerPlansApi.fetchMembershipOverview();
      if (!response.data) throw new Error(response.message);
      return response.data;
    } });
}
