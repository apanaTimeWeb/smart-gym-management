// RESPONSIBILITY: Provides the implementation for finance_url_config.ts functionality within its module.
export const FinanceUrlConfig = {
  PAGES: {
    LIST: '/erp/finance',
  },
  BACKEND_API: {
    PAYMENTS_BASE: '/erp/finance/payments',
    SUMMARY: '/erp/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/erp/finance/payments/member/${memberId}`,
  }
};
