import { describe, expect, it } from 'vitest';
import { formatPublicLandingCurrency } from '@/app/frontend_public/landing/landing_utils/PublicLandingFormattingUtils';

describe('formatPublicLandingCurrency', () => {
  it('formats thousands correctly with standard locale INR', () => {
    expect(formatPublicLandingCurrency(150000, 'INR', 'en-IN')).toContain('1,500');
    expect(formatPublicLandingCurrency(150000, 'INR', 'en-IN')).toContain('₹');
  });
});
