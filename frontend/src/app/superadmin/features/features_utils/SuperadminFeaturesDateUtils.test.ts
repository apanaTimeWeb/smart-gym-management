import { describe, expect, it } from 'vitest';
import { formatSuperadminFeaturesCalendarDate } from '@/app/superadmin/features/features_utils/SuperadminFeaturesDateUtils';

describe('formatSuperadminFeaturesCalendarDate', () => {
  it('uses the local calendar date without UTC shifting', () => {
    const value = new Date(2026, 8, 20, 0, 0, 0);
    expect(formatSuperadminFeaturesCalendarDate(value)).toBe('2026-09-20');
  });
});
