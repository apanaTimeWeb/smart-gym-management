import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

import { MOCK_ADMIN_ATTENDANCE_SUMMARY, MOCK_ADMIN_ATTENDANCE_RECORDS, MOCK_ADMIN_ATTENDANCE_TREND } from '@/app/admin/attendance/attendance_api/AdminAttendanceMockData';

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  await new Promise(res => setTimeout(res, 300));
  return MOCK_ADMIN_ATTENDANCE_RECORDS;
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  await new Promise(res => setTimeout(res, 300));
  return MOCK_ADMIN_ATTENDANCE_SUMMARY;
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  await new Promise(res => setTimeout(res, 300));
  return MOCK_ADMIN_ATTENDANCE_TREND;
}
