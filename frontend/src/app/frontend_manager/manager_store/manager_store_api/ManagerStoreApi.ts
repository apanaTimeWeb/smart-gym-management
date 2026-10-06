import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { productSchema, orderSchema, storeSummarySchema } from '@/app/frontend_manager/manager_store/manager_store_schemas/ManagerStoreSchema';
import { ManagerStoreUrlConfig } from '@/app/frontend_manager/manager_store/manager_store_url_config';
import type { Product, Order, StoreSummary } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerStoreApi implementation for the store module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_store/manager_store_schemas/ManagerStoreSchema; @/app/frontend_manager/manager_store/manager_store_url_config; @/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerStoreApi = {
  fetchProducts: async (params?: Record<string, string>): Promise<ApiResponse<{ products: Product[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.PRODUCTS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ products: z.array(productSchema), total: z.number() }) });
  },
  createProduct: async (body: Partial<Product>, idempotencyKey: string): Promise<ApiResponse<Product>> => {
    return apiFetch(ManagerStoreUrlConfig.BACKEND_API.PRODUCTS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: productSchema });
  },
  updateProduct: async (id: string, body: Partial<Product>, idempotencyKey: string): Promise<ApiResponse<Product>> => {
    return apiFetch(ManagerStoreUrlConfig.BACKEND_API.PRODUCT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: productSchema });
  },
  deleteProduct: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerStoreUrlConfig.BACKEND_API.PRODUCT_DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  },
  fetchOrders: async (params?: Record<string, string>): Promise<ApiResponse<{ orders: Order[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerStoreUrlConfig.BACKEND_API.ORDERS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ orders: z.array(orderSchema), total: z.number() }) });
  },
  createOrder: async (body: { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string; }, idempotencyKey: string): Promise<ApiResponse<Order>> => {
    return apiFetch(ManagerStoreUrlConfig.BACKEND_API.ORDERS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: orderSchema });
  },
  fetchStoreSummary: async (): Promise<ApiResponse<StoreSummary>> => {
    return apiFetch(ManagerStoreUrlConfig.BACKEND_API.SUMMARY, { dataSchema: storeSummarySchema });
  } };
