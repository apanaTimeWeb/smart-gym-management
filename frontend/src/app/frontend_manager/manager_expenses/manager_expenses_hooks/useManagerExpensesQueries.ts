'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerExpensesApi } from '@/app/frontend_manager/manager_expenses/manager_expenses_api/ManagerExpensesApi';
import { ManagerExpensesQueryKeys } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useExpensesListQuery.
 * @dependencies Uses ManagerExpensesApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useExpensesListQuery owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useExpensesListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerExpensesQueryKeys.list(params),
    queryFn: () => ManagerExpensesApi.fetchExpenses(params).then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useExpensesStatsQuery owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useExpensesStatsQuery() {
  return useQuery({
    queryKey: ManagerExpensesQueryKeys.stats(),
    queryFn: () => ManagerExpensesApi.fetchExpenseStats().then(res => res.data) });
}
