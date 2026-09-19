import { describe, expect, it } from 'vitest';
import { paginateAdminSubscriptionsInvoices } from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsPaginateInvoices';
import type { Invoice } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

describe('paginateAdminSubscriptionsInvoices', () => {
  it('returns stable page metadata and distinct invoice pages', () => {
    const invoices = Array.from({ length: 11 }, (_, index) => ({
      id: `inv-${index}`,
      invoiceNo: `INV-${index}`,
      date: '2026-01-01',
      dueDate: '2026-01-07',
      amount: 1000,
      status: 'paid',
      planName: 'Growth',
      billingCycle: 'monthly',
      pdfUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUVPRg==',
    } satisfies Invoice));

    const first = paginateAdminSubscriptionsInvoices(invoices, 1, 10);
    const second = paginateAdminSubscriptionsInvoices(invoices, 2, 10);

    expect(first.items).toHaveLength(10);
    expect(second.items).toHaveLength(1);
    expect(first.hasNextPage).toBe(true);
    expect(second.hasPrevPage).toBe(true);
    expect(first.items[0]?.id).not.toBe(second.items[0]?.id);
  });
});
