// RESPONSIBILITY: Server Component that fetches initial data and acts as the entry point for the Sales module.
import SalesMain from '@/app/admin/sales/sales_components/SalesMain/SalesMain';
import { ssrSalesApi } from '@/app/admin/sales/sales_api/sales_server_api';
import { SalesInitialData } from '@/app/admin/sales/sales_types/sales_types';

export default async function SalesPage() {
  let initialData: SalesInitialData | null = null;
  
  try {
    const params = { limit: '10', page: '1' };
    const [overviewRes, reportRes, pendingRes, allRes] = await Promise.all([
      ssrSalesApi.getOverview(),
      ssrSalesApi.getMembershipReport(),
      ssrSalesApi.getPendingPayments(params),
      ssrSalesApi.getAllMemberships(params)
    ]);
    initialData = {
      overviewData: overviewRes.data?.monthlyRevenue || [],
      membershipReport: reportRes.data?.report || [],
      membershipTotals: reportRes.data?.totals || {},
      pendingPayments: pendingRes.data?.members || [],
      pendingTotal: pendingRes.data?.total || 0,
      allMemberships: allRes.data?.members || [],
      allMembershipsTotal: allRes.data?.total || 0
    };
  } catch (e: unknown) {
    console.error('[SalesPage SSR] Failed to fetch initial data:', e);
  }

  return <SalesMain initialData={initialData} />;
}
