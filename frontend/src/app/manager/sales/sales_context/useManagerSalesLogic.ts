// RESPONSIBILITY: Custom hook encapsulating all business logic, async API calls, URL-synced state (search, page), and data for the Sales & Reports module. Feeds ManagerSalesContext.
// DATA FLOW: useManagerSalesQueries → useManagerSalesLogic → ManagerSalesContext → Sales components
import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { type SalesTab, type DateFilter } from '@/app/manager/sales/sales_utils/ManagerSalesSharedConstants';
import type { SalesContextType, SalesInitialData, FetchState } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { 
  useSalesOverviewQuery, 
  useMembershipReportQuery, 
  usePendingPaymentsQuery, 
  useAllMembershipsQuery 
} from '@/app/manager/sales/sales_api/useManagerSalesQueries';

export function useManagerSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tab = (searchParams.get('tab') || 'Revenue Overview') as SalesTab;
  const dateFilter = (searchParams.get('dateFilter') || 'This Month') as DateFilter;
  
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const customStartDate = searchParams.get('startDate') || '';
  const customEndDate = searchParams.get('endDate') || '';
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

  const setCustomStartDate = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('startDate', val);
    else params.delete('startDate');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const setCustomEndDate = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('endDate', val);
    else params.delete('endDate');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const setDateFilter = useCallback((val: DateFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== 'This Month') params.set('dateFilter', val);
    else params.delete('dateFilter');
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

  const queryParams = useMemo(() => {
    const range = searchParams.get('range') || 'this_month';
    const params: Record<string, string> = { limit: '10', page: currentPage.toString(), range };
    if (range === 'custom') {
      const customStartDate = searchParams.get('startDate');
      const customEndDate = searchParams.get('endDate');
      if (customStartDate) params.startDate = customStartDate;
      if (customEndDate) params.endDate = customEndDate;
    }
    if (debouncedSearch) params.search = debouncedSearch;
    return params;
  }, [currentPage, debouncedSearch, searchParams]);

  // TanStack Queries
  const { data: overviewData = initialData?.overviewData || [], isLoading: isLoadingOverview, isError: isErrorOverview } = useSalesOverviewQuery(queryParams);
  const { data: reportData, isLoading: isLoadingReport, isError: isErrorReport } = useMembershipReportQuery(queryParams);
  const { data: pendingData, isLoading: isLoadingPending, isError: isErrorPending } = usePendingPaymentsQuery(queryParams);
  const { data: allData, isLoading: isLoadingAll, isError: isErrorAll } = useAllMembershipsQuery(queryParams);

  const fetchState: FetchState = (isLoadingOverview || isLoadingReport || isLoadingPending || isLoadingAll) 
    ? 'loading' 
    : (isErrorOverview || isErrorReport || isErrorPending || isErrorAll) 
      ? 'error' 
      : 'success';

  return {
    tab, setTab,
    dateFilter, setDateFilter,
    search, setSearch,
    customStartDate, setCustomStartDate,
    customEndDate, setCustomEndDate,
    currentPage, setCurrentPage,
    overviewData,
    membershipReport: reportData?.report || initialData?.membershipReport || [],
    membershipTotals: reportData?.totals || initialData?.membershipTotals || { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 },
    pendingPayments: pendingData?.members || initialData?.pendingPayments || [],
    pendingTotal: pendingData?.total || initialData?.pendingTotal || 0,
    allMemberships: allData?.members || initialData?.allMemberships || [],
    allMembershipsTotal: allData?.total || initialData?.allMembershipsTotal || 0,
    
    fetchState,
    loadAll: async () => {}, // No-op, data fetching is now handled by TanStack Query automatically
    toast,
    showToast
  };
}
