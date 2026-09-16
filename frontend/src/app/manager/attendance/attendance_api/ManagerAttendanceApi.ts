import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Attendance, AttendanceResponse, AttendanceStatsResponse } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { MemberSnapshot, StaffSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import { attendanceSchema, attendanceResponseSchema, attendanceStatsSchema } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSchema';
import { z } from 'zod';

export const attendanceApi = {
  markAttendance: async (body: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string }): Promise<ApiResponse<Attendance>> => {
    return apiFetch(ManagerAttendanceUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: attendanceSchema });
  },
  fetchAttendanceRecords: async (params?: Record<string, string>): Promise<ApiResponse<AttendanceResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: attendanceResponseSchema });
  },
  fetchAttendanceStats: async (): Promise<ApiResponse<AttendanceStatsResponse>> => {
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: attendanceStatsSchema });
  },
  fetchAttendanceHistory: async (userId: string, type: 'MEMBER' | 'STAFF', month: string): Promise<ApiResponse<Attendance[]>> => {
    const query = new URLSearchParams({ userId, type, month }).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}/history?${query}`, { dataSchema: z.array(attendanceSchema) });
  },
  fetchAttendanceMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: MemberSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}/members${query ? `?${query}` : ''}`, { dataSchema: z.object({ members: z.array(z.object({ id: z.string(), name: z.string(), phone: z.string(), status: z.enum(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']), planName: z.string().optional(), joinDate: z.string().optional() })) }) });
  },
  fetchAttendanceStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: StaffSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}/staff${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(z.object({ id: z.string(), name: z.string(), role: z.string(), phone: z.string(), status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE']) })) }) });
  },
};
