import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { productSchema, orderSchema, storeSummarySchema } from '@/app/manager/store/store_types/ManagerStoreSchema';
import { z } from 'zod';

export const storeApi = {
  getProducts: async (params?: Record<string, string>): Promise<ApiResponse<{ products: Product[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/store/products${query ? `?${query}` : ''}`, { dataSchema: z.object({ products: z.array(productSchema), total: z.number() }) });
  },
  createProduct: async (body: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiFetch(`/manager/store/products`, { method: 'POST', body: JSON.stringify(body), dataSchema: productSchema });
  },
  updateProduct: async (id: string, body: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiFetch(`/manager/store/products/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: productSchema });
  },
  removeProduct: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`/manager/store/products/${id}`, { method: 'DELETE' });
  },
  getOrders: async (params?: Record<string, string>): Promise<ApiResponse<{ orders: Order[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/store/orders${query ? `?${query}` : ''}`, { dataSchema: z.object({ orders: z.array(orderSchema), total: z.number() }) });
  },
  createOrder: async (body: { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string; }): Promise<ApiResponse<Order>> => {
    return apiFetch(`/manager/store/orders`, { method: 'POST', body: JSON.stringify(body), dataSchema: orderSchema });
  },
  getStoreSummary: async (): Promise<ApiResponse<StoreSummary>> => {
    return apiFetch(`/manager/store/summary`, { dataSchema: storeSummarySchema });
  },
};
