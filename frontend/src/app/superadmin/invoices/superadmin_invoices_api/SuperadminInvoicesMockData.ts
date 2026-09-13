import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';

export const MOCK_SUPERADMIN_INVOICES: SaaSInvoice[] = [
  {
    id: 'inv1', tenantId: 't1', tenantName: 'Iron Paradise', amount: 1999, currency: 'INR',
    status: 'PAID', issuedAt: '2023-11-01', dueDate: '2023-11-07', paidAt: '2023-11-05',
    paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro'
  },
  {
    id: 'inv2', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 4999, currency: 'INR',
    status: 'OVERDUE', issuedAt: '2023-10-01', dueDate: '2023-10-07',
    invoiceType: 'RECURRING', planName: 'Enterprise'
  },
  {
    id: 'inv3', tenantId: 't3', tenantName: 'CrossFit Box', amount: 9999, currency: 'INR',
    status: 'PENDING', issuedAt: '2023-11-15', dueDate: '2023-11-22',
    invoiceType: 'SETUP_FEE', planName: 'Enterprise'
  }
];
