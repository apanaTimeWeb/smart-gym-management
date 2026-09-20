import { describe, expect, it } from 'vitest';
import { useSuperadminInvoicesV1 } from '@/app/superadmin/saas-billing/invoices/invoices_utils/useSuperadminInvoicesV1.ts';

describe('useSuperadminInvoicesV1', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminInvoicesV1).toBe('function');
  });
});
