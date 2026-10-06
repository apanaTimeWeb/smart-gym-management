'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerDashboardApi } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_api/ManagerDashboardApi';
import { ManagerDashboardQueryKeys } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates dashboard feature state and its documented UI/API boundary through useDashboardStatsQuery.
 * @dependencies Uses ManagerDashboardApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useDashboardStatsQuery owns the dashboard feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useDashboardStatsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerDashboardQueryKeys.stats(params),
    queryFn: () => ManagerDashboardApi.fetchDashboardStats(params).then(res => res.data) });
}
