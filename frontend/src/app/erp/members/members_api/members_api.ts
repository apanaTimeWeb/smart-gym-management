// RESPONSIBILITY: Provides isolated data fetching methods for the members module.
import { apiFetch } from '@/lib/api';
import { MembersUrlConfig } from '@/app/erp/members/members_url_config';
import type { Member, MemberStats } from '@/app/erp/members/members_types/members_types';

export const membersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { members: Member[]; total: number; page: number; limit: number } }>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getOne: (id: number) => apiFetch<{ success: boolean; data: Member }>(MembersUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () => apiFetch<{ success: boolean; data: MemberStats }>(MembersUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<Member>) =>
    apiFetch(MembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Member>) =>
    apiFetch(MembersUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch(MembersUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
  renew: (id: number, body: unknown) =>
    apiFetch(MembersUrlConfig.BACKEND_API.RENEW(id), { method: 'POST', body: JSON.stringify(body) }),
};
