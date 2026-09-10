import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceRecord[]>>('/api/admin/attendance/records');
  return res.data || [];
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  const res = await apiFetch<ApiResponse<AdminAttendanceSummary>>('/api/admin/attendance/summary');
  return res.data || {} as AdminAttendanceSummary;
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceTrendPoint[]>>('/api/admin/attendance/trend');
  return res.data || [];
}
