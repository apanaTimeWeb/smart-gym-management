// RESPONSIBILITY: Runtime validation schemas for Manager Expenses API responses and form payloads.
import { z } from 'zod';

export const managerExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  amount: z.number(),
  date: z.string(),
  status: z.enum(['PAID', 'PENDING']),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
  receiptUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  vendorName: z.string().optional(),
  paymentMode: z.string().optional(),
  approvedBy: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.string().nullable().optional(),
  taxAmount: z.number().optional() });

export const managerExpensesListResponseSchema = z.object({
  expenses: z.array(managerExpenseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number() });

export const managerExpenseStatsSchema = z.object({
  totalAmount: z.number(),
  paidAmount: z.number(),
  pendingAmount: z.number(),
  thisMonthAmount: z.number() });

export const managerExpenseDeleteResponseSchema = z.object({ id: z.string() });
