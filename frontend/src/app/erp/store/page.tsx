// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import StoreMain from '@/app/erp/store/store_components/StoreMain/StoreMain';
import { ssrStoreApi } from '@/app/erp/store/store_api/store_server_api';

export default async function StorePage() {
  let initialData = undefined;
  
  try {
    const [productsRes, ordersRes, summaryRes] = await Promise.all([
      ssrStoreApi.getProducts(),
      ssrStoreApi.getOrders({ limit: '10', page: '1' }),
      ssrStoreApi.getStoreSummary(),
    ]);
    initialData = {
      products: Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data as any).products || [],
      orders: ordersRes.data.orders || [],
      totalOrders: ordersRes.data.total || 0,
      summary: summaryRes.data || null
    };
  } catch (e) {
    // console.error('Failed to fetch store initial data:', e);
  }

  return <StoreMain initialData={initialData} />;
}
