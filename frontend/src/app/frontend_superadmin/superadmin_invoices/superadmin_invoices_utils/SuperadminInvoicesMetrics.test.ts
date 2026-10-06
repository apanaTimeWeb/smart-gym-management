import { describe, expect, it } from 'vitest';

import { calculateSuperadminInvoiceMetrics } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesMetrics';


describe('calculateSuperadminInvoiceMetrics', () => {
  it('calculates revenue by invoice status', () => {
    const metrics = calculateSuperadminInvoiceMetrics([
      { id: '1', tenantId: 't1', tenantName: 'A', amount: 1000, currency: 'INR', status: 'PAID', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Pro' },
      { id: '2', tenantId: 't2', tenantName: 'B', amount: 500, currency: 'INR', status: 'FAILED', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Basic' },
      { id: '3', tenantId: 't3', tenantName: 'C', amount: 700, currency: 'INR', status: 'PENDING', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Basic' },
      { id: '4', tenantId: 't4', tenantName: 'D', amount: 900, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Enterprise' },
    ] as never);
    expect(metrics.totalRevenue).toBe(1000);
    expect(metrics.failedRevenue).toBe(500);
    expect(metrics.pendingRevenue).toBe(700);
    expect(metrics.overdueCount).toBe(1);
  });
});
