import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAdminReportsAttendanceTable } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_attendance/useAdminReportsAttendanceTable';

const rows = [
  { gymId: 'a', gymName: 'A', avgDailyAttendance: 10, totalCheckIns: 100, attendanceRate: 50, peakDay: 'Mon' },
  { gymId: 'b', gymName: 'B', avgDailyAttendance: 20, totalCheckIns: 200, attendanceRate: 80, peakDay: 'Tue' },
] as const;

describe('useAdminReportsAttendanceTable', () => {
  it('sorts server rows and toggles the selected column direction', () => {
    const { result } = renderHook(() => useAdminReportsAttendanceTable([...rows]));
    expect(result.current.rows[0].gymId).toBe('b');
    expect(result.current.sortDir).toBe('desc');

    act(() => result.current.handleSort('attendanceRate'));
    expect(result.current.rows[0].gymId).toBe('a');
    expect(result.current.sortDir).toBe('asc');
  });
});
