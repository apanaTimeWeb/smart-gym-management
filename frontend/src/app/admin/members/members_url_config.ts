// RESPONSIBILITY: Centralized URL config for the Admin Members module.
export const AdminMembersUrlConfig = {
  PAGES: { LIST: '/admin/members' },
  BACKEND_API: {
    BASE: (params?: { expiryFrom?: string; expiryTo?: string; joinFrom?: string; joinTo?: string; expiryPreset?: string }) => {
      const q = new URLSearchParams();
      if (params?.expiryFrom) q.append('expiryFrom', params.expiryFrom);
      if (params?.expiryTo) q.append('expiryTo', params.expiryTo);
      if (params?.joinFrom) q.append('joinFrom', params.joinFrom);
      if (params?.joinTo) q.append('joinTo', params.joinTo);
      if (params?.expiryPreset) q.append('expiryPreset', params.expiryPreset);
      const query = q.toString();
      return query ? `/admin/members?${query}` : '/admin/members';
    },
    BY_ID: (id: string) => `/admin/members/${id}`,
    EXPORT: '/admin/members/export',
    STATS: '/admin/members/stats',
  },
} as const;
