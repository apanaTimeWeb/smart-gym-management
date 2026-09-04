// RESPONSIBILITY: Custom hook encapsulating all business logic, async API calls, URL-synced state (search, page), and data for the Sales & Reports module. Feeds ManagerSalesContext.
// DATA FLOW: salesApi → useManagerSalesLogic → ManagerSalesContext → Sales components
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { type SalesTab, type DateFilter } from '@/app/manager/sales/sales_utils/ManagerSalesSharedConstants';
import { SalesContextType, SalesInitialData, FetchState, OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { salesApi } from '@/app/manager/sales/sales_api/ManagerSalesApi';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useManagerSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tab = (searchParams.get('tab') || 'Overview') as SalesTab;
  const dateFilter = (searchParams.get('dateFilter') || 'This Month') as DateFilter;
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const debouncedSearch = useDebounce(search, 300);

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set('search', val); params.set('page', '1'); }
    else { params.delete('search'); params.set('page', '1'); }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const setTab = useCallback((val: SalesTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', val);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const setDateFilter = useCallback((val: DateFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('dateFilter', val);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

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
