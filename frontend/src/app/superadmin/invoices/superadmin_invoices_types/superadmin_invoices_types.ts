// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Invoices module.
export interface SaaSInvoice {
  id: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'OVERDUE';
  date: string;
  planName: string;
}
