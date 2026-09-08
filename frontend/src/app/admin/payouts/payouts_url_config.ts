// RESPONSIBILITY: Centralized URL config for the Admin Payouts module.
export const AdminPayoutsUrlConfig = {
  PAGES: { LIST: '/admin/payouts' },
  BACKEND_API: {
    BASE: '/admin/payouts',
    BY_ID: (id: string) => `/admin/payouts/${id}`,
    SUMMARY: '/admin/payouts/summary',
  },
} as const;
