import { describe, expect, it } from 'vitest';
import { getSuperadminGymsCalendarGrid, isSuperadminGymsCalendarToday } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsCalendarUtils';

describe('SuperadminGymsCalendarUtils', () => {
  it('calculates month geometry', () => {
    expect(getSuperadminGymsCalendarGrid(2026, 8)).toEqual({ year: 2026, month: 8, daysInMonth: 30, leadingEmptyDays: 2 });
  });
});
