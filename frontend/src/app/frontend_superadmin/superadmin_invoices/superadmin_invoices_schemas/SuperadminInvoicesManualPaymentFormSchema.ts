import { z } from 'zod';

/**
 * Form-level validation for the documented manual-payment workflow.
 * RESPONSIBILITY: Validates only the UI-owned amount field; gym identity remains owned by the page state.
 */
export const SuperadminInvoicesManualPaymentFormSchema = z.object({
  amount: z.coerce.number().positive('Enter a payment amount greater than 0.'),
});

export type SuperadminInvoicesManualPaymentFormValues = z.infer<typeof SuperadminInvoicesManualPaymentFormSchema>;
