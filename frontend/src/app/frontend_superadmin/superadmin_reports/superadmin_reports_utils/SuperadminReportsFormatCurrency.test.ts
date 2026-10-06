import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_utils/SuperadminReportsFormatCurrency';



describe('SuperadminReportsFormatCurrency', () => {
  it('formats the canonical minor-unit amount', () => {
    expect(formatCurrency(2500, 'INR', 'en-IN')).toContain('25.00');
  });
});
