import type { FetchMembersParams } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersApiQueryTypes';
// RESPONSIBILITY: API client for Admin Members module. All fetch calls go through apiFetch wrapper.
import { z } from 'zod';
import { ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/admin_members_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminMember, AdminMembersSummary } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';
import { adminMemberSchema, adminMembersSummarySchema } from '@/app/frontend_admin/admin_members/admin_members_schemas/AdminMembersSchemas';


export const AdminMembersApi = {
  fetchMembers: async (params: FetchMembersParams) => {
    const query = new URLSearchParams(Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => { if (value !== undefined) acc[key] = String(value); return acc; }, {})).toString();
    return apiFetch<ApiResponse<AdminMember[]>>(`${ADMIN_MEMBERS_API.base}${query ? '?' + query : ''}`, { dataSchema: z.array(adminMemberSchema) });
  },
  fetchSummary: async () => {
    return apiFetch<ApiResponse<AdminMembersSummary>>(ADMIN_MEMBERS_API.summary, { dataSchema: adminMembersSummarySchema });
  },
  fetchMemberById: async (memberId: string) => {
    return apiFetch<ApiResponse<AdminMember>>(ADMIN_MEMBERS_API.detail(memberId), { dataSchema: adminMemberSchema });
  },
  exportMembers: async (params: Omit<FetchMembersParams, 'page' | 'limit'>) => {
    const query = new URLSearchParams(
      Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
        if (value !== undefined && value !== '') acc[key] = String(value);
        return acc;
      }, {}),
    ).toString();
    return apiFetch<ApiResponse<string>>(
      `${ADMIN_MEMBERS_API.export}${query ? '?' + query : ''}`,
      { dataSchema: z.string() },
    );
  },
};
