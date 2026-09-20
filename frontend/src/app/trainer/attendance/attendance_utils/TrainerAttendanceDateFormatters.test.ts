import { describe, expect, it } from 'vitest';
import { formatAttendanceDate, formatAttendanceTime } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceDateFormatters';

describe('TrainerAttendanceDateFormatters', () => {
  it('formats attendance dates', () => {
    expect(formatAttendanceDate('2026-09-14T00:00:00.000Z')).toMatch(/14 Sep 2026/);
  });

  it('formats and safely falls back for attendance times', () => {
    expect(formatAttendanceTime('2026-09-14T06:30:00.000Z')).toMatch(/06:30/);
    expect(formatAttendanceTime()).toBe('—');
  });
});
