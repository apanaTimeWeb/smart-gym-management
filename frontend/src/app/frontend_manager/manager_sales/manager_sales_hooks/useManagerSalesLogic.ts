'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { ManagerSalesQueryKeys } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesQueryKeys';
import { useSalesOverviewQuery, useMembershipReportQuery, usePendingPaymentsQuery, useAllMembershipsQuery } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesQueries';
import { useManagerSalesUiStore } from '@/app/frontend_manager/manager_sales/manager_sales_store/useManagerSalesUiStore';
import type { SalesTab } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesSharedConstants';
import type { ManagerSalesViewModel, SalesInitialData } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates sales feature state and its documented UI/API boundary through useManagerSalesLogic.
 * @dependencies Uses ManagerDebounce, useManagerSalesQueries, useManagerSalesUiStore, ManagerSalesTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerSalesLogic owns the sales feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerSalesLogic(initialData?: SalesInitialData | null): ManagerSalesViewModel {
  const router = useRouter(); const searchParams = useSearchParams(); const pathname = usePathname(); const queryClient = useQueryClient(); const ui = useManagerSalesUiStore();
  const tab = (searchParams.get('tab') || 'Revenue Overview') as SalesTab;
  const search = searchParams.get('search') || '';
  const customStartDate = searchParams.get('startDate') || '';
  const customEndDate = searchParams.get('endDate') || '';
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1); const debouncedSearch = useManagerDebounce(search, 300);
  const updateUrl = useCallback((updates: Record<string, string | null>, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    if (resetPage && !Object.hasOwn(updates, 'page')) params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => updateUrl({ search: value || null }), [updateUrl]);
  const setTab = useCallback((value: SalesTab) => updateUrl({ tab: value }, false), [updateUrl]);
  const setCustomStartDate = useCallback((value: string) => updateUrl({ startDate: value || null, range: 'custom' }), [updateUrl]);
  const setCustomEndDate = useCallback((value: string) => updateUrl({ endDate: value || null, range: 'custom' }), [updateUrl]);
  const setCurrentPage = useCallback((value: number) => updateUrl({ page: String(Math.max(1, value)) }, false), [updateUrl]);
  const queryParams = useMemo(() => {
    const range = searchParams.get('range') || 'this_month';
    const params: Record<string, string> = { range, search: debouncedSearch, page: String(currentPage), limit: '10' };
    if (range === 'custom') { if (customStartDate) params.startDate = customStartDate; if (customEndDate) params.endDate = customEndDate; }
    return params;
  }, [customEndDate, customStartDate, currentPage, debouncedSearch, searchParams]);
  const overview = useSalesOverviewQuery(queryParams); const report = useMembershipReportQuery(queryParams); const pending = usePendingPaymentsQuery(queryParams); const all = useAllMembershipsQuery(queryParams);
  const errorMessage = [overview.error, report.error, pending.error, all.error].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';
  const loadAll = useCallback(async () => { await queryClient.invalidateQueries({ queryKey: ManagerSalesQueryKeys.all }); }, [queryClient]);
  return {
    tab, setTab, search, setSearch, customStartDate, setCustomStartDate, customEndDate, setCustomEndDate, currentPage, setCurrentPage,
    overviewData: overview.data ?? initialData?.overviewData ?? [], membershipReport: report.data?.report ?? initialData?.membershipReport ?? [],
    membershipReportTotal: report.data?.report?.length ?? initialData?.membershipReport?.length ?? 0, membershipTotals: report.data?.totals ?? initialData?.membershipTotals ?? { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 },
    pendingPayments: pending.data?.members ?? initialData?.pendingPayments ?? [], pendingTotal: pending.data?.total ?? initialData?.pendingTotal ?? 0,
    allMemberships: all.data?.members ?? initialData?.allMemberships ?? [], allMembershipsTotal: all.data?.total ?? initialData?.allMembershipsTotal ?? 0,
    isPending: overview.isPending || report.isPending || pending.isPending || all.isPending, isError: overview.isError || report.isError || pending.isError || all.isError, errorMessage,
    loadAll, toast: ui.toast, showToast: ui.showToast,
  };
}
