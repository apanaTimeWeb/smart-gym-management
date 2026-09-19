// RESPONSIBILITY: Owns TypeScript types and defaults for the Expenses editor form.
import type { z } from 'zod';
import { managerExpensesFormSchema } from '@/app/manager/expenses/expenses_schemas/ManagerExpensesFormSchema';

export type ExpenseFormValues = z.infer<typeof managerExpensesFormSchema>;
export const EMPTY_EXPENSE_FORM: ExpenseFormValues = {
  title: '', category: 'Miscellaneous', amount: 0, date: '', status: 'PENDING', referenceNo: '', notes: '', receiptUrl: '',
};
