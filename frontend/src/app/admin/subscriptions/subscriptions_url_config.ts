// RESPONSIBILITY: Centralized URL config for the Admin Subscriptions module.
export const AdminSubscriptionsUrlConfig = {
  PAGES: { LIST: '/admin/subscriptions' },
  BACKEND_API: {
    BASE: '/admin/subscriptions',
    BY_ID: (id: string) => `/admin/subscriptions/${id}`,
    RENEW: (id: string) => `/admin/subscriptions/${id}/renew`,
    CANCEL: (id: string) => `/admin/subscriptions/${id}/cancel`,
  },
} as const;
