import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_utils/SuperadminPlansFormatCurrency';



describe('SuperadminPlansFormatCurrency', () => {
  it('converts minor units to localized currency text', () => {
    expect(formatCurrency(12500, 'INR', 'en-IN')).toContain('125.00');
  });
});
