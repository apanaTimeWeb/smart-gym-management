// RESPONSIBILITY: Provides the implementation for finance_url_config.ts functionality within its module.
export const FinanceUrlConfig = {
  PAGES: {
    LIST: '/manager/finance',
  },
  BACKEND_API: {
    PAYMENTS_BASE: '/manager/finance/payments',
    SUMMARY: '/manager/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/manager/finance/payments/member/${memberId}`,
  }
};
