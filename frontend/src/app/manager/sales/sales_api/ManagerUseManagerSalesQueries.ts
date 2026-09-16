// DATA FLOW: Manager module state/API data → useManagerSalesQueries → owning Manager UI components.
// RESPONSIBILITY: Provides TanStack Query hooks for Manager Sales data fetching, caching, and state management.
/** Manages UseSalesQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { salesApi } from '@/app/manager/sales/sales_api/ManagerSalesApi';

export const managerSalesQueryKeys = {
  all: ['manager', 'sales'] as const,
  overview: (params?: Record<string, string>) => [...managerSalesQueryKeys.all, 'overview', params] as const,
  membershipReport: (params?: Record<string, string>) => [...managerSalesQueryKeys.all, 'membership_report', params] as const,
  pendingPayments: (params?: Record<string, string>) => [...managerSalesQueryKeys.all, 'pending_payments', params] as const,
  allMemberships: (params?: Record<string, string>) => [...managerSalesQueryKeys.all, 'all_memberships', params] as const,
};

export function useSalesOverviewQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerSalesQueryKeys.overview(params),
    queryFn: () => salesApi.fetchSalesOverview(params).then(res => res.data?.monthlyRevenue || []),
  });
}

export function useMembershipReportQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerSalesQueryKeys.membershipReport(params),
    queryFn: () => salesApi.fetchMembershipReport(params).then(res => ({
      report: res.data?.report || [],
      totals: res.data?.totals || { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 }
    })),
  });
}

export function usePendingPaymentsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerSalesQueryKeys.pendingPayments(params),
    queryFn: () => salesApi.fetchPendingPayments(params).then(res => ({
      members: res.data?.members || [],
      total: res.data?.total || 0
    })),
  });
}

export function useAllMembershipsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerSalesQueryKeys.allMemberships(params),
    queryFn: () => salesApi.fetchAllMemberships(params).then(res => ({
      members: res.data?.members || [],
      total: res.data?.total || 0
    })),
  });
}
