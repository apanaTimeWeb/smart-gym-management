import { z } from 'zod';
// RESPONSIBILITY: API client for Admin Members module. All fetch calls go through apiFetch wrapper.
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';

export const ADMIN_MEMBERS_URLS = {
  list: AdminMembersUrlConfig.api.base,
  summary: `${AdminMembersUrlConfig.api.base}/summary`,
} as const;

export interface FetchMembersParams {
  search?: string;
  status?: string;
  branchId?: string;
  expiryFilter?: string;
  page?: number;
  limit?: number;
}

export const adminMembersApi = {
  fetchMembers: async (params: FetchMembersParams) => {
    const query = new URLSearchParams(Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => { if (value !== undefined) acc[key] = String(value); return acc; }, {})).toString();
    return apiFetch<ApiResponse<AdminMember[]>>(`${ADMIN_MEMBERS_URLS.list}${query ? '?' + query : ''}`, { dataSchema: z.unknown() });
  },
  fetchSummary: async () => {
    return apiFetch<ApiResponse<AdminMembersSummary>>(ADMIN_MEMBERS_URLS.summary, { dataSchema: z.unknown() });
  },
};
