// RESPONSIBILITY: Server-side API fetching for the store module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { ManagerStoreUrlConfig } from '@/app/manager/store/store_url_config';
import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';

export const ssrStoreApi = {
  fetchProducts: () => ssrApiFetch<ApiResponse<{ products: Product[]; total: number }>>(ManagerStoreUrlConfig.BACKEND_API.PRODUCTS_BASE),
  fetchOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<{ orders: Order[]; total: number }>>(`${ManagerStoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  fetchStoreSummary: () => ssrApiFetch<ApiResponse<StoreSummary>>(ManagerStoreUrlConfig.BACKEND_API.SUMMARY),
};
