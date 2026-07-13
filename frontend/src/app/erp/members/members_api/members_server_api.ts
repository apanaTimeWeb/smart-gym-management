// RESPONSIBILITY: Server-side API fetching for the members module.
import { ssrApiFetch } from '@/lib/server-api';
import { MembersUrlConfig } from '@/app/erp/members/members_url_config';

export const ssrMembersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getStats: () => ssrApiFetch<{ success: boolean; data: any }>(MembersUrlConfig.BACKEND_API.STATS),
};
