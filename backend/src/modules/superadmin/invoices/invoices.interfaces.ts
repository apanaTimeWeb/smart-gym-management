export enum InvoiceStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export interface ISaaSInvoice {
  id: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  date: Date;
  planName: string;
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: ISaaSInvoice | ISaaSInvoice[] | null;
}
