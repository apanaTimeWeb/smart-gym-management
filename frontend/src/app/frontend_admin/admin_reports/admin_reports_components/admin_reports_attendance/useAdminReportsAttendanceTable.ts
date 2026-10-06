"use client";
// RESPONSIBILITY: Owns attendance-table sorting state and derived rows for the Reports attendance surface.
import { useMemo, useState } from 'react';
import type { AttendanceSortDirection, AttendanceSortKey } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsAttendanceTypes';
import type { AttendanceSummaryRow } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';
import { sortAdminAttendanceRows } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsSortAttendanceRows';

/**
 * @description useAdminReportsAttendanceTable owns interactive attendance-table sorting and derives the ordered server rows.
 * @dependencies AttendanceSort types and sortAdminAttendanceRows.
 * @edge-case Keeps the server result immutable and resets direction to descending when the user changes columns.
 */
export function useAdminReportsAttendanceTable(attendanceSummary: AttendanceSummaryRow[] | undefined) {
  const [sortKey, setSortKey] = useState<AttendanceSortKey>('attendanceRate');
  const [sortDir, setSortDir] = useState<AttendanceSortDirection>('desc');
  const rows = useMemo(
    () => sortAdminAttendanceRows(attendanceSummary ?? [], sortKey, sortDir),
    [attendanceSummary, sortKey, sortDir],
  );

  const handleSort = (key: AttendanceSortKey) => {
    if (sortKey === key) {
      setSortDir((direction) => (direction === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir('desc');
  };

  return { rows, sortKey, sortDir, handleSort };
}
