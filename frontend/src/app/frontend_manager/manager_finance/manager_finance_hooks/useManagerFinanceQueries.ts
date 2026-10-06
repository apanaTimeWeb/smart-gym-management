'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerFinanceApi } from '@/app/frontend_manager/manager_finance/manager_finance_api/ManagerFinanceApi';
import { ManagerFinanceQueryKeys } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceQueryKeys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates finance feature state and its documented UI/API boundary through useManagerFinancePayments.
 * @dependencies Uses ManagerFinanceApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerFinancePayments owns the finance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerFinancePayments(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerFinanceQueryKeys.payments(params),
    queryFn: async () => {
      const res = await ManagerFinanceApi.fetchPayments(params);
      
      return {
        payments: res.data?.payments ?? [],
        total: res.data?.total ?? 0
      };
    }
  });
}

/**
 * @description Loads the manager finance summary through the module query-key registry and owning API facade.
 * @dependencies Uses ManagerFinanceApi and ManagerFinanceQueryKeys; owns no client UI state.
 * @edge-case Preserves empty summary data, request failures, and cache identity for the selected range.
 */
export function useManagerFinanceSummary(range: string) {
  return useQuery({
    queryKey: ManagerFinanceQueryKeys.summary(range),
    queryFn: async () => {
      const params: Record<string, string> = range ? { range } : {};
      const res = await ManagerFinanceApi.fetchFinanceSummary(params);
      return res.data;
    }
  });
}
