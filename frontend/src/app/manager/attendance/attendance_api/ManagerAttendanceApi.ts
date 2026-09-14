import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Attendance, AttendanceResponse, AttendanceStatsResponse } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { MemberSnapshot, StaffSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import { attendanceSchema, attendanceResponseSchema, attendanceStatsSchema } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSchema';
import { z } from 'zod';

export const attendanceApi = {
  mark: async (body: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string }): Promise<ApiResponse<Attendance>> => {
    return apiFetch(`/manager/attendance`, { method: 'POST', body: JSON.stringify(body), dataSchema: attendanceSchema });
  },
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<AttendanceResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/attendance${query ? `?${query}` : ''}`, { dataSchema: attendanceResponseSchema });
  },
  getTodayStats: async (): Promise<ApiResponse<AttendanceStatsResponse>> => {
    return apiFetch(`/manager/attendance/stats`, { dataSchema: attendanceStatsSchema });
  },
  getHistory: async (userId: string, type: 'MEMBER' | 'STAFF', month: string): Promise<ApiResponse<Attendance[]>> => {
    const query = new URLSearchParams({ userId, type, month }).toString();
    return apiFetch(`/manager/attendance/history?${query}`, { dataSchema: z.array(attendanceSchema) });
  },
  getMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: MemberSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/attendance/members${query ? `?${query}` : ''}`);
  },
  getStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: StaffSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/attendance/staff${query ? `?${query}` : ''}`);
  },
};
