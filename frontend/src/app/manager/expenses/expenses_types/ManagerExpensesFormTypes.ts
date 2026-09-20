// RESPONSIBILITY: Owns TypeScript types and defaults for the Expenses editor form.
import { managerExpensesFormSchema } from '@/app/manager/expenses/expenses_schemas/ManagerExpensesFormSchema';
import type { z } from 'zod';


export type ExpenseFormValues = z.infer<typeof managerExpensesFormSchema>;
export const EMPTY_EXPENSE_FORM: ExpenseFormValues = {
  title: '', category: 'Miscellaneous', amount: 0, date: '', status: 'PENDING', referenceNo: '', notes: '', receiptUrl: '',
};
