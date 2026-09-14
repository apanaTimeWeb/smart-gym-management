import { z } from 'zod';

export const paymentStatusSchema = z.enum(['PAID', 'PENDING', 'REFUNDED', 'PARTIAL']);
export const paymentMethodSchema = z.enum(['UPI', 'Cash', 'Card', 'NetBanking', 'Cheque', 'Other']);

export const paymentSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  amount: z.number(),
  method: paymentMethodSchema,
  status: paymentStatusSchema,
  notes: z.string().optional(),
  invoiceNumber: z.string(),
  receiptNumber: z.string().optional(),
  taxId: z.string().optional(),
  paidAt: z.string(),
  gstAmount: z.number(),
  discountAmount: z.number(),
  couponCode: z.string().optional(),
  taxableAmount: z.number(),
  member: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    plan: z.object({ name: z.string() }).optional(),
  }).optional(),
});

export const financeSummarySchema = z.object({
  totalRevenue: z.number(),
  monthlyRevenue: z.number(),
  pendingAmount: z.number(),
  totalPayments: z.number(),
  gstCollected: z.number(),
  totalRefunds: z.number(),
  netRevenue: z.number(),
  revenueByMethod: z.record(paymentMethodSchema, z.number()),
  monthlyData: z.array(z.object({
    month: z.string(),
    revenue: z.number(),
    expenses: z.number().optional(),
  })),
});
