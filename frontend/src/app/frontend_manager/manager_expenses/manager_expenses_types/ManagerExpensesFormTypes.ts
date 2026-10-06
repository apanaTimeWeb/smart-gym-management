import { MANAGER_EXPENSES_STATUS_VALUES } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesConstants';
import type { managerExpensesFormSchema } from '@/app/frontend_manager/manager_expenses/manager_expenses_schemas/ManagerExpensesFormSchema';
import type { z } from 'zod';


export type ExpenseFormValues = z.infer<typeof managerExpensesFormSchema>;
/**
 * @description Provides the ManagerExpensesFormTypes implementation for the expenses module.
 * @dependencies @/app/frontend_manager/manager_expenses/manager_expenses_schemas/ManagerExpensesFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_EXPENSE_FORM: ExpenseFormValues = {
  title: '', category: 'Miscellaneous', amount: 0, date: '', status: MANAGER_EXPENSES_STATUS_VALUES.PENDING, referenceNo: '', notes: '', receiptUrl: '',
};
