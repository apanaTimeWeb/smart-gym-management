// RESPONSIBILITY: Provides isolated data fetching methods for the members module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { MembersUrlConfig } from '@/app/manager/members/ManagerMembersUrlConfig';
import type { Member, MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';

import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '@/app/manager/members/members_fixtures/ManagerMembersMockData';

export const membersApi = {
  getAll: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Success', data: { members: MOCK_MEMBERS, total: MOCK_MEMBERS.length, page: 1, limit: 10 } };
  },
  getOne: async (id: string) => {
    await new Promise(res => setTimeout(res, 600));
    const member = MOCK_MEMBERS.find(m => m.id === id) || MOCK_MEMBERS[0];
    return { success: true, message: 'Success', data: member };
  },
  getStats: async () => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Success', data: MOCK_MEMBER_STATS };
  },
  create: async (body: Partial<Member>) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Created', data: MOCK_MEMBERS[0] };
  },
  update: async (id: string, body: Partial<Member> & Record<string, unknown>) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Updated', data: MOCK_MEMBERS[0] };
  },
  remove: async (id: string) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Removed', data: { id } };
  },
  renew: async (id: string, body: any) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Renewed', data: MOCK_MEMBERS[0] };
  },
  getTrainers: async () => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Success', data: { staff: [] } };
  },
};
