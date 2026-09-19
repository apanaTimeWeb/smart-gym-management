// RESPONSIBILITY: Owns TypeScript values for the Finance payment recording form.
import type { z } from 'zod';
import { managerFinancePaymentFormSchema } from '@/app/manager/finance/finance_schemas/ManagerFinancePaymentFormSchema';
export type AddPaymentFormValues = z.infer<typeof managerFinancePaymentFormSchema>;
export const EMPTY_PAYMENT_FORM: AddPaymentFormValues = { memberId: '', amount: '', method: 'UPI', notes: '', invoiceNumber: '', receiptNumber: '', taxId: '' };
