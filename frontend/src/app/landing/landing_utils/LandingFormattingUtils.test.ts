import { describe, expect, it } from 'vitest';
import { formatLandingCurrency } from '@/app/landing/landing_utils/LandingFormattingUtils';

describe('formatLandingCurrency', () => {
  it('formats INR marketing prices consistently', () => {
    expect(formatLandingCurrency(1500)).toContain('1,500');
    expect(formatLandingCurrency(1500)).toContain('₹');
  });
});
