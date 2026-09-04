export const AdminStoreUrlConfig = {
  PAGES: { LIST: "/admin/store" },
  BACKEND_API: {
    PRODUCTS: "/admin/store/products",
    ORDERS: "/admin/store/orders",
    STATS: "/admin/store/stats",
    GET_PRODUCT: (id: string) => `/admin/store/products/${id}`,
    UPDATE_PRODUCT: (id: string) => `/admin/store/products/${id}`,
    DELETE_PRODUCT: (id: string) => `/admin/store/products/${id}`,
    CHECKOUT: "/admin/store/orders/checkout",
  },
};
