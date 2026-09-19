import { describe, expect, it } from 'vitest';
import { getSuperadminDateRange, serializeSuperadminCustomDateRange } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateRangeUtils';

describe('getSuperadminDateRange', () => {
  const now = new Date(2026, 8, 18, 23, 30, 0);
  it('returns the local calendar day for today', () => expect(getSuperadminDateRange('today', now)).toEqual({ start: '2026-09-18', end: '2026-09-18' }));
  it('returns the current Sunday-to-today week without UTC conversion', () => expect(getSuperadminDateRange('this_week', now)).toEqual({ start: '2026-09-13', end: '2026-09-18' }));
  it('returns month and year boundaries', () => {
    expect(getSuperadminDateRange('this_month', now)).toEqual({ start: '2026-09-01', end: '2026-09-18' });
    expect(getSuperadminDateRange('this_year', now)).toEqual({ start: '2026-01-01', end: '2026-09-18' });
  });
  it('keeps custom date strings unchanged at the serialization boundary', () => expect(serializeSuperadminCustomDateRange('2026-09-01', '2026-09-18')).toEqual({ start: '2026-09-01', end: '2026-09-18' }));
});
