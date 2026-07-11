export type InvoiceStatus = 'PAID' | 'PENDING' | 'FAILED';
export interface ISaaSInvoice {
  id: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  date: Date;
  planName: string;
}
