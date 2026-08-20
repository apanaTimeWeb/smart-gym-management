// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Store module.
export const StoreUrlConfig = {
  PAGES: {
    PRODUCTS: '/admin/store',
    ORDERS: '/admin/store/orders',
  },
  BACKEND_API: {
    PRODUCTS_BASE: '/admin/store/products',
    PRODUCT_UPDATE: (id: string) => `/admin/store/products/${id}`,
    PRODUCT_DELETE: (id: string) => `/admin/store/products/${id}`,
    ORDERS_BASE: '/admin/store/orders',
    SUMMARY: '/admin/store/summary',
  }
};
