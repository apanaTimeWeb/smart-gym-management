"use client";

// RESPONSIBILITY: Coordinates Admin Sales server data, URL-synchronized filters, and read-only reporting state for the Sales module.

import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesQueryKeys';
// DATA FLOW: AdminSalesApi → TanStack Query → useAdminSalesLogic → useAdminSalesLogic state → Sales components
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdminSalesDebounce } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesDebounce';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/admin_sales_api/AdminSalesApi';
import type { AdminSalesState, PendingPaymentMember, StoreOrder } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';
import type { SalesTab, MembershipFilter } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';
/**
 * @description useAdminSalesLogic: Coordinates Admin Sales server data, URL-synchronized filters, and read-only reporting state for the Sales module.
 * @dependencies Consumes AdminSalesQueryKeys, AdminLayoutBackendMessage, useAdminLayoutDebounce, AdminSalesApi, AdminSalesTypes, AdminSalesConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSalesLogic(): AdminSalesState {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const tab = (searchParams.get('tab') || 'overview') as SalesTab;
  const range = searchParams.get('range') || 'this_month';
  const search = searchParams.get('search') || '';
  const membershipFilter = (searchParams.get('membershipFilter') || 'all') as MembershipFilter;
  const currentPage = Number(searchParams.get('page')) || 1;
  const debouncedSearch = useAdminSalesDebounce(search, 300);

  const updateQuery = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    if (!('page' in updates)) params.set('page', '1');
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => updateQuery({ search: value || null, page: '1' }), [updateQuery]);
  const setTab = useCallback((value: SalesTab) => updateQuery({ tab: value, page: '1' }), [updateQuery]);
  const setCurrentPage = useCallback((page: number) => updateQuery({ page: String(Math.max(1, page)) }), [updateQuery]);
  const setMembershipFilter = useCallback((value: MembershipFilter) => updateQuery({ membershipFilter: value === 'all' ? null : value, page: '1' }), [updateQuery]);
  const refreshData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ADMIN_SALES_QUERY_KEYS.key() });
  }, [queryClient]);

  const queryParams = { limit: '10', page: currentPage.toString(), branchId: selectedBranchId, membershipFilter: membershipFilter === 'all' ? undefined : membershipFilter, ...(debouncedSearch ? { search: debouncedSearch } : {}) };
  const overviewQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('overview', range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchOverview(selectedBranchId, range),
  });
  const referralQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('referrals', range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchReferralSources(selectedBranchId, range),
  });

  const reportQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('membership-report', { search: debouncedSearch }, range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchMembershipReport(selectedBranchId, range, debouncedSearch || undefined),
  });
  const pendingQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('pending-payments', queryParams, range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchPendingPayments({ ...queryParams, range }),
  });
  const allMembershipsQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('all-memberships', queryParams, range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchAllMemberships({ ...queryParams, range }),
  });

  const storeQueryParams = {
    limit: '10',
    page: currentPage.toString(),
    range,
    branchId: selectedBranchId,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };
  const storeOrdersQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('store-orders', storeQueryParams),
    queryFn: () => AdminSalesApi.fetchStoreOrders(storeQueryParams),
  });
  const storeSummaryQuery = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('store-summary', range, selectedBranchId),
    queryFn: () => AdminSalesApi.fetchStoreSummary({ range, branchId: selectedBranchId }),
  });
  return {
    tab,
    setTab,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    membershipFilter,
    setMembershipFilter,
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
    storeError: getAdminBackendMessage(storeOrdersQuery.error) ?? '',
    loadAll: refreshData,
  };
}
