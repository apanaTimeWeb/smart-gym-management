// RESPONSIBILITY: Provides strongly-typed network calls for attendance operations.
import type { ApiResponse } from '@/lib/api';
import type { Attendance, AttendanceResponse } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS } from '@/app/manager/attendance/attendance_api/ManagerAttendanceMockData';

export const attendanceApi = {
  mark: async (body: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Attendance marked' };
  },
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<AttendanceResponse>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Fetched attendance records',
      data: {
        attendances: MOCK_ATTENDANCE_RECORDS,
        total: MOCK_ATTENDANCE_RECORDS.length,
      }
    };
  },
  getTodayStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Fetched stats',
      data: MOCK_ATTENDANCE_STATS,
    };
  },
  getHistory: async (userId: string, type: 'MEMBER' | 'STAFF', month: string): Promise<ApiResponse<Attendance[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Fetched history',
      data: MOCK_ATTENDANCE_RECORDS.filter(r => r.type === type && (type === 'MEMBER' ? String(r.memberId) === userId : String(r.staffId) === userId)),
    };
  },
};
