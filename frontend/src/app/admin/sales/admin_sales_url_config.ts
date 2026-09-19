// RESPONSIBILITY: Provides the implementation for sales_url_config.ts functionality within its module.
export const SalesUrlConfig = {
  PAGES: {
    SALES: '/admin/sales',
  },
  EXTERNAL: {
    WHATSAPP_WEB: (phone: string, message: string) => `https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
  },
  BACKEND_API: {
    OVERVIEW: '/admin/sales/overview',
    REFERRAL_SOURCES: '/admin/sales/referral-sources',
    MEMBERSHIP_REPORT: '/admin/sales/membership-report',
    PENDING_PAYMENTS: '/admin/sales/pending-payments',
    ALL_MEMBERSHIPS: '/admin/sales/all-memberships',
    SUMMARY: '/admin/sales/summary',
    STORE_ORDERS: '/admin/sales/store-orders',
    STORE_SUMMARY: '/admin/sales/store-summary',
  }
};
