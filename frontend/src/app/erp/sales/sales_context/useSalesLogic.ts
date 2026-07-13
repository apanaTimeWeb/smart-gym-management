// RESPONSIBILITY: useSalesLogic.ts handles the logic and UI for its corresponding feature.
import { useState, useCallback, useEffect } from 'react';
import { type SalesTab, type DateFilter } from '@/app/erp/sales/sales_utils/SalesSharedConstants';
import { SalesContextType, SalesInitialData, FetchState, OverviewDataPoint, MembershipReportItem, MembershipTotals } from '@/app/erp/sales/sales_types/sales_types';
import type { Member } from '@/app/erp/members/members_types/members_types';
import { salesApi } from '@/app/erp/sales/sales_api/sales_api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { useRouter, useSearchParams } from 'next/navigation';

export function useSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<SalesTab>('Overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const debouncedSearch = useDebounce(search, 300);

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

  const [overviewData, setOverviewData] = useState<OverviewDataPoint[]>(initialData?.overviewData || []);
  const [membershipReport, setMembershipReport] = useState<MembershipReportItem[]>(initialData?.membershipReport || []);
  const [membershipTotals, setMembershipTotals] = useState<MembershipTotals>(initialData?.membershipTotals || { activeCount: 0, revenue: 0 });
  const [pendingPayments, setPendingPayments] = useState<Member[]>(initialData?.pendingPayments || []);
  const [pendingTotal, setPendingTotal] = useState(initialData?.pendingTotal || 0);
  const [allMemberships, setAllMemberships] = useState<Member[]>(initialData?.allMemberships || []);
  const [allMembershipsTotal, setAllMembershipsTotal] = useState(initialData?.allMembershipsTotal || 0);



  const loadAll = useCallback(async () => {
    setFetchState('loading');
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
      setMembershipTotals(reportRes.data?.totals || { activeCount: 0, revenue: 0 });
      
      setPendingPayments(pendingRes.data?.members || []);
      setPendingTotal(pendingRes.data?.total || 0);
      
      setAllMemberships(allRes.data?.members || []);
      setAllMembershipsTotal(allRes.data?.total || 0);

    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Failed to fetch sales data', 'error');
      setFetchState('error');
    } finally {
      setFetchState('success');
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
    fetchState,
    loadAll,
    toast,
    showToast
  };
}
