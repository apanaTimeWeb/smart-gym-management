// RESPONSIBILITY: Owns Zod validation for the Admin HR due-payment submission form.
import { z } from 'zod';

export const adminHrDueFormSchema = z.object({
  staffId: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  amount: z.number().min(1, '__i18n:hr.validation.dueAmountMin'),
  notes: z.string().max(500, '__i18n:hr.validation.notesMax').optional(),
  paymentMode: z.enum(['Cash', 'Bank Transfer', 'UPI', 'Cheque']),
});


