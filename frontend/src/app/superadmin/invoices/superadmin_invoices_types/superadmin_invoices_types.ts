// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Invoices module.
export interface SaaSInvoice {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'OVERDUE';
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: string;
  invoiceType: 'RECURRING' | 'ONE_TIME' | 'SETUP_FEE';
  planName: string;
  taxId?: string;
}
