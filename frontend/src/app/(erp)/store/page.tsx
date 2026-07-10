import StoreMain from '@/app/(erp)/store/store_components/StoreMain/StoreMain';
import { ssrStoreApi } from '@/lib/server-api';

export default async function StorePage() {
  let initialData = undefined;
  
  try {
    const [productsRes, ordersRes, summaryRes] = await Promise.all([
      ssrStoreApi.getProducts(),
      ssrStoreApi.getOrders({ limit: '100' }),
      ssrStoreApi.getStoreSummary(),
    ]);
    initialData = {
      products: Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data as any).products || [],
      orders: ordersRes.data.orders || [],
      summary: summaryRes.data || null
    };
  } catch (e) {
    console.error('Failed to fetch store initial data:', e);
  }

  return <StoreMain initialData={initialData} />;
}
