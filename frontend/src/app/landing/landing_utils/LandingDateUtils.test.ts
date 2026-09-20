import { describe, expect, it } from 'vitest';
import { serializeLandingDateToUtc } from '@/app/landing/landing_utils/LandingDateUtils';

describe('serializeLandingDateToUtc', () => {
  it('returns an ISO timestamp for a valid date input', () => {
    const value = serializeLandingDateToUtc('2026-09-20');
    expect(Number.isNaN(Date.parse(value))).toBe(false);
    expect(value).toMatch(/Z$/);
  });
});
