import { z } from 'zod';

/**
 * @description Validates manager-entered finance payment data before it crosses the API boundary.
 * @dependencies Local payment method vocabulary.
 * @edge-case Rejects non-positive amounts and missing member identity while allowing optional notes.
 */
export const managerFinancePaymentFormSchema = z.object({
  memberId: z.string().trim().min(1),
  amount: z.coerce.number().positive(),
  method: z.enum(['UPI', 'Cash', 'Card', 'NetBanking', 'Cheque', 'Other']),
  notes: z.string().trim().max(500).default(''),
  paidAt: z.string().min(1)
});
export type ManagerFinancePaymentFormInput = z.input<typeof managerFinancePaymentFormSchema>;
export type ManagerFinancePaymentFormOutput = z.output<typeof managerFinancePaymentFormSchema>;
