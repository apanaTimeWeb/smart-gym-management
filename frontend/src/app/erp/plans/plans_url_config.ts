// RESPONSIBILITY: Provides the implementation for plans_url_config.ts functionality within its module.
export const PlansUrlConfig = {
  PAGES: {
    LIST: '/erp/plans',
  },
  BACKEND_API: {
    BASE: '/erp/plans',
    GET_ONE: (id: string) => `/erp/plans/${id}`,
    UPDATE: (id: string) => `/erp/plans/${id}`,
    DELETE: (id: string) => `/erp/plans/${id}`,
  }
};
