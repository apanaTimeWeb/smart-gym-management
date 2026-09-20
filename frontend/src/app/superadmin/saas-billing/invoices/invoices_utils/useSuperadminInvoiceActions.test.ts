import { describe, expect, it } from 'vitest';
import { useSuperadminInvoiceActions } from '@/app/superadmin/saas-billing/invoices/invoices_utils/useSuperadminInvoiceActions.ts';

describe('useSuperadminInvoiceActions', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminInvoiceActions).toBe('function');
  });
});
