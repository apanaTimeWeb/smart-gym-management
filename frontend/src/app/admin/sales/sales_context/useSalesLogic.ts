// RESPONSIBILITY: Custom hook encapsulating all business logic, async API calls, URL-synced state (search, page), and data for the Sales & Reports module. Feeds SalesContext.
// DATA FLOW: salesApi → useSalesLogic → SalesContext → Sales components
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { type SalesTab, type DateFilter } from '@/app/admin/sales/sales_utils/SalesSharedConstants';
import type { SalesContextType, SalesInitialData, FetchState, OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, StoreOrder, StoreSummary } from '@/app/admin/sales/sales_types/sales_types';
import type { Member } from '@/app/admin/sales/sales_types/sales_types';
import { salesApi } from '@/app/admin/sales/sales_api/sales_api';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
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
  const [storeOrders, setStoreOrders] = useState<StoreOrder[]>(initialData?.storeOrders || []);
  const [storeOrdersTotal, setStoreOrdersTotal] = useState(initialData?.storeOrdersTotal || 0);
  const [storeSummary, setStoreSummary] = useState<StoreSummary | null>(initialData?.storeSummary || null);



  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      const params: Record<string, string> = { limit: '10', page: currentPage.toString() };
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
      
      setPendingPayments((pendingRes.data?.members || []) as PendingPaymentMember[]);  // cast: backend returns generic member shape
      setPendingTotal(pendingRes.data?.total || 0);
      
      setAllMemberships(allRes.data?.members || []);
      setAllMembershipsTotal(allRes.data?.total || 0);
      
      // Store sales - mock data until store API is connected
      setStoreOrders([
        { id: 'so1', total: 850, method: 'Cash', status: 'completed', createdAt: new Date().toISOString(), items: [{ id: 'i1', qty: 2, price: 350, product: { name: 'Protein Powder' } }, { id: 'i2', qty: 1, price: 150, product: { name: 'Gym Gloves' } }] },
        { id: 'so2', total: 1200, method: 'UPI', status: 'completed', createdAt: new Date().toISOString(), items: [{ id: 'i3', qty: 1, price: 1200, product: { name: 'Resistance Bands Set' } }] },
        { id: 'so3', total: 450, method: 'Card', status: 'completed', createdAt: new Date(Date.now() - 86400000).toISOString(), items: [{ id: 'i4', qty: 3, price: 150, product: { name: 'Gym Gloves' } }] },
      ]);
      setStoreOrdersTotal(3);
      setStoreSummary({ totalProducts: 18, totalOrders: 142, totalRevenue: 89500, lowStockProducts: [] });
      
      setFetchState('success');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Failed to fetch sales data', 'error');
      setFetchState('error');
    }
  }, [currentPage, debouncedSearch, dateFilter, showToast]);

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    loadAll();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

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
    storeOrders,
    storeOrdersTotal,
    storeSummary,
    fetchState,
    loadAll,
    toast,
    showToast
  };
}
