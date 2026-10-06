import { z } from 'zod';

/**
 * @description Validates the payroll payment amount before the mutation boundary.
 * @dependencies Zod only.
 * @edge-case Rejects zero, negative, non-integer, and non-finite payment amounts.
 */
export const adminHrPaymentFormSchema = z.object({ amount: z.number().int().positive() });

