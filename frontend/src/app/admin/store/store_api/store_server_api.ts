// RESPONSIBILITY: Server-side API fetching for the store module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { StoreUrlConfig } from '@/app/admin/store/store_url_config';
import type { Product, Order, StoreSummary } from '@/app/admin/store/store_types/store_types';

export const ssrStoreApi = {
  getProducts: () => ssrApiFetch<ApiResponse<{ products: Product[]; total: number }>>(StoreUrlConfig.BACKEND_API.PRODUCTS_BASE),
  getOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<{ orders: Order[]; total: number }>>(`${StoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  getStoreSummary: () => ssrApiFetch<ApiResponse<StoreSummary>>(StoreUrlConfig.BACKEND_API.SUMMARY),
};
