// RESPONSIBILITY: Owns typed HTTP access for Admin attendance records, summary, and trend queries.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminAttendanceUrlConfig } from '@/app/admin/attendance/admin_attendance_url_config';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';
import { adminAttendanceRecordSchema, adminAttendanceSummarySchema, adminAttendanceTrendPointSchema } from '@/app/admin/attendance/attendance_types/AdminAttendanceSchemas';
import { z } from 'zod';

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceRecord[]>>(AdminAttendanceUrlConfig.api.base, { method: 'GET', dataSchema: z.array(adminAttendanceRecordSchema) });
  return res.data ?? [];
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  const res = await apiFetch<ApiResponse<AdminAttendanceSummary>>(`${AdminAttendanceUrlConfig.api.base}/summary`, { method: 'GET', dataSchema: adminAttendanceSummarySchema });
  if (!res.data) throw new Error('Attendance summary unavailable');
  return res.data;
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceTrendPoint[]>>(`${AdminAttendanceUrlConfig.api.base}/trend`, { method: 'GET', dataSchema: z.array(adminAttendanceTrendPointSchema) });
  return res.data ?? [];
}
