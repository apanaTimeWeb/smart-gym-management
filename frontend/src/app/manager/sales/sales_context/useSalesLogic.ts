// RESPONSIBILITY: Custom hook encapsulating all business logic, async API calls, URL-synced state (search, page), and data for the Sales & Reports module. Feeds SalesContext.
// DATA FLOW: salesApi → useSalesLogic → SalesContext → Sales components
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { type SalesTab, type DateFilter } from '@/app/manager/sales/sales_utils/SalesSharedConstants';
import { SalesContextType, SalesInitialData, FetchState, OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/sales_types';
import type { Member } from '@/app/manager/members/members_types/members_types';
import { salesApi } from '@/app/manager/sales/sales_api/sales_api';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
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
  const [pendingPayments, setPendingPayments] = useState<PendingPaymentMember[]>((initialData?.pendingPayments as PendingPaymentMember[]) || []);
  const [pendingTotal, setPendingTotal] = useState(initialData?.pendingTotal || 0);
  const [allMemberships, setAllMemberships] = useState<Member[]>(initialData?.allMemberships || []);
  const [allMembershipsTotal, setAllMembershipsTotal] = useState(initialData?.allMembershipsTotal || 0);



  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      const params: Record<string, string> = { limit: '10', page: currentPage.toString(), period: dateFilter.toLowerCase() };
      if (debouncedSearch) params.search = debouncedSearch;

      const [overviewRes, reportRes, pendingRes, allRes] = await Promise.all([
        salesApi.getOverview(params),
        salesApi.getMembershipReport(params),
        salesApi.getPendingPayments(params),
        salesApi.getAllMemberships(params)
      ]);

      setOverviewData(Array.isArray(overviewRes.data) ? overviewRes.data : overviewRes.data?.monthlyRevenue || []);
      setMembershipReport(reportRes.data?.report || []);
      setMembershipTotals(reportRes.data?.totals || { activeCount: 0, revenue: 0 });
      
      setPendingPayments((pendingRes.data?.members || []) as PendingPaymentMember[]);  // cast: backend returns generic member shape
      setPendingTotal(pendingRes.data?.total || 0);
      
      setAllMemberships(allRes.data?.members || []);
      setAllMembershipsTotal(allRes.data?.total || 0);
      
      setFetchState('success');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Failed to fetch sales data', 'error');
      setFetchState('error');
    }
  }, [currentPage, debouncedSearch, dateFilter, showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
