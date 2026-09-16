// RESPONSIBILITY: Provides the implementation for finance_url_config.ts functionality within its module.
export const FinanceUrlConfig = {
  PAGES: {
    LIST: '/admin/finance',
  },
  BACKEND_API: {
    PAYMENTS_BASE: '/admin/finance/payments',
    SUMMARY: '/admin/finance/summary',
    PNL_COMPARISON: '/admin/finance/pnl',
    PENDING_DUES: '/admin/finance/pending-dues',
    REFUND: '/admin/finance/refunds',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/admin/finance/payments/member/${memberId}`,
  }
};
