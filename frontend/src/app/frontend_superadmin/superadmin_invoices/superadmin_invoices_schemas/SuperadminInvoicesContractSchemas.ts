/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
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
export const CreateManualPaymentDtoSchema = z.object({
    gymId: z.string().min(1),
    amount: z.number().positive(),
    planName: z.string().min(1),
    currency: z.string().min(3).max(3).optional(),
});
export const InvoiceLineItemSchema = z.object({
    description: z.string(),
    amount: z.number(),
    quantity: z.number().optional(),
}).passthrough();
export const SuperadminInvoicesTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
});
