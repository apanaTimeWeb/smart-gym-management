// RESPONSIBILITY: Owns every route path used by the Manager sales module.
export const ManagerSalesUrlConfig = {
  UI: { HOME: '/manager/sales' },
  BACKEND_API: {
    BASE: '/manager/sales', OVERVIEW: '/manager/sales/overview', MEMBERSHIP_REPORT: '/manager/sales/membership-report',
    PENDING_PAYMENTS: '/manager/sales/pending-payments', ALL_MEMBERSHIPS: '/manager/sales/all-memberships', STATS: '/manager/sales/stats'
  },
  INTEGRATIONS: { WHATSAPP_WEB_BASE: 'https://wa.me' }
};
