// RESPONSIBILITY: Defines validation rules for creating and editing expenses.
import { z } from 'zod';

/**
 * @description Provides the ManagerExpensesFormSchema implementation for the expenses module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerExpensesFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(2, 'Category is required'),
  amount: z.number().min(1, 'Amount must be greater than 0').max(1_000_000_000, 'Amount is too large'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['PAID', 'PENDING']),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
  receiptUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});
