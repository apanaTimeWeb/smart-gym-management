// RESPONSIBILITY: Owns every route path used by the Manager store module.
/**
 * @description Canonical Manager store URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_STORE_PAGES_PRODUCTS_URL = '/frontend_manager/manager_store';
export const MANAGER_STORE_PAGES_ORDERS_URL = '/frontend_manager/manager_store';
export const MANAGER_STORE_BACKEND_API_BASE_URL = '/frontend_manager/manager_store';
export const MANAGER_STORE_BACKEND_API_PRODUCTS_BASE_URL = '/frontend_manager/manager_store/products';
export const MANAGER_STORE_BACKEND_API_PRODUCT_UPDATE_URL = (id: string) => `/frontend_manager/manager_store/products/${id}`;
export const MANAGER_STORE_BACKEND_API_PRODUCT_DELETE_URL = (id: string) => `/frontend_manager/manager_store/products/${id}`;
export const MANAGER_STORE_BACKEND_API_ORDERS_BASE_URL = '/frontend_manager/manager_store/orders';
export const MANAGER_STORE_BACKEND_API_SUMMARY_URL = '/frontend_manager/manager_store/summary';
export const MANAGER_STORE_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_STORE_URLS = {
  PAGES: {
    PRODUCTS: MANAGER_STORE_PAGES_PRODUCTS_URL,
    ORDERS: MANAGER_STORE_PAGES_ORDERS_URL
  },
  BACKEND_API: {
    BASE: MANAGER_STORE_BACKEND_API_BASE_URL,
    PRODUCTS_BASE: MANAGER_STORE_BACKEND_API_PRODUCTS_BASE_URL,
    PRODUCT_UPDATE: MANAGER_STORE_BACKEND_API_PRODUCT_UPDATE_URL,
    PRODUCT_DELETE: MANAGER_STORE_BACKEND_API_PRODUCT_DELETE_URL,
    ORDERS_BASE: MANAGER_STORE_BACKEND_API_ORDERS_BASE_URL,
    SUMMARY: MANAGER_STORE_BACKEND_API_SUMMARY_URL
  },
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_STORE_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;

export const ManagerStoreUrlConfig = MANAGER_STORE_URLS;
