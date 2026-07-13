// RESPONSIBILITY: Server-side API fetching for the store module.
import { ssrApiFetch } from '@/lib/server-api';
import { StoreUrlConfig } from '@/app/erp/store/store_url_config';
import type { Product, Order, StoreSummary } from '@/app/erp/store/store_types/store_types';

export const ssrStoreApi = {
  getProducts: () => ssrApiFetch<{ success: boolean; data: { products: Product[]; total: number } }>(StoreUrlConfig.BACKEND_API.PRODUCTS_BASE),
  getOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: { orders: Order[]; total: number } }>(`${StoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  getStoreSummary: () => ssrApiFetch<{ success: boolean; data: StoreSummary }>(StoreUrlConfig.BACKEND_API.SUMMARY),
};
