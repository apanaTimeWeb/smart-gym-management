import { describe, expect, it } from 'vitest';

import { SuperadminMessagingFormatCurrency } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatCurrency';

describe('SuperadminMessagingFormatCurrency', () => {
  it('formats backend minor units using the supplied ISO currency', () => {
    expect(SuperadminMessagingFormatCurrency(799900, 'INR', 'en-IN')).toContain('7,999');
  });

  it('handles zero-decimal and three-decimal currencies', () => {
    expect(SuperadminMessagingFormatCurrency(1234, 'JPY', 'en-IN')).toContain('1,234');
    expect(SuperadminMessagingFormatCurrency(1234, 'KWD', 'en-IN')).toContain('1.234');
  });
});
