import { describe, expect, it } from 'vitest';
import { calculateSuperadminInvoicesAging } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesAgingUtils';

describe('calculateSuperadminInvoicesAging', () => {
  it('groups unpaid invoices into documented buckets', () => {
    const result = calculateSuperadminInvoicesAging([
      { id: '1', status: 'UNPAID', amount: 1000, dueDate: '2026-09-10T00:00:00.000Z', tenantName: 'A' } as never,
      { id: '2', status: 'PAID', amount: 2000, dueDate: '2026-09-01T00:00:00.000Z', tenantName: 'B' } as never,
    ], new Date('2026-09-20T12:00:00.000Z'));
    expect(result.totalUnpaid).toBe(1000);
    expect(result.agingBuckets['0-30 Days'].count).toBe(1);
  });
});
