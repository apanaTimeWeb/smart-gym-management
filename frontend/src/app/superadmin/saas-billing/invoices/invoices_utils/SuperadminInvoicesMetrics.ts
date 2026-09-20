import type { SaaSInvoice } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
// RESPONSIBILITY: Computes derived invoice totals from the current server response. No API or UI state ownership.
export function calculateSuperadminInvoiceMetrics(invoices: SaaSInvoice[]) {
    const totalRevenue = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const failedRevenue = invoices.filter(i => i.status === 'FAILED').reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const pendingRevenue = invoices.filter(i => i.status === 'PENDING').reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const overdueCount = invoices.filter(i => i.status === 'OVERDUE').length;
    return { totalRevenue, failedRevenue, pendingRevenue, overdueCount };
}
