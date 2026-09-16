import { ManagerMembersUrlConfig } from '@/app/manager/Manager_url_config';
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
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ members: z.array(populatedMemberSchema), total: z.number(), page: z.number(), limit: z.number() })
    });
  },
  getOne: async (id: string): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: populatedMemberSchema });
  },
  getStats: async (): Promise<ApiResponse<MemberStats>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: memberStatsSchema });
  },
  create: async (body: Partial<Member>): Promise<ApiResponse<Member>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  update: async (id: string, body: Partial<Member> & Record<string, unknown>): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: memberDeleteResponseSchema });
  },
  renew: async (id: string, body: Record<string, unknown>): Promise<ApiResponse<Member>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${id}/renew`, { method: 'POST', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  getTrainers: async (): Promise<ApiResponse<{ staff: { id: string; name: string; role: string }[] }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/trainers`, { dataSchema: trainerListSchema });
  },
  getPlans: async (): Promise<ApiResponse<PlanSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/plans`, { dataSchema: z.array(planSnapshotSchema) });
  },
  getPayments: async (memberId: string): Promise<ApiResponse<PaymentSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/payments`, { dataSchema: z.array(paymentSnapshotSchema) });
  },
  addPayment: async (memberId: string, body: Record<string, unknown>): Promise<ApiResponse<PaymentSnapshot>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/payments`, { method: 'POST', body: JSON.stringify(body), dataSchema: paymentSnapshotSchema });
  },
  getAttendance: async (memberId: string): Promise<ApiResponse<AttendanceSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/attendance`, { dataSchema: z.array(attendanceSnapshotSchema) });
  },
  getDietPlans: async (): Promise<ApiResponse<DietPlanSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/diet-plans`, { dataSchema: z.array(dietPlanSnapshotSchema) });
  },
  assignDietPlan: async (memberId: string, dietPlanId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/diet-plans`, { method: 'POST', body: JSON.stringify({ dietPlanId }), dataSchema: z.object({ success: z.boolean() }) });
  },
  getWorkouts: async (): Promise<ApiResponse<WorkoutSnapshot[]>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/workouts`, { dataSchema: z.array(workoutSnapshotSchema) });
  },
  assignWorkout: async (memberId: string, workoutId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.BASE}/${memberId}/workouts`, { method: 'POST', body: JSON.stringify({ workoutId }), dataSchema: z.object({ success: z.boolean() }) });
  }
};
