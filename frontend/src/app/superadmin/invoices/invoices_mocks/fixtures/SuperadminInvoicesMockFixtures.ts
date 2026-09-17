// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
export const MOCK_INVOICE_TENANTS = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro' },
    { id: 't2', name: 'Fit Life Studio', plan: 'Basic' },
    { id: 't3', name: 'CrossFit Box', plan: 'Enterprise' },
];

export const MOCK_SUPERADMIN_INVOICES: SaaSInvoice[] = [
    { id: 'inv1', tenantId: 't1', tenantName: 'Iron Paradise', amount: 1999, currency: 'INR', status: 'PAID', issuedAt: '2026-09-01', dueDate: '2026-09-07', paidAt: '2026-09-05', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv2', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 4999, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-01', dueDate: '2026-08-07', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv3', tenantId: 't3', tenantName: 'CrossFit Box', amount: 9999, currency: 'INR', status: 'PENDING', issuedAt: '2026-09-15', dueDate: '2026-09-22', invoiceType: 'SETUP_FEE', planName: 'Enterprise' },
    { id: 'inv4', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 2999, currency: 'INR', status: 'FAILED', issuedAt: '2026-09-13', dueDate: '2026-09-20', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv5', tenantId: 't5', tenantName: 'Pulse Fitness', amount: 3999, currency: 'INR', status: 'PAID', issuedAt: '2026-09-10', dueDate: '2026-09-17', paidAt: '2026-09-11', paymentMethod: 'UPI', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv6', tenantId: 't6', tenantName: 'Urban Strength', amount: 7999, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-20', dueDate: '2026-08-27', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv7', tenantId: 't7', tenantName: 'Core Studio', amount: 1499, currency: 'INR', status: 'PENDING', issuedAt: '2026-09-08', dueDate: '2026-09-15', invoiceType: 'ONE_TIME', planName: 'Basic' },
    { id: 'inv8', tenantId: 't8', tenantName: 'Zen Athletics', amount: 2499, currency: 'INR', status: 'FAILED', issuedAt: '2026-08-28', dueDate: '2026-09-04', invoiceType: 'RECURRING', planName: 'Basic' },
    { id: 'inv9', tenantId: 't1', tenantName: 'Iron Paradise', amount: 2199, currency: 'INR', status: 'PAID', issuedAt: '2026-08-15', dueDate: '2026-08-22', paidAt: '2026-08-20', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv10', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 5099, currency: 'INR', status: 'PENDING', issuedAt: '2026-08-12', dueDate: '2026-08-19', invoiceType: 'RECURRING', planName: 'Basic' },
    { id: 'inv11', tenantId: 't3', tenantName: 'CrossFit Box', amount: 10499, currency: 'INR', status: 'PAID', issuedAt: '2026-08-10', dueDate: '2026-08-17', paidAt: '2026-08-12', paymentMethod: 'Bank Transfer', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv12', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 3199, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-05', dueDate: '2026-08-12', invoiceType: 'RECURRING', planName: 'Pro' },
];
