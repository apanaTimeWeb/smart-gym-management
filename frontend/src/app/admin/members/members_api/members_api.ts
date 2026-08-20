// RESPONSIBILITY: Provides isolated data fetching methods for the members module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { MembersUrlConfig } from '@/app/admin/members/members_url_config';
import type { Member, MemberStats } from '@/app/admin/members/members_types/members_types';

export const membersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ members: Member[]; total: number; page: number; limit: number }>>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getOne: (id: string) => apiFetch<ApiResponse<Member>>(MembersUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () => apiFetch<ApiResponse<MemberStats>>(MembersUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<Member>) =>
    apiFetch<ApiResponse<Member>>(MembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Member>) =>
    apiFetch<ApiResponse<Member>>(MembersUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<ApiResponse<{ id: string }>>(MembersUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
  renew: (id: string, body: unknown) =>
    apiFetch<ApiResponse<Member>>(MembersUrlConfig.BACKEND_API.RENEW(id), { method: 'POST', body: JSON.stringify(body) }),
};
