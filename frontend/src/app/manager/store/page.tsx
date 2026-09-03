// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Gym Store module entry point.
import ManagerStoreMain from '@/app/manager/store/store_components/ManagerStoreMain/ManagerStoreMain';
import { ssrStoreApi } from '@/app/manager/store/store_api/store_server_api';
import type { StoreInitialData } from '@/app/manager/store/store_types/store_types';

export default async function StorePage() {
  let initialData: StoreInitialData | undefined = undefined;
  
  try {
    const [productsRes, ordersRes, summaryRes] = await Promise.all([
      ssrStoreApi.getProducts(),
      ssrStoreApi.getOrders({ limit: '10', page: '1' }),
      ssrStoreApi.getStoreSummary(),
    ]);
    initialData = {
      products: productsRes.data?.products || productsRes.data || [],
      orders: ordersRes.data?.orders || [],
      totalOrders: ordersRes.data?.total || 0,
      summary: summaryRes.data || { revenue: 0, lowStock: 0 }
    } as unknown as StoreInitialData;
  } catch (e) {
    // console.error('Failed to fetch store initial data:', e);
  }

  return <ManagerStoreMain initialData={initialData} />;
}
