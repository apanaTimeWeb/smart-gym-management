import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Member, MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import {
  populatedMemberSchema,
  memberStatsSchema,
  planSnapshotSchema,
  paymentSnapshotSchema,
  attendanceSnapshotSchema,
  dietPlanSnapshotSchema,
  workoutSnapshotSchema,
  memberDeleteResponseSchema,
  trainerListSchema,
} from '@/app/manager/members/members_types/ManagerMembersSchema';
import { z } from 'zod';

export const membersApi = {
  exportMembersReport: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number }>> => {
    const queryParams = new URLSearchParams({ ...(params ?? {}), page: '1', limit: '1000' }).toString();
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/export?${queryParams}`, {
      dataSchema: z.object({ members: z.array(populatedMemberSchema), total: z.number() })
    });
  },
  fetchMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ members: z.array(populatedMemberSchema), total: z.number(), page: z.number(), limit: z.number() })
    });
  },
  fetchMemberById: async (id: string): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: populatedMemberSchema });
  },
  fetchMemberStats: async (): Promise<ApiResponse<MemberStats>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: memberStatsSchema });
  },
  createMember: async (body: Partial<Member>): Promise<ApiResponse<Member>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  updateMember: async (id: string, body: Partial<Member> & Record<string, unknown>): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  deleteMember: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: memberDeleteResponseSchema });
  },
  renewMember: async (id: string, body: Record<string, unknown>): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}/renew`, { method: 'POST', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  fetchMemberTrainers: async (): Promise<ApiResponse<{ staff: { id: string; name: string; role: string }[] }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/trainers`, { dataSchema: trainerListSchema });
  },
  fetchMemberPlans: async (): Promise<ApiResponse<PlanSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/plans`, { dataSchema: z.array(planSnapshotSchema) });
  },
  fetchMemberPayments: async (memberId: string): Promise<ApiResponse<PaymentSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/payments`, { dataSchema: z.array(paymentSnapshotSchema) });
  },
  addMemberPayment: async (memberId: string, body: Record<string, unknown>): Promise<ApiResponse<PaymentSnapshot>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/payments`, { method: 'POST', body: JSON.stringify(body), dataSchema: paymentSnapshotSchema });
  },
  fetchMemberAttendance: async (memberId: string): Promise<ApiResponse<AttendanceSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/attendance`, { dataSchema: z.array(attendanceSnapshotSchema) });
  },
  fetchMemberDietPlans: async (): Promise<ApiResponse<DietPlanSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/diet-plans`, { dataSchema: z.array(dietPlanSnapshotSchema) });
  },
  assignDietPlan: async (memberId: string, dietPlanId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/diet-plans`, { method: 'POST', body: JSON.stringify({ dietPlanId }), dataSchema: z.object({ success: z.boolean() }) });
  },
  fetchMemberWorkouts: async (): Promise<ApiResponse<WorkoutSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/workouts`, { dataSchema: z.array(workoutSnapshotSchema) });
  },
  assignWorkout: async (memberId: string, workoutId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/workouts`, { method: 'POST', body: JSON.stringify({ workoutId }), dataSchema: z.object({ success: z.boolean() }) });
  }
};
