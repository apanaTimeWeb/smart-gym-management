// RESPONSIBILITY: Centralized URL configuration for the Admin Members module.
// No file in this module should hardcode URL strings � always import from here.
export const AdminMembersUrlConfig = {
  PAGES: {
    LIST: "/admin/members",
    ADD: "/admin/members/add",
  },
  BACKEND_API: {
    BASE: "/admin/members",
    STATS: "/admin/members/stats",
    RENEW: (id: string) => `/admin/members/${id}/renew`,
    GET_ONE: (id: string) => `/admin/members/${id}`,
    UPDATE: (id: string) => `/admin/members/${id}`,
    DELETE: (id: string) => `/admin/members/${id}`,
  },
};
