// RESPONSIBILITY: useSalesLogic.ts handles the logic and UI for its corresponding feature.
import { useState, useCallback, useEffect } from 'react';
import { type SalesTab, type DateFilter } from '@/app/erp/sales/sales_utils/SalesSharedConstants';
import { SalesContextType, SalesInitialData } from '@/app/erp/sales/sales_types/sales_types';
import { salesApi } from '@/app/erp/sales/sales_api/sales_api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { useRouter, useSearchParams } from 'next/navigation';

export function useSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<SalesTab>('Overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');
  const [loading, setLoading] = useState(!initialData);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set('search', val); params.set('page', '1'); }
    else { params.delete('search'); params.set('page', '1'); }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const [overviewData, setOverviewData] = useState<any[]>(initialData?.overviewData || []);
  const [membershipReport, setMembershipReport] = useState<any[]>(initialData?.membershipReport || []);
  const [membershipTotals, setMembershipTotals] = useState<any>(initialData?.membershipTotals || {});
  const [pendingPayments, setPendingPayments] = useState<any[]>(initialData?.pendingPayments || []);
  const [pendingTotal, setPendingTotal] = useState(initialData?.pendingTotal || 0);
  const [allMemberships, setAllMemberships] = useState<any[]>(initialData?.allMemberships || []);
  const [allMembershipsTotal, setAllMembershipsTotal] = useState(initialData?.allMembershipsTotal || 0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { limit: '10', page: currentPage.toString() };
      if (debouncedSearch) params.search = debouncedSearch;

      const [overviewRes, reportRes, pendingRes, allRes] = await Promise.all([
        salesApi.getOverview(),
        salesApi.getMembershipReport(),
        salesApi.getPendingPayments(params),
        salesApi.getAllMemberships(params)
      ]);

      setOverviewData(overviewRes.data?.monthlyRevenue || []);
      setMembershipReport(reportRes.data?.report || []);
      setMembershipTotals(reportRes.data?.totals || {});
      
      setPendingPayments(pendingRes.data?.members || []);
      setPendingTotal(pendingRes.data?.total || 0);
      
      setAllMemberships(allRes.data?.members || []);
      setAllMembershipsTotal(allRes.data?.total || 0);

    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Failed to fetch sales data', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    tab, setTab,
    dateFilter, setDateFilter,
    search, setSearch,
    currentPage, setCurrentPage,
    overviewData,
    membershipReport,
    membershipTotals,
    pendingPayments,
    pendingTotal,
    allMemberships,
    allMembershipsTotal,
    loading,
    loadAll,
    toast,
    showToast
  };
}
