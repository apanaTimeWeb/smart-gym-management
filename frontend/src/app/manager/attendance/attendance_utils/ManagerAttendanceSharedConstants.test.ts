import { describe, expect, it } from 'vitest';
import { ATTENDANCE_TABLE_HEADERS, ATTENDANCE_TABS, formatAttendanceMonthYear, formatTime } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';

describe('ManagerAttendanceSharedConstants', () => {
  it('keeps the documented attendance table contract aligned with nine columns', () => {
    expect(ATTENDANCE_TABLE_HEADERS).toHaveLength(9);
    expect(ATTENDANCE_TABLE_HEADERS).toContain('Check Out');
    expect(ATTENDANCE_TABLE_HEADERS).toContain('Method');
  });

  it('formats attendance time and month labels consistently', () => {
    expect(formatTime(undefined)).toBe('—');
    expect(formatAttendanceMonthYear('2026-01-15')).toMatch(/2026/);
    expect(formatAttendanceMonthYear('2026-01-15')).toMatch(/January/i);
  });

  it('exposes the complete documented attendance tab set', () => {
    expect(ATTENDANCE_TABS).toEqual(['Member Attendance', 'Trainer Attendance', 'Staff Attendance', 'Daily Attendance Report']);
  });
});
