import { describe, expect, it } from 'vitest';
import { formatLandingCurrency } from '@/app/landing/landing_utils/LandingFormattingUtils';

describe('formatLandingCurrency', () => {
  it('formats thousands correctly with standard locale INR', () => {
    expect(formatLandingCurrency(1500, 'en-IN')).toContain('1,500');
    expect(formatLandingCurrency(1500, 'en-IN')).toContain('₹');
  });
});
