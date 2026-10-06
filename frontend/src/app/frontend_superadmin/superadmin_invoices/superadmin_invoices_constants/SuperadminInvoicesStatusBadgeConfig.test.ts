import { describe, expect, it } from 'vitest';

import { getSuperadminInvoicesStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesStatusBadgeConfig';



describe('getSuperadminInvoicesStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminInvoicesStatusBadgeClasses('PAID')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminInvoicesStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
