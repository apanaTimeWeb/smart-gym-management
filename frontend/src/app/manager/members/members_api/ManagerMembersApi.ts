import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import {
  populatedMemberSchema,
  memberStatsSchema,
  planSnapshotSchema,
  paymentSnapshotSchema,
  attendanceSnapshotSchema,
  dietPlanSnapshotSchema,
  workoutSnapshotSchema,
  memberDeleteResponseSchema,
  trainerListSchema } from '@/app/manager/members/members_schemas/ManagerMembersSchema';
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { Member, MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { ApiResponse } from '@/lib/api';


export const membersApi = {
  exportMembersReport: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number }>> => {
    const queryParams = new URLSearchParams({ ...(params ?? {}), page: '1', limit: '1000' }).toString();
    return apiFetch(`${ManagerMembersUrlConfig.BACKEND_API.EXPORT}?${queryParams}`, {
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
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: populatedMemberSchema });
  },
  fetchMemberStats: async (): Promise<ApiResponse<MemberStats>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.STATS, { dataSchema: memberStatsSchema });
  },
  createMember: async (body: Partial<Member>): Promise<ApiResponse<Member>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  updateMember: async (id: string, body: Partial<Member> & Record<string, unknown>): Promise<ApiResponse<Member>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: populatedMemberSchema });
  },
  deleteMember: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: memberDeleteResponseSchema });
  },
  renewMember: async (id: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<Member>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.RENEW(id), { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: populatedMemberSchema });
  },
  fetchMemberTrainers: async (): Promise<ApiResponse<{ staff: { id: string; name: string; role: string }[] }>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.TRAINERS, { dataSchema: trainerListSchema });
  },
  fetchMemberPlans: async (): Promise<ApiResponse<PlanSnapshot[]>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.PLANS_SNAPSHOT, { dataSchema: z.array(planSnapshotSchema) });
  },
  fetchMemberPayments: async (memberId: string): Promise<ApiResponse<PaymentSnapshot[]>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.PAYMENTS(memberId), { dataSchema: z.array(paymentSnapshotSchema) });
  },
  addMemberPayment: async (memberId: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<PaymentSnapshot>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.PAYMENTS(memberId), { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: paymentSnapshotSchema });
  },
  fetchMemberAttendance: async (memberId: string): Promise<ApiResponse<AttendanceSnapshot[]>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.ATTENDANCE(memberId), { dataSchema: z.array(attendanceSnapshotSchema) });
  },
  fetchMemberDietPlans: async (): Promise<ApiResponse<DietPlanSnapshot[]>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.DIET_PLANS, { dataSchema: z.array(dietPlanSnapshotSchema) });
  },
  assignDietPlan: async (memberId: string, dietPlanId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.DIET_ASSIGN(memberId), { method: 'POST', body: JSON.stringify({ dietPlanId }), dataSchema: z.object({ success: z.boolean() }) });
  },
  fetchMemberWorkouts: async (): Promise<ApiResponse<WorkoutSnapshot[]>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.WORKOUTS, { dataSchema: z.array(workoutSnapshotSchema) });
  },
  assignWorkout: async (memberId: string, workoutId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(ManagerMembersUrlConfig.BACKEND_API.WORKOUT_ASSIGN(memberId), { method: 'POST', body: JSON.stringify({ workoutId }), dataSchema: z.object({ success: z.boolean() }) });
  }
};
