// RESPONSIBILITY: store_url_config.ts handles the logic and UI for its corresponding feature.
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
