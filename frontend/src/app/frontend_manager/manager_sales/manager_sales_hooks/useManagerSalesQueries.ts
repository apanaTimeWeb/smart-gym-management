'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerSalesApi } from '@/app/frontend_manager/manager_sales/manager_sales_api/ManagerSalesApi';
import { ManagerSalesQueryKeys } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates sales feature state and its documented UI/API boundary through useSalesOverviewQuery.
 * @dependencies Uses ManagerSalesApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useSalesOverviewQuery owns the sales feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useSalesOverviewQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesQueryKeys.overview(params),
    queryFn: () => ManagerSalesApi.fetchSalesOverview(params).then(res => res.data?.monthlyRevenue || []) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useMembershipReportQuery owns the sales feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useMembershipReportQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesQueryKeys.membershipReport(params),
    queryFn: () => ManagerSalesApi.fetchMembershipReport(params).then(res => ({
      report: res.data?.report || [],
      totals: res.data?.totals || { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 }
    })) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description usePendingPaymentsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function usePendingPaymentsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesQueryKeys.pendingPayments(params),
    queryFn: () => ManagerSalesApi.fetchPendingPayments(params).then(res => ({
      members: res.data?.members || [],
      total: res.data?.total || 0
    })) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useAllMembershipsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useAllMembershipsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesQueryKeys.allMemberships(params),
    queryFn: () => ManagerSalesApi.fetchAllMemberships(params).then(res => ({
      members: res.data?.members || [],
      total: res.data?.total || 0
    })) });
}
