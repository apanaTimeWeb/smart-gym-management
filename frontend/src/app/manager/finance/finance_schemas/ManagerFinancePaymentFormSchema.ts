// RESPONSIBILITY: Defines validation rules for the Finance payment recording form.
import { z } from 'zod';
export const managerFinancePaymentFormSchema = z.object({
  memberId: z.string().refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Valid Member ID required'),
  amount: z.string().refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Valid amount required'),
  method: z.string().min(1, 'Payment method is required'), notes: z.string().optional(), invoiceNumber: z.string().optional(), receiptNumber: z.string().optional(), taxId: z.string().optional(),
});
