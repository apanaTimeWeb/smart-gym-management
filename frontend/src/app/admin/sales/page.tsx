// RESPONSIBILITY: Server Component that fetches initial data and acts as the entry point for the Sales module.
import AdminSalesMain from '@/app/admin/sales/sales_components/AdminSalesMain/AdminSalesMain';
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
      overviewData: (overviewRes.data?.monthlyRevenue as any) || [],
      membershipReport: (reportRes.data?.report as any) || [],
      membershipTotals: (reportRes.data?.totals as any) || {},
      pendingPayments: (pendingRes.data?.members as any) || [],
      pendingTotal: (pendingRes.data?.total as number) || 0,
      allMemberships: (allRes.data?.members as any) || [],
      allMembershipsTotal: (allRes.data?.total as number) || 0
    };
  } catch (e: unknown) {
    console.error('[SalesPage SSR] Failed to fetch initial data:', e);
  }

  return <AdminSalesMain initialData={initialData} />;
}
