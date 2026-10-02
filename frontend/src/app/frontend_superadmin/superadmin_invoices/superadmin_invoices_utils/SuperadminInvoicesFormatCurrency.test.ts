import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesFormatCurrency';



describe('SuperadminInvoicesFormatCurrency', () => {
  it('formats invoice amounts from minor units', () => {
    expect(formatCurrency(5000, 'INR', 'en-IN')).toContain('50.00');
  });
});
