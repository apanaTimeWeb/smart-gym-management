// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Inquiries module.
export const InquiriesUrlConfig = {
  PAGES: {
    LIST: '/erp/inquiries',
  },
  BACKEND_API: {
    BASE: '/erp/inquiries',
    GET_ONE: (id: string) => `/erp/inquiries/${id}`,
    STATS: '/erp/inquiries/meta/stats',
    UPDATE: (id: string) => `/erp/inquiries/${id}`,
    DELETE: (id: string) => `/erp/inquiries/${id}`,
  }
};
