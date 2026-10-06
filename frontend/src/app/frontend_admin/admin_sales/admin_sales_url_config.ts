// admin_sales_url_config.ts
// Owned by: frontend_admin/admin_sales feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_SALES_ROUTES = {
  root: '/frontend_admin/admin_sales' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_SALES_OVERVIEW_URL = '/admin/sales/overview' as const;
export const ADMIN_SALES_REFERRAL_SOURCES_URL = '/admin/sales/referral-sources' as const;
export const ADMIN_SALES_MEMBERSHIP_REPORT_URL = '/admin/sales/membership-report' as const;
export const ADMIN_SALES_PENDING_PAYMENTS_URL = '/admin/sales/pending-payments' as const;
export const ADMIN_SALES_ALL_MEMBERSHIPS_URL = '/admin/sales/all-memberships' as const;
export const ADMIN_SALES_SUMMARY_URL = '/admin/sales/summary' as const;
export const ADMIN_SALES_STORE_ORDERS_URL = '/admin/sales/store-orders' as const;
export const ADMIN_SALES_STORE_SUMMARY_URL = '/admin/sales/store-summary' as const;

export const ADMIN_SALES_URLS = {
  overview: ADMIN_SALES_OVERVIEW_URL,
  referralSources: ADMIN_SALES_REFERRAL_SOURCES_URL,
  membershipReport: ADMIN_SALES_MEMBERSHIP_REPORT_URL,
  pendingPayments: ADMIN_SALES_PENDING_PAYMENTS_URL,
  allMemberships: ADMIN_SALES_ALL_MEMBERSHIPS_URL,
  summary: ADMIN_SALES_SUMMARY_URL,
  storeOrders: ADMIN_SALES_STORE_ORDERS_URL,
  storeSummary: ADMIN_SALES_STORE_SUMMARY_URL,
} as const;

export const ADMIN_SALES_API = ADMIN_SALES_URLS;

export const ADMIN_SALES_WHATSAPP_WEB_URL = 'https://wa.me/91' as const;
export const ADMIN_SALES_EXTERNAL_URLS = { whatsappWeb: ADMIN_SALES_WHATSAPP_WEB_URL } as const;
