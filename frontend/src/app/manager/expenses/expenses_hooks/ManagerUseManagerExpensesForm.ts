'use client';
// RESPONSIBILITY: Owns Expense form setup, synchronization, validation, submission, and dirty-state protection.
// DATA FLOW: Expense UI state → RHF/Zod → expense mutation → query cache/UI.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerExpensesLogic } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesLogic';
import { managerExpensesFormSchema } from '@/app/manager/expenses/expenses_schemas/ManagerExpensesFormSchema';
import type { ExpenseFormValues } from '@/app/manager/expenses/expenses_types/ManagerExpensesFormTypes';
import { EMPTY_EXPENSE_FORM } from '@/app/manager/expenses/expenses_types/ManagerExpensesFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

/** Coordinates the Expense editor lifecycle independently of its rendering component. */
export function useManagerExpensesForm() {
  const logic = useManagerExpensesLogic();
  const form = useForm<ExpenseFormValues>({ resolver: zodResolver(managerExpensesFormSchema), defaultValues: EMPTY_EXPENSE_FORM });
  useEffect(() => { if (logic.showModal) form.reset(logic.editData
      ? { ...(logic.editData as ExpenseFormValues), amount: fromManagerMinorUnits(logic.editData.amount ?? 0) }
      : { ...EMPTY_EXPENSE_FORM, date: new Date().toISOString().split('T')[0] || '' }); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => logic.saveExpense(values));
  return { ...logic, form, handleClose, submit };
}
