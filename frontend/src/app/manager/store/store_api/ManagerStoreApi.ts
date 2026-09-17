import { ManagerStoreUrlConfig } from '@/app/manager/store/store_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { productSchema, orderSchema, storeSummarySchema } from '@/app/manager/store/store_types/ManagerStoreSchema';
import { z } from 'zod';

export const storeApi = {
  fetchProducts: async (params?: Record<string, string>): Promise<ApiResponse<{ products: Product[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/products${query ? `?${query}` : ''}`, { dataSchema: z.object({ products: z.array(productSchema), total: z.number() }) });
  },
  createProduct: async (body: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/products`, { method: 'POST', body: JSON.stringify(body), dataSchema: productSchema });
  },
  updateProduct: async (id: string, body: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/products/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: productSchema });
  },
  deleteProduct: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/products/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) });
  },
  fetchOrders: async (params?: Record<string, string>): Promise<ApiResponse<{ orders: Order[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/orders${query ? `?${query}` : ''}`, { dataSchema: z.object({ orders: z.array(orderSchema), total: z.number() }) });
  },
  createOrder: async (body: { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string; }): Promise<ApiResponse<Order>> => {
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/orders`, { method: 'POST', body: JSON.stringify(body), dataSchema: orderSchema });
  },
  fetchStoreSummary: async (): Promise<ApiResponse<StoreSummary>> => {
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.BASE}/summary`, { dataSchema: storeSummarySchema });
  },
};
