// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Inquiries module.
export const InquiriesUrlConfig = {
  PAGES: {
    LIST: '/admin/inquiries',
  },
  BACKEND_API: {
    BASE: '/admin/inquiries',
    GET_ONE: (id: string) => `/admin/inquiries/${id}`,
    STATS: '/admin/inquiries/meta/stats',
    UPDATE: (id: string) => `/admin/inquiries/${id}`,
    DELETE: (id: string) => `/admin/inquiries/${id}`,
  }
};
