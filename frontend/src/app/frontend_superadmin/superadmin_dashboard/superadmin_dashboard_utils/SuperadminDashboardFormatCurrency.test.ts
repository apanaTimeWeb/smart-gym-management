import { describe, expect, it } from 'vitest';

import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardFormatCurrency';

describe('SuperadminDashboardFormatCurrency', () => {
  it('formats backend minor units using the supplied ISO currency', () => {
    expect(SuperadminDashboardFormatCurrency(799900, 'INR', 'en-IN')).toContain('7,999');
  });

  it('handles zero-decimal and three-decimal currencies', () => {
    expect(SuperadminDashboardFormatCurrency(1234, 'JPY', 'en-IN')).toContain('1,234');
    expect(SuperadminDashboardFormatCurrency(1234, 'KWD', 'en-IN')).toContain('1.234');
  });
});
