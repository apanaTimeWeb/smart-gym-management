export const FinanceUrlConfig = {
  PAGES: {
    LIST: '/finance',
  },
  BACKEND_API: {
    PAYMENTS_BASE: '/finance/payments',
    SUMMARY: '/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: number) => `/finance/payments/member/${memberId}`,
  }
};
