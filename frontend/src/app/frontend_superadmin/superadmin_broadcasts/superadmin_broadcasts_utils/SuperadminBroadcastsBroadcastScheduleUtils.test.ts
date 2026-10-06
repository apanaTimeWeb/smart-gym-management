import { describe, expect, it } from 'vitest';

import { combineSuperadminBroadcastScheduleDateTime, splitSuperadminBroadcastScheduleDateTime } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_utils/SuperadminBroadcastsBroadcastScheduleUtils';



describe('SuperadminBroadcastsBroadcastScheduleUtils', () => {
  it('serializes a selected date and time as an ISO UTC timestamp', () => {
    expect(combineSuperadminBroadcastScheduleDateTime('2026-10-02', '14:30')).toBe('2026-10-02T14:30:00.000Z');
  });

  it('returns a stable empty contract for a missing schedule value', () => {
    expect(splitSuperadminBroadcastScheduleDateTime(null)).toEqual({ date: '', time: '' });
  });
});
