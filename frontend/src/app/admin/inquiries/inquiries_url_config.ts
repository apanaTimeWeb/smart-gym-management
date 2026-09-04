export const AdminInquiriesUrlConfig = {
  PAGES: { LIST: "/admin/inquiries" },
  BACKEND_API: {
    BASE: "/admin/inquiries",
    STATS: "/admin/inquiries/stats",
    GET_ONE: (id: string) => `/admin/inquiries/${id}`,
    UPDATE: (id: string) => `/admin/inquiries/${id}`,
    DELETE: (id: string) => `/admin/inquiries/${id}`,
  },
};
