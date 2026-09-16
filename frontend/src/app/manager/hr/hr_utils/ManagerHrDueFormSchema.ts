import { z } from 'zod';

export const managerHrDueFormSchema = z.object({
  staffId: z.string().min(1, 'Select a staff member.'),
  amount: z.number().positive('Enter a valid amount.'),
  paymentMode: z.string().min(1, 'Select a payment mode.'),
  notes: z.string().max(500, 'Notes must be 500 characters or fewer.').optional().or(z.literal('')),
});

export type ManagerHrDueFormValues = z.infer<typeof managerHrDueFormSchema>;
