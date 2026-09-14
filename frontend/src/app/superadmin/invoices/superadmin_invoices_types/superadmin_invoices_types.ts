import { z } from 'zod';
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


/** Schema for a single invoice line item. */
const InvoiceLineItemSchema = z.object({
  description: z.string(),
  amount: z.number(),
  quantity: z.number().optional(),
}).passthrough();

export const SaaSInvoiceSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  amount: z.number(),
  status: z.enum(['PAID', 'PENDING', 'OVERDUE', 'CANCELLED']),
  dueDate: z.string(),
  issuedDate: z.string(),
  paidDate: z.string().optional(),
  items: z.array(InvoiceLineItemSchema).optional()
});

/** TypeScript type inferred from the invoice line-item schema. */
export type InvoiceLineItem = z.infer<typeof InvoiceLineItemSchema>;
