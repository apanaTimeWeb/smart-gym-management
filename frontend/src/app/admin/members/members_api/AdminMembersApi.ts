// RESPONSIBILITY: API client for Admin Members module. All fetch calls go through apiFetch wrapper.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';

export const ADMIN_MEMBERS_URLS = {
  list: '/admin/members',
  summary: '/admin/members/summary',
} as const;

export interface FetchMembersParams {
  search?: string;
  status?: string;
  branchId?: string;
  expiryFilter?: string;
  page?: number;
  limit?: number;
}

import { MOCK_ADMIN_MEMBERS, MOCK_ADMIN_MEMBERS_SUMMARY } from '@/app/admin/members/members_api/AdminMembersMockData';

export const adminMembersApi = {
  fetchMembers: async (params: FetchMembersParams) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_MEMBERS };
  },
  fetchSummary: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_MEMBERS_SUMMARY };
  },
};
