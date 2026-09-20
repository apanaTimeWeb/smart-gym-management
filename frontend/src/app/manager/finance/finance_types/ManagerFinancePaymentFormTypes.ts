// RESPONSIBILITY: Owns TypeScript values for the Finance payment recording form.
import { managerFinancePaymentFormSchema } from '@/app/manager/finance/finance_schemas/ManagerFinancePaymentFormSchema';
import type { z } from 'zod';

export type AddPaymentFormValues = z.infer<typeof managerFinancePaymentFormSchema>;
export const EMPTY_PAYMENT_FORM: AddPaymentFormValues = { memberId: '', amount: '', method: 'UPI', notes: '', invoiceNumber: '', receiptNumber: '', taxId: '' };
