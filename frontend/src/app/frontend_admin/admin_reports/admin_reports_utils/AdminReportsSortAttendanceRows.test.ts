import { describe, expect, it } from 'vitest';
import { sortAdminAttendanceRows } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsSortAttendanceRows';
import type { AttendanceSummaryRow } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';

describe('sortAdminAttendanceRows', () => {
  const rows: AttendanceSummaryRow[] = [
    { gymId: 'g2', gymName: 'Beta', avgDailyAttendance: 90, peakDay: 'Monday', attendanceRate: 75, totalCheckIns: 900 },
    { gymId: 'g1', gymName: 'Alpha', avgDailyAttendance: 40, peakDay: 'Friday', attendanceRate: 85, totalCheckIns: 400 },
  ];

  it('sorts numeric attendance fields and preserves the source array', () => {
    expect(sortAdminAttendanceRows(rows, 'attendanceRate', 'asc').map((row) => row.gymId)).toEqual(['g2', 'g1']);
    expect(rows.map((row) => row.gymId)).toEqual(['g2', 'g1']);
  });

  it('sorts text columns in descending order', () => {
    expect(sortAdminAttendanceRows(rows, 'gymName', 'desc').map((row) => row.gymName)).toEqual(['Beta', 'Alpha']);
  });
});
