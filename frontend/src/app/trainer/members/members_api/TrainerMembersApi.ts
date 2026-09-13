// RESPONSIBILITY: Provides isolated data fetching methods for the members module, mocking API responses.
import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '../members_fixtures/TrainerMembersMockData';
import type { Member, MemberStats, DietPlan, Workout } from '../members_types/members_types';
import { MemberListResponseSchema, MemberStatsResponseSchema, MemberDetailResponseSchema } from '../members_types/members.schema';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const TrainerMembersApi = {
  fetchMembers: async (params?: Record<string, string>) => {
    await delay(500);
    let filtered = [...MOCK_MEMBERS];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(m => m.name.toLowerCase().includes(s) || m.email?.toLowerCase().includes(s));
    }
    if (params?.status && params.status !== 'All') {
      filtered = filtered.filter(m => m.status === params.status);
    }
    if (params?.progressStatus && params.progressStatus !== 'All') {
      filtered = filtered.filter(m => m.progressStatus === params.progressStatus);
    }
    
    const page = parseInt(params?.page || '1', 10);
    const limit = parseInt(params?.limit || '50', 10);
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    
    const rawResponse = {
      success: true,
      message: 'Members fetched successfully',
      data: {
        members: paginated,
        total: filtered.length,
        page,
        limit
      }
    };
    
    // Zod validation boundary
    return MemberListResponseSchema.parse(rawResponse);
  },
  
  fetchMemberById: async (id: string) => {
    await delay(500);
    const member = MOCK_MEMBERS.find(m => m.id === id);
    const rawResponse = {
      success: !!member,
      message: member ? 'Member fetched successfully' : 'Member not found',
      data: member
    };
    return MemberDetailResponseSchema.parse(rawResponse);
  },
  
  fetchMemberStats: async () => {
    await delay(500);
    const rawResponse = {
      success: true,
      message: 'Stats fetched successfully',
      data: MOCK_MEMBER_STATS
    };
    return MemberStatsResponseSchema.parse(rawResponse);
  },
  
  updateMember: async (id: string, body: Partial<Member>) => {
    await delay(500);
    const member = MOCK_MEMBERS.find(m => m.id === id);
    if (!member) throw new Error('Member not found');
    const updated = { ...member, ...body };
    const rawResponse = {
      success: true,
      message: 'Member updated successfully',
      data: updated
    };
    return MemberDetailResponseSchema.parse(rawResponse);
  },
  
  assignDiet: async (memberId: string, diet: DietPlan | null) => {
    return TrainerMembersApi.updateMember(memberId, { assignedDietId: diet?.id, assignedDiet: diet ?? undefined });
  },
  
  assignWorkout: async (memberId: string, workout: Workout | null) => {
    return TrainerMembersApi.updateMember(memberId, { assignedWorkoutId: workout?.id, assignedWorkout: workout ?? undefined });
  },
  
  fetchMemberAttendance: async (memberId: string) => {
    await delay(300);
    // Mock 30 days of attendance for the current month
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const mockData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      // Make it realistic: some present, some absent, some rest
      let status = 'P';
      if (day % 7 === 0) status = 'L'; // rest day
      else if (day % 10 === 0) status = 'A'; // random absent
      
      return { day, status };
    });
    
    return {
      success: true,
      message: 'Attendance fetched',
      data: mockData
    };
  }
};
