// RESPONSIBILITY: Provides strongly-typed network calls for the store module.
import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_STORE_SUMMARY } from '@/app/manager/store/store_fixtures/ManagerStoreMockData';

export const storeApi = {
  getProducts: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length } };
  },
  createProduct: async (body: Partial<Product>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Created', data: MOCK_PRODUCTS[0] };
  },
  updateProduct: async (id: string, body: Partial<Product>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Updated', data: MOCK_PRODUCTS[0] };
  },
  removeProduct: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Removed', data: { id } };
  },
  getOrders: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { orders: MOCK_ORDERS, total: MOCK_ORDERS.length } };
  },
  createOrder: async (body: { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string; }) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Created', data: MOCK_ORDERS[0] };
  },
  getStoreSummary: async () => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_STORE_SUMMARY };
  },
};
