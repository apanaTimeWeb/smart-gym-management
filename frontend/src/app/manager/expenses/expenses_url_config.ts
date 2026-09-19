// RESPONSIBILITY: Owns every route path used by the Manager expenses module.
export const ManagerExpensesUrlConfig = {
  UI: { HOME: '/manager/expenses' },
  BACKEND_API: {
    BASE: '/manager/expenses',
    GET_ONE: (id: string) => `/manager/expenses/${id}`,
    UPDATE: (id: string) => `/manager/expenses/${id}`,
    DELETE: (id: string) => `/manager/expenses/${id}`,
    STATS: '/manager/expenses/stats'
  }
};
