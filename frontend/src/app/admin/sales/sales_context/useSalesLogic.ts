// RESPONSIBILITY: Custom hook encapsulating all business logic, async API calls, URL-synced state (search, page), and data for the Sales & Reports module. Feeds SalesContext.
// DATA FLOW: salesApi → useSalesLogic → SalesContext → Sales components
import { useCallback } from 'react';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { type SalesTab, type DateFilter } from '@/app/admin/sales/sales_utils/SalesSharedConstants';
import type { SalesContextType, SalesInitialData, FetchState, OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, StoreOrder, StoreSummary } from '@/app/admin/sales/sales_types/sales_types';
import type { Member } from '@/app/admin/sales/sales_types/sales_types';
import { salesApi } from '@/app/admin/sales/sales_api/sales_api';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSalesLogic(initialData?: SalesInitialData | null): SalesContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tab = (searchParams.get('tab') || 'Overview') as SalesTab;
  const dateFilter = (searchParams.get('dateFilter') || 'This Month') as DateFilter;
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

  // Remove custom toast state in favor of react-hot-toast, but we'll return a mock showToast for compatibility with context if needed, or update Context.
  // The plan said "Ensure backend-driven toasts (`res.message`)". We'll use react-hot-toast directly in mutations.
  // For context backward compatibility:
  const showToast = useCallback((message: string, type: ToastType) => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  }, []);

  const queryParams = { limit: '10', page: currentPage.toString(), ...(debouncedSearch ? { search: debouncedSearch } : {}) };

  const { data: overviewRes, isLoading: overviewLoading } = useQuery({
    queryKey: ['salesOverview', dateFilter],
    queryFn: () => salesApi.fetchOverview(),
  });

  const { data: reportRes, isLoading: reportLoading } = useQuery({
    queryKey: ['salesMembershipReport', dateFilter],
    queryFn: () => salesApi.fetchMembershipReport(),
  });

  const { data: pendingRes, isLoading: pendingLoading } = useQuery({
    queryKey: ['salesPendingPayments', queryParams, dateFilter],
    queryFn: () => salesApi.fetchPendingPayments(queryParams),
  });

  const { data: allMembershipsRes, isLoading: allMembershipsLoading } = useQuery({
    queryKey: ['salesAllMemberships', queryParams, dateFilter],
    queryFn: () => salesApi.fetchAllMemberships(queryParams),
  });

  const isLoading = overviewLoading || reportLoading || pendingLoading || allMembershipsLoading;
  const fetchState: FetchState = isLoading ? 'loading' : 'success';

  // Store sales - mock data
  const storeOrders = [
    { id: 'so1', total: 850, method: 'Cash', status: 'completed', createdAt: new Date().toISOString(), items: [{ id: 'i1', qty: 2, price: 350, product: { name: 'Protein Powder' } }, { id: 'i2', qty: 1, price: 150, product: { name: 'Gym Gloves' } }] },
    { id: 'so2', total: 1200, method: 'UPI', status: 'completed', createdAt: new Date().toISOString(), items: [{ id: 'i3', qty: 1, price: 1200, product: { name: 'Resistance Bands Set' } }] },
    { id: 'so3', total: 450, method: 'Card', status: 'completed', createdAt: new Date(Date.now() - 86400000).toISOString(), items: [{ id: 'i4', qty: 3, price: 150, product: { name: 'Gym Gloves' } }] },
  ];

  return {
    tab, setTab,
    dateFilter, setDateFilter,
    search, setSearch,
    currentPage, setCurrentPage,
    overviewData: overviewRes?.data?.monthlyRevenue || [],
    membershipReport: reportRes?.data?.report || [],
    membershipTotals: reportRes?.data?.totals || { activeCount: 0, revenue: 0 },
    pendingPayments: (pendingRes?.data?.members || []) as PendingPaymentMember[],
    pendingTotal: pendingRes?.data?.total || 0,
    allMemberships: allMembershipsRes?.data?.members || [],
    allMembershipsTotal: allMembershipsRes?.data?.total || 0,
    storeOrders,
    storeOrdersTotal: 3,
    storeSummary: { totalProducts: 18, totalOrders: 142, totalRevenue: 89500, lowStockProducts: [] },
    fetchState,
    loadAll: async () => {}, // Mocked to do nothing since React Query handles refetching automatically
    toast: null,
    showToast
  };
}
