export const InquiriesUrlConfig = {
  PAGES: {
    LIST: '/inquiries',
  },
  BACKEND_API: {
    BASE: '/inquiries',
    GET_ONE: (id: number) => `/inquiries/${id}`,
    STATS: '/inquiries/stats',
    UPDATE: (id: number) => `/inquiries/${id}`,
    DELETE: (id: number) => `/inquiries/${id}`,
  }
};
