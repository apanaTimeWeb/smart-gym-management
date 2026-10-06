import { apiFetch } from '@/lib/api';
import { attendanceSchema, attendanceResponseSchema, attendanceStatsSchema, attendanceHistoryResponseSchema } from '@/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceSchema';
import { managerAttendanceMemberSnapshotResponseSchema, managerAttendanceStaffSnapshotResponseSchema } from '@/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceSnapshotSchema';
import { ManagerAttendanceUrlConfig } from '@/app/frontend_manager/manager_attendance/manager_attendance_url_config';
import type { ManagerMarkAttendanceRequest } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceRequestTypes';
import type { MemberSnapshot, StaffSnapshot } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceSnapshotTypes';
import type { Attendance, AttendanceResponse, AttendanceStatsResponse, ManagerAttendancePersonType } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerAttendanceApi implementation for the attendance module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceSchema; @/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceSnapshotSchema; @/app/frontend_manager/manager_attendance/manager_attendance_url_config; @/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceRequestTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerAttendanceApi = {
  markAttendance: async (body: ManagerMarkAttendanceRequest, idempotencyKey: string): Promise<ApiResponse<Attendance>> => {
    const serializedBody = { ...body, ...(body.checkIn instanceof Date ? { checkIn: body.checkIn.toISOString() } : {}) };
    return apiFetch(ManagerAttendanceUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: attendanceSchema });
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
