export const dynamic = 'force-dynamic';
// RESPONSIBILITY: Server Component entry point; validates initial Sales payloads in the SSR API layer and passes the typed result to the client view.
import AdminSalesMain from '@/app/admin/sales/sales_components/AdminSalesMain/AdminSalesMain';
import { ssrSalesApi } from '@/app/admin/sales/sales_api/AdminSalesServerApi';
import type { SalesInitialData } from '@/app/admin/sales/sales_types/AdminSalesTypes';

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
      ssrSalesApi.fetchStoreSummary({}),
    ]);
    initialData = {
      overviewData: overviewRes.data?.monthlyRevenue || [],
      membershipReport: reportRes.data?.report || [],
      membershipTotals: reportRes.data?.totals || { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 },
      pendingPayments: pendingRes.data?.members || [],
      pendingTotal: pendingRes.data?.total || 0,
      allMemberships: allRes.data?.members || [],
      allMembershipsTotal: allRes.data?.total || 0,
      storeOrders: storeOrdersRes.data?.orders || [],
      storeOrdersTotal: storeOrdersRes.data?.total || 0,
      storeSummary: storeSummaryRes.data?.summary || { totalProducts: 0, totalOrders: 0, totalRevenue: 0, lowStockProducts: [] },
    };
  } catch {
    initialData = null;
  }
  return <AdminSalesMain initialData={initialData} />;
}
