// RESPONSIBILITY: Owns Admin Reports attendance-specific view-model types.
import type { AttendanceHeatmapCell, ReportData, AttendanceSummaryRow } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';

export type AdminReportsAttendanceReportData = ReportData & {
  attendanceHeatmap?: AttendanceHeatmapCell[];
};

export type AttendanceSortKey = keyof AttendanceSummaryRow;
export type AttendanceSortDirection = 'asc' | 'desc';
