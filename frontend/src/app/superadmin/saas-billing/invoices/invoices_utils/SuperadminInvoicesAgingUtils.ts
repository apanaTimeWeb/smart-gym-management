// RESPONSIBILITY: Calculates invoice aging buckets from API-provided invoice data. No JSX or network calls.
import type { SaaSInvoice } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';

export interface SuperadminInvoicesAgingBucket { amount: number; count: number; currency?: string; invoices: SaaSInvoice[]; }
export type SuperadminInvoicesAgingBuckets = Record<'Not Yet Due' | '0-30 Days' | '31-60 Days' | '60+ Days', SuperadminInvoicesAgingBucket>;

/** Groups unpaid invoices into documented aging buckets using minor-unit monetary values. */
export function calculateSuperadminInvoicesAging(invoices: SaaSInvoice[], now = new Date()): { agingBuckets: SuperadminInvoicesAgingBuckets; totalUnpaid: number } {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const buckets: SuperadminInvoicesAgingBuckets = {
    'Not Yet Due': { amount: 0, count: 0, invoices: [] },
    '0-30 Days': { amount: 0, count: 0, invoices: [] },
    '31-60 Days': { amount: 0, count: 0, invoices: [] },
    '60+ Days': { amount: 0, count: 0, invoices: [] },
  };
  let totalUnpaid = 0;
  for (const invoice of invoices) {
    if (invoice.status === 'PAID') continue;
    const amount = Number(invoice.amount) || 0;
    totalUnpaid += amount;
    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((today.getTime() - dueDate.getTime()) / 86_400_000);
    const bucketName = diffDays <= 0 ? 'Not Yet Due' : diffDays <= 30 ? '0-30 Days' : diffDays <= 60 ? '31-60 Days' : '60+ Days';
    buckets[bucketName].amount += amount;
    buckets[bucketName].count += 1;
    buckets[bucketName].invoices.push(invoice);
  }
  return { agingBuckets: buckets, totalUnpaid };
}
