// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Store module.
export const StoreUrlConfig = {
  PAGES: {
    PRODUCTS: '/erp/store',
    ORDERS: '/erp/store/orders',
  },
  BACKEND_API: {
    PRODUCTS_BASE: '/erp/store/products',
    PRODUCT_UPDATE: (id: number) => `/erp/store/products/${id}`,
    PRODUCT_DELETE: (id: number) => `/erp/store/products/${id}`,
    ORDERS_BASE: '/erp/store/orders',
    SUMMARY: '/erp/store/summary',
  }
};
