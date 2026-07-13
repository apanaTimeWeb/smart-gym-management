// RESPONSIBILITY: inquiries_url_config.ts handles the logic and UI for its corresponding feature.
export const InquiriesUrlConfig = {
  PAGES: {
    LIST: '/erp/inquiries',
  },
  BACKEND_API: {
    BASE: '/erp/inquiries',
    GET_ONE: (id: number) => `/erp/inquiries/${id}`,
    STATS: '/erp/inquiries/meta/stats',
    UPDATE: (id: number) => `/erp/inquiries/${id}`,
    DELETE: (id: number) => `/erp/inquiries/${id}`,
  }
};
