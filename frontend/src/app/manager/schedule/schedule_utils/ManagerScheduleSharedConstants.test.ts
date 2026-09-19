import { describe, expect, it } from 'vitest';
import { SHIFT_DAYS, SHIFT_STATUS_OPTIONS, SHIFT_STATUS_STYLES, TIME_OPTIONS } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';

describe('ManagerScheduleSharedConstants', () => {
  it('keeps the weekly day/status contract stable', () => {
    expect(SHIFT_DAYS).toHaveLength(7);
    expect(SHIFT_STATUS_OPTIONS).toEqual(['Active', 'Off', 'Leave']);
    expect(SHIFT_STATUS_STYLES.Leave?.text).toBe('text-warning');
  });

  it('provides half-hour time slots across the configured schedule window', () => {
    expect(TIME_OPTIONS[0]).toBe('05:00');
    expect(TIME_OPTIONS.at(-1)).toBe('22:00');
    expect(TIME_OPTIONS).toContain('09:30');
  });
});
