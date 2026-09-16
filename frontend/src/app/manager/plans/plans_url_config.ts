// RESPONSIBILITY: Owns every route path used by the Manager plans module.
export const ManagerPlansUrlConfig = {
  PAGES: { LIST: '/manager/plans' },
  BACKEND_API: {
    BASE: '/manager/plans',
    MEMBERSHIP_OVERVIEW: '/manager/plans/membership-overview',
    MEMBERSHIP_ACTIVATE: '/manager/plans/membership-activate',
    MEMBERSHIP_RENEW: '/manager/plans/membership-renew',
    MEMBERSHIP_FREEZE: '/manager/plans/membership-freeze',
    CHANGE_REQUESTS: '/manager/plans/change-requests',
    GET_ONE: (id: string) => `/manager/plans/${id}`,
    UPDATE: (id: string) => `/manager/plans/${id}`,
    DELETE: (id: string) => `/manager/plans/${id}`
  }
};
