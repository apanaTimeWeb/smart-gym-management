// RESPONSIBILITY: URL endpoints for the Referrals module.
export const ManagerReferralsUrlConfig = {
  BASE: '/manager/referrals',
  KPIS: '/manager/referrals/kpis',
  LIST: '/manager/referrals',
  CLAIM_REWARD: (id: string) => `/manager/referrals/${id}/claim`,
};
