export const PlansUrlConfig = {
  PAGES: {
    LIST: '/plans',
  },
  BACKEND_API: {
    BASE: '/plans',
    GET_ONE: (id: number) => `/plans/${id}`,
    UPDATE: (id: number) => `/plans/${id}`,
    DELETE: (id: number) => `/plans/${id}`,
  }
};
