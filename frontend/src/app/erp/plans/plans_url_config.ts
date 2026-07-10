export const PlansUrlConfig = {
  PAGES: {
    LIST: '/erp/plans',
  },
  BACKEND_API: {
    BASE: '/erp/plans',
    GET_ONE: (id: number) => `/erp/plans/${id}`,
    UPDATE: (id: number) => `/erp/plans/${id}`,
    DELETE: (id: number) => `/erp/plans/${id}`,
  }
};
