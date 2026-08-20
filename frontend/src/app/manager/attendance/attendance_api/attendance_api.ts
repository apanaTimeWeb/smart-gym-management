// RESPONSIBILITY: Provides strongly-typed network calls for attendance operations.
import { apiFetch, ApiResponse } from '@/lib/api';
import { AttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import type { Attendance, AttendanceResponse } from '@/app/manager/attendance/attendance_types/attendance_types';

export const attendanceApi = {
  mark: (body: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string }) =>
    apiFetch(AttendanceUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<AttendanceResponse>>(`${AttendanceUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getTodayStats: () =>
    apiFetch<ApiResponse<{ totalCheckIns: number; memberCheckIns: number; staffCheckIns: number }>>(
      AttendanceUrlConfig.BACKEND_API.TODAY_STATS
    ),
};
