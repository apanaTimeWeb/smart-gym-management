import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesTypes';
export interface SuperadminInvoicesAgingReportProps { invoices: Invoice[]; }

export type Invoice = SaaSInvoice;
