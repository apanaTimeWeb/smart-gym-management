// RESPONSIBILITY: Provides the implementation for plans_url_config.ts functionality within its module.
export const PlansUrlConfig = {
  PAGES: {
    LIST: '/manager/plans',
  },
  BACKEND_API: {
    BASE: '/manager/plans',
    GET_ONE: (id: string) => `/manager/plans/${id}`,
    UPDATE: (id: string) => `/manager/plans/${id}`,
    DELETE: (id: string) => `/manager/plans/${id}`,
  }
};
