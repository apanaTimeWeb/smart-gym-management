// RESPONSIBILITY: Server-side API fetching for the members module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';

export const ssrMembersApi = {
  fetchMembers: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${ManagerMembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  fetchMemberStats: () => ssrApiFetch<ApiResponse<Record<string, unknown>>>(ManagerMembersUrlConfig.BACKEND_API.STATS),
  fetchMemberPlans: () => ssrApiFetch<ApiResponse<Record<string, unknown>>>(ManagerMembersUrlConfig.BACKEND_API.PLANS_SNAPSHOT),
};
