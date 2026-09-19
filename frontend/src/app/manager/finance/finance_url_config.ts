// RESPONSIBILITY: Owns every route path used by the Manager finance module.
export const ManagerFinanceUrlConfig = {
  PAGES: { LIST: '/manager/finance' },
  BACKEND_API: {
    BASE: '/manager/finance',
    PAYMENTS_BASE: '/manager/finance/payments',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/manager/finance/payments/member/${memberId}`,
    SUMMARY: '/manager/finance/summary',
    EXPORT: '/manager/finance/export',
    CHART: '/manager/finance/chart'
  }
};
