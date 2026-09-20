// RESPONSIBILITY: Owns every route path used by the Manager referrals module.
export const ManagerReferralsUrlConfig = {
  UI: { HOME: '/manager/referrals' },
  BACKEND_API: {
    BASE: '/manager/referrals',
    STATS: '/manager/referrals/stats',
    KPIS: '/manager/referrals/kpis',
    CLAIM: (id: string) => `/manager/referrals/${id}/claim`,
  },
} as const;
