// RESPONSIBILITY: Single source of truth for all URLs used by the Members module.
// Both page routes (for navigation) and backend API endpoints are defined here.
// No file in the Members module should ever hardcode a URL string — always import from here.
export const MembersUrlConfig = {
  PAGES: {
    LIST: '/admin/members',
    ADD: '/admin/members/add',
  },
  BACKEND_API: {
    BASE: '/admin/members',
    STATS: '/admin/members/stats',
    RENEW: (id: string) => `/admin/members/${id}/renew`,
    GET_ONE: (id: string) => `/admin/members/${id}`,
    UPDATE: (id: string) => `/admin/members/${id}`,
    DELETE: (id: string) => `/admin/members/${id}`,
  }
};

