"use client";

// RESPONSIBILITY: Coordinates Admin Sales server data, URL-synchronized filters, and read-only reporting state for the Sales module.
// DATA FLOW: AdminSalesApi → TanStack Query → useAdminSalesLogic → AdminSalesContext → Sales components
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdminSalesStore } from '@/app/admin/sales/sales_store/useAdminSalesStore';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useDebounce } from '@/app/admin/admin_utils/useAdminDebounce';
import { salesApi } from '@/app/admin/sales/sales_api/AdminSalesApi';
import type { SalesContextType, SalesInitialData, PendingPaymentMember, StoreOrder } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { SalesTab, DateFilter } from '@/app/admin/sales/sales_utils/AdminSalesSharedConstants';

export function useAdminSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { selectedBranchId } = useAdminGlobalStore();
  const { showToast } = useAdminToastStore();
  useAdminSalesStore();
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
  const reportQuery = useQuery({
    queryKey: ['admin', 'sales', 'membership-report', range, selectedBranchId],
    queryFn: () => salesApi.fetchMembershipReport(selectedBranchId, range),
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

  const storeOrders: StoreOrder[] = [];
  return {
    tab,
    setTab,
    dateFilter: 'This Month' as DateFilter,
    setDateFilter: () => {},
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    overviewData: overviewQuery.data?.data?.monthlyRevenue || [],
    membershipReport: reportQuery.data?.data?.report || [],
    membershipTotals: reportQuery.data?.data?.totals || { activeCount: 0, revenue: 0 },
    pendingPayments: (pendingQuery.data?.data?.members || []) as PendingPaymentMember[],
    pendingTotal: pendingQuery.data?.data?.total || 0,
    allMemberships: allMembershipsQuery.data?.data?.members || [],
    allMembershipsTotal: allMembershipsQuery.data?.data?.total || 0,
    storeOrders,
    storeOrdersTotal: 0,
    storeSummary: null,
    status: overviewQuery.status,
    loadAll: refreshData,
    showToast,
  };
}
