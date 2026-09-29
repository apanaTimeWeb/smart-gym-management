import { describe, expect, it } from 'vitest';
import { serializePublicLandingDateToUtc } from '@/app/frontend_public/landing/landing_utils/PublicLandingDateUtils';

describe('serializePublicLandingDateToUtc', () => {
  it('returns an ISO timestamp for a valid date input', () => {
    const value = serializePublicLandingDateToUtc('2026-09-20');
    expect(Number.isNaN(Date.parse(value))).toBe(false);
    expect(value).toMatch(/Z$/);
  });
});
