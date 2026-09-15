import { z } from 'zod';
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Invoices module.

export const SaaSInvoiceSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(['PAID', 'PENDING', 'FAILED', 'OVERDUE']),
  issuedAt: z.string(),
  dueDate: z.string(),
  paidAt: z.string().optional(),
  paymentMethod: z.string().optional(),
  invoiceType: z.enum(['RECURRING', 'ONE_TIME', 'SETUP_FEE']),
  planName: z.string(),
  taxId: z.string().optional(),
});
export type SaaSInvoice = z.infer<typeof SaaSInvoiceSchema>;

export const InvoiceLineItemSchema = z.object({
  description: z.string(),
  amount: z.number(),
  quantity: z.number().optional(),
}).passthrough();
export type InvoiceLineItem = z.infer<typeof InvoiceLineItemSchema>;

export const SuperadminInvoicesTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string(),
});
export type SuperadminInvoicesTenant = z.infer<typeof SuperadminInvoicesTenantSchema>;
