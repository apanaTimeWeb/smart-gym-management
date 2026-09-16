import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminAttendanceUrlConfig } from '@/app/admin/attendance/admin_attendance_url_config';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';
import { z } from "zod";

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceRecord[]>>(AdminAttendanceUrlConfig.api.base, { dataSchema: z.unknown() });
  return res.data || [];
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  const res = await apiFetch<ApiResponse<AdminAttendanceSummary>>(`${AdminAttendanceUrlConfig.api.base}/summary`, { dataSchema: z.unknown() });
  return res.data as AdminAttendanceSummary;
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  const res = await apiFetch<ApiResponse<AdminAttendanceTrendPoint[]>>(`${AdminAttendanceUrlConfig.api.base}/trend`, { dataSchema: z.unknown() });
  return res.data || [];
}
