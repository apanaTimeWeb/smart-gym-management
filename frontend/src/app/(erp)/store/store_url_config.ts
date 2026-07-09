export const StoreUrlConfig = {
  PAGES: {
    PRODUCTS: '/store',
    ORDERS: '/store/orders',
  },
  BACKEND_API: {
    PRODUCTS_BASE: '/store/products',
    PRODUCT_UPDATE: (id: number) => `/store/products/${id}`,
    PRODUCT_DELETE: (id: number) => `/store/products/${id}`,
    ORDERS_BASE: '/store/orders',
    SUMMARY: '/store/summary',
  }
};
