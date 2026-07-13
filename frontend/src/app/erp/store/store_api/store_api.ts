// RESPONSIBILITY: Provides strongly-typed network calls for the store module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { StoreUrlConfig } from '@/app/erp/store/store_url_config';
import type { Product, Order, StoreSummary } from '@/app/erp/store/store_types/store_types';

export const storeApi = {
  getProducts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ products: Product[]; total: number }>>(`${StoreUrlConfig.BACKEND_API.PRODUCTS_BASE}${q}`);
  },
  createProduct: (body: Partial<Product>) =>
    apiFetch<ApiResponse<Product>>(StoreUrlConfig.BACKEND_API.PRODUCTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id: number, body: Partial<Product>) =>
    apiFetch<ApiResponse<Product>>(StoreUrlConfig.BACKEND_API.PRODUCT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeProduct: (id: number) => apiFetch<ApiResponse<{ id: number }>>(StoreUrlConfig.BACKEND_API.PRODUCT_DELETE(id), { method: 'DELETE' }),
  getOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ orders: Order[]; total: number }>>(`${StoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  createOrder: (body: { items: { productId: number; qty: number }[]; method: string; notes?: string }) =>
    apiFetch<ApiResponse<Order>>(StoreUrlConfig.BACKEND_API.ORDERS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  getStoreSummary: () => apiFetch<ApiResponse<StoreSummary>>(StoreUrlConfig.BACKEND_API.SUMMARY),
};
