import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminStoreUrlConfig } from "@/app/admin/store/store_url_config";
import type { AdminProduct, AdminOrder, AdminStoreStats } from "@/app/admin/store/store_types/admin_store_types";
export const adminStoreApi = {
  getProducts: () => apiFetch<ApiResponse<AdminProduct[]>>(AdminStoreUrlConfig.BACKEND_API.PRODUCTS),
  getOrders: () => apiFetch<ApiResponse<AdminOrder[]>>(AdminStoreUrlConfig.BACKEND_API.ORDERS),
  getStats: () => apiFetch<ApiResponse<AdminStoreStats>>(AdminStoreUrlConfig.BACKEND_API.STATS),
  createProduct: (body: Partial<AdminProduct>) => apiFetch<ApiResponse<AdminProduct>>(AdminStoreUrlConfig.BACKEND_API.PRODUCTS, { method: "POST", body: JSON.stringify(body) }),
  updateProduct: (id: string, body: Partial<AdminProduct>) => apiFetch<ApiResponse<AdminProduct>>(AdminStoreUrlConfig.BACKEND_API.UPDATE_PRODUCT(id), { method: "PATCH", body: JSON.stringify(body) }),
  deleteProduct: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminStoreUrlConfig.BACKEND_API.DELETE_PRODUCT(id), { method: "DELETE" }),
  checkout: (body: unknown) => apiFetch<ApiResponse<AdminOrder>>(AdminStoreUrlConfig.BACKEND_API.CHECKOUT, { method: "POST", body: JSON.stringify(body) }),
};
