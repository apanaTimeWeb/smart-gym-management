export const dynamic = 'force-dynamic';
// RESPONSIBILITY: Server Component that fetches initial data and acts as the entry point for the Sales module.
import AdminSalesMain from '@/app/admin/sales/sales_components/AdminSalesMain/AdminSalesMain';
import { ssrSalesApi } from '@/app/admin/sales/sales_api/AdminSalesServerApi';
import type { SalesInitialData, OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member, StoreOrder, StoreSummary } from '@/app/admin/sales/sales_types/AdminSalesTypes';

export default async function SalesPage() {
  let initialData: SalesInitialData | null = null;
  
  try {
    const params = { limit: '10', page: '1' };
    const [overviewRes, reportRes, pendingRes, allRes, storeOrdersRes, storeSummaryRes] = await Promise.all([
      ssrSalesApi.fetchOverview(),
      ssrSalesApi.fetchMembershipReport(),
      ssrSalesApi.fetchPendingPayments(params),
      ssrSalesApi.fetchAllMemberships(params),
      ssrSalesApi.fetchStoreOrders(params),
      ssrSalesApi.fetchStoreSummary({})
    ]);
    initialData = {
      overviewData: (overviewRes.data?.monthlyRevenue as unknown as OverviewDataPoint[]) || [],
      membershipReport: (reportRes.data?.report as unknown as MembershipReportItem[]) || [],
      membershipTotals: (reportRes.data?.totals as unknown as MembershipTotals) || {},
      pendingPayments: (pendingRes.data?.members as unknown as PendingPaymentMember[]) || [],
      pendingTotal: (pendingRes.data?.total as number) || 0,
      allMemberships: (allRes.data?.members as unknown as Member[]) || [],
      allMembershipsTotal: (allRes.data?.total as number) || 0,
      storeOrders: (storeOrdersRes.data?.orders as unknown as StoreOrder[]) || [],
      storeOrdersTotal: (storeOrdersRes.data?.total as number) || 0,
      storeSummary: (storeSummaryRes.data?.summary as unknown as StoreSummary) || null
    };
  } catch (e: unknown) {
    // Silently ignore or rely on global error boundary
  }

  return (
      <AdminSalesMain initialData={initialData} />
  );
}
