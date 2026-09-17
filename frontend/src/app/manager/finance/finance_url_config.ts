// RESPONSIBILITY: Owns every route path used by the Manager finance module.
export const ManagerFinanceUrlConfig = {
  PAGES: { LIST: '/manager/finance' },
  BACKEND_API: {
    BASE: '/manager/finance',
    PAYMENTS_BASE: '/manager/finance/payments',
    SUMMARY: '/manager/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/manager/finance/payments-by-member/${memberId}`,
    EXPORT: '/manager/finance/transactions/export',
    CHART: '/manager/finance/chart'
  }
};
