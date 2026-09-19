import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Attendance, AttendanceResponse, AttendanceStatsResponse, ManagerAttendancePersonType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { MemberSnapshot, StaffSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import type { ManagerMarkAttendanceRequest } from '@/app/manager/attendance/attendance_types/ManagerAttendanceRequestTypes';
import { attendanceSchema, attendanceResponseSchema, attendanceStatsSchema, attendanceHistoryResponseSchema } from '@/app/manager/attendance/attendance_schemas/ManagerAttendanceSchema';
import { managerAttendanceMemberSnapshotResponseSchema, managerAttendanceStaffSnapshotResponseSchema } from '@/app/manager/attendance/attendance_schemas/ManagerAttendanceSnapshotSchema';

export const attendanceApi = {
  markAttendance: async (body: ManagerMarkAttendanceRequest): Promise<ApiResponse<Attendance>> => {
    return apiFetch(ManagerAttendanceUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: attendanceSchema });
  },
  fetchAttendanceRecords: async (params?: Record<string, string>): Promise<ApiResponse<AttendanceResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: attendanceResponseSchema });
  },
  fetchAttendanceStats: async (): Promise<ApiResponse<AttendanceStatsResponse>> => {
    return apiFetch(ManagerAttendanceUrlConfig.BACKEND_API.STATS, { dataSchema: attendanceStatsSchema });
  },
  fetchAttendanceHistory: async (userId: string, type: ManagerAttendancePersonType, month: string): Promise<ApiResponse<Attendance[]>> => {
    const query = new URLSearchParams({ userId, type, month }).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.HISTORY}?${query}`, { dataSchema: attendanceHistoryResponseSchema });
  },
  fetchAttendanceMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: MemberSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.MEMBERS}${query ? `?${query}` : ''}`, { dataSchema: managerAttendanceMemberSnapshotResponseSchema });
  },
  fetchAttendanceStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: StaffSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerAttendanceUrlConfig.BACKEND_API.STAFF}${query ? `?${query}` : ''}`, { dataSchema: managerAttendanceStaffSnapshotResponseSchema });
  } };
