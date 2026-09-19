// RESPONSIBILITY: Owns every route path used by the Manager inquiries module.
export const ManagerInquiriesUrlConfig = {
  UI: { HOME: '/manager/inquiries' },
  BACKEND_API: { BASE: '/manager/inquiries', STATS: '/manager/inquiries/stats', PLANS: '/manager/inquiries/plans', PLANS_SNAPSHOT: '/manager/inquiries/plans-snapshot', GET_ONE: (id: string) => `/manager/inquiries/${id}`, CONVERT: (id: string) => `/manager/inquiries/${id}/convert` },
  INTEGRATIONS: { WHATSAPP_WEB_BASE: 'https://wa.me' }
};
