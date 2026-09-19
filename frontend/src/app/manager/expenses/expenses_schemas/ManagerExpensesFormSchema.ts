// RESPONSIBILITY: Defines validation rules for creating and editing expenses.
import { z } from 'zod';

export const managerExpensesFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(2, 'Category is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['PAID', 'PENDING']),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
  receiptUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});
