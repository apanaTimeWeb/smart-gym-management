// RESPONSIBILITY: Mock API layer for Admin Attendance. Returns hardcoded data simulating real API responses.
// Replace these functions with real apiFetch calls when the backend is ready.
import { ADMIN_MOCK_ATTENDANCE_RECORDS, ADMIN_MOCK_ATTENDANCE_SUMMARY, ADMIN_MOCK_ATTENDANCE_TREND } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {
  await new Promise((r) => setTimeout(r, 350));
  return ADMIN_MOCK_ATTENDANCE_RECORDS;
}

export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {
  await new Promise((r) => setTimeout(r, 200));
  return ADMIN_MOCK_ATTENDANCE_SUMMARY;
}

export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {
  await new Promise((r) => setTimeout(r, 200));
  return ADMIN_MOCK_ATTENDANCE_TREND;
}
