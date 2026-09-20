"use client";

// RESPONSIBILITY: Coordinates Admin Sales server data, URL-synchronized filters, and read-only reporting state for the Sales module.
// DATA FLOW: AdminSalesApi → TanStack Query → useAdminSalesLogic → AdminSalesContext → Sales components
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import { salesApi } from '@/app/admin/sales/sales_api/AdminSalesApi';
import type { SalesContextType, SalesInitialData, PendingPaymentMember, StoreOrder } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { SalesTab } from '@/app/admin/sales/sales_utils/AdminSalesUiConstants';

/** Coordinates SalesLogic state, data flow, and feature behavior. */
export function useAdminSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const tab = (searchParams.get('tab') || 'Overview') as SalesTab;
  const range = searchParams.get('range') || 'this_month';
  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const debouncedSearch = useDebounce(search, 300);

  const updateQuery = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    if (!('page' in updates)) params.set('page', '1');
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => updateQuery({ search: value || null, page: '1' }), [updateQuery]);
  const setTab = useCallback((value: SalesTab) => updateQuery({ tab: value, page: '1' }), [updateQuery]);
  const setCurrentPage = useCallback((page: number) => updateQuery({ page: String(Math.max(1, page)) }), [updateQuery]);
  const refreshData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin', 'sales'] });
  }, [queryClient]);

  const queryParams = { limit: '10', page: currentPage.toString(), branchId: selectedBranchId, ...(debouncedSearch ? { search: debouncedSearch } : {}) };
  const overviewQuery = useQuery({
    queryKey: ['admin', 'sales', 'overview', range, selectedBranchId],
    queryFn: () => salesApi.fetchOverview(selectedBranchId, range),
    initialData: initialData?.overviewData ? { success: true, message: 'SSR', data: { monthlyRevenue: initialData.overviewData } } : undefined,
  });
  const referralQuery = useQuery({
    queryKey: ['admin', 'sales', 'referrals', range, selectedBranchId],
    queryFn: () => salesApi.fetchReferralSources(selectedBranchId, range),
  });

  const reportQuery = useQuery({
    queryKey: ['admin', 'sales', 'membership-report', { search: debouncedSearch }, range, selectedBranchId],
    queryFn: () => salesApi.fetchMembershipReport(selectedBranchId, range, debouncedSearch || undefined),
    initialData: initialData?.membershipReport ? { success: true, message: 'SSR', data: { report: initialData.membershipReport, totals: initialData.membershipTotals || {} } } : undefined,
  });
  const pendingQuery = useQuery({
    queryKey: ['admin', 'sales', 'pending-payments', queryParams, range, selectedBranchId],
    queryFn: () => salesApi.fetchPendingPayments({ ...queryParams, range }),
    initialData: initialData?.pendingPayments ? { success: true, message: 'SSR', data: { members: initialData.pendingPayments, total: initialData.pendingTotal || 0 } } : undefined,
  });
  const allMembershipsQuery = useQuery({
    queryKey: ['admin', 'sales', 'all-memberships', queryParams, range, selectedBranchId],
    queryFn: () => salesApi.fetchAllMemberships({ ...queryParams, range }),
    initialData: initialData?.allMemberships ? { success: true, message: 'SSR', data: { members: initialData.allMemberships, total: initialData.allMembershipsTotal || 0 } } : undefined,
  });

  const storeQueryParams = {
    limit: '10',
    page: currentPage.toString(),
    range,
    branchId: selectedBranchId,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };
  const storeOrdersQuery = useQuery({
    queryKey: ['admin', 'sales', 'store-orders', storeQueryParams],
    queryFn: () => salesApi.fetchStoreOrders(storeQueryParams),
    initialData: initialData?.storeOrders ? {
      success: true, message: 'SSR', data: { orders: initialData.storeOrders, total: initialData.storeOrdersTotal || initialData.storeOrders.length },
    } : undefined,
  });
  const storeSummaryQuery = useQuery({
    queryKey: ['admin', 'sales', 'store-summary', range, selectedBranchId],
    queryFn: () => salesApi.fetchStoreSummary({ range, branchId: selectedBranchId }),
    initialData: initialData?.storeSummary ? { success: true, message: 'SSR', data: { summary: initialData.storeSummary } } : undefined,
  });
  return {
    tab,
    setTab,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    overviewData: overviewQuery.data?.data?.monthlyRevenue || [],
    referralData: referralQuery.data?.data || [],
    membershipReport: reportQuery.data?.data?.report || [],
    membershipTotals: reportQuery.data?.data?.totals || { activeCount: 0, revenue: 0 },
    pendingPayments: (pendingQuery.data?.data?.members || []) as PendingPaymentMember[],
    pendingTotal: pendingQuery.data?.data?.total || 0,
    allMemberships: allMembershipsQuery.data?.data?.members || [],
    allMembershipsTotal: allMembershipsQuery.data?.data?.total || 0,
    storeOrders: storeOrdersQuery.data?.data?.orders || [],
    storeOrdersTotal: storeOrdersQuery.data?.data?.total || 0,
    storeSummary: storeSummaryQuery.data?.data?.summary || null,
    status: overviewQuery.status,
    storeStatus: storeOrdersQuery.status,
    storeError: storeOrdersQuery.error instanceof Error ? storeOrdersQuery.error.message : '',
    loadAll: refreshData,
  };
}
