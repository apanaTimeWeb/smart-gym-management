import { describe, expect, it } from 'vitest';
import { computeDuration, formatNumber } from '@/app/frontend_admin/admin_attendance/admin_attendance_utils/AdminAttendanceFormatters';

describe('AdminAttendanceFormatters', () => {
  it('computes positive attendance duration across AM/PM', () => {
    expect(computeDuration('9:00 AM', '5:30 PM')).toBe('8h 30m');
    expect(computeDuration('9:00 AM', '9:45 AM')).toBe('45m');
  });

  it('returns an empty placeholder for incomplete or non-positive duration', () => {
    expect(computeDuration('9:00 AM', null)).toBe('—');
    expect(computeDuration('5:30 PM', '4:30 PM')).toBe('—');
  });

  it('formats numbers with the requested locale', () => {
    expect(formatNumber(1234567, 'en-IN')).toBe('12,34,567');
  });
});
