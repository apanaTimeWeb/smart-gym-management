// DATA FLOW: Expense UI state → RHF/Zod → expense mutation → query cache/UI.
// RESPONSIBILITY: Owns Expense form setup, synchronization, validation, submission, and dirty-state protection.
'use client';
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerExpensesLogic } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesLogic';
import { managerExpensesFormSchema } from '@/app/manager/expenses/expenses_schemas/ManagerExpensesFormSchema';
import { EMPTY_EXPENSE_FORM } from '@/app/manager/expenses/expenses_types/ManagerExpensesFormTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { ExpenseFormValues } from '@/app/manager/expenses/expenses_types/ManagerExpensesFormTypes';


/** Coordinates the Expense editor lifecycle independently of its rendering component. */
export function useManagerExpensesForm() {
  const logic = useManagerExpensesLogic();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ExpenseFormValues>({ resolver: zodResolver(managerExpensesFormSchema), defaultValues: EMPTY_EXPENSE_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.showModal) form.reset(logic.editData
      ? { ...(logic.editData as ExpenseFormValues), amount: fromManagerMinorUnits(logic.editData.amount ?? 0) }
      : { ...EMPTY_EXPENSE_FORM, date: new Date().toISOString().split('T')[0] || '' }); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: logic.editId ? 'Confirm Expense Update' : 'Confirm Expense', message: logic.editId ? 'This will update the selected expense record.' : 'This will create the expense record.', confirmText: logic.editId ? 'Update Expense' : 'Save Expense', cancelText: 'Keep Editing', type: 'warning' });
    if (!confirmed) return;
    idempotencyKeyRef.current ??= createManagerIdempotencyKey();
    try {
      await logic.saveExpense(values, idempotencyKeyRef.current);
      idempotencyKeyRef.current = null;
    } catch {
      // Keep the key so an explicit retry reuses the same user-intent key.
      throw new Error('Expense submission failed.');
    }
  });
  return { ...logic, form, handleClose, submit };
}
