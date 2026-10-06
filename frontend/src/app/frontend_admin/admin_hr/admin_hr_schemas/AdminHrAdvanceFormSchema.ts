// RESPONSIBILITY: Owns Zod validation for the Admin HR salary-advance submission form.
import { z } from 'zod';

export const adminHrAdvanceFormSchema = z.object({
  staffId: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  amount: z.number().min(1, '__i18n:hr.validation.advanceAmountMin'),
  notes: z.string().max(500, '__i18n:hr.validation.notesMax').optional(),
  paymentMode: z.enum(['Cash', 'Bank Transfer', 'UPI', 'Cheque']),
});


