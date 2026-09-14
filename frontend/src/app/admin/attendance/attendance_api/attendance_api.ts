import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';
import { z } from "zod";

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  return apiFetch(AdminAttendanceUrlConfig.api.base, { dataSchema: z.any() });
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  return apiFetch(`${AdminAttendanceUrlConfig.api.base}/summary`, { dataSchema: z.any() });
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  return apiFetch(`${AdminAttendanceUrlConfig.api.base}/trend`, { dataSchema: z.any() });
}
