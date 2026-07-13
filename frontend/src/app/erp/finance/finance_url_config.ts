// RESPONSIBILITY: finance_url_config.ts handles the logic and UI for its corresponding feature.
export const FinanceUrlConfig = {
  PAGES: {
    LIST: '/erp/finance',
  },
  BACKEND_API: {
    PAYMENTS_BASE: '/erp/finance/payments',
    SUMMARY: '/erp/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: number) => `/erp/finance/payments/member/${memberId}`,
  }
};
