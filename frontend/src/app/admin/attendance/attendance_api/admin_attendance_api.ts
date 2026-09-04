// RESPONSIBILITY: Data-fetching for the Admin Attendance module.
import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminAttendanceUrlConfig } from "@/app/admin/attendance/attendance_url_config";
import type { AdminAttendanceRecord, AdminAttendanceStats } from "@/app/admin/attendance/attendance_types/admin_attendance_types";

export const adminAttendanceApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiFetch<ApiResponse<{ records: AdminAttendanceRecord[]; total: number }>>(`${AdminAttendanceUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getStats: () => apiFetch<ApiResponse<AdminAttendanceStats>>(AdminAttendanceUrlConfig.BACKEND_API.STATS),
  mark: (body: unknown) => apiFetch<ApiResponse<AdminAttendanceRecord>>(AdminAttendanceUrlConfig.BACKEND_API.MARK, { method: "POST", body: JSON.stringify(body) }),
};
