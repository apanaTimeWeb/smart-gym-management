'use client';
// DATA FLOW: Manager module state/API data → useManagerExpensesMutations → owning Manager UI components.
/** Manages UseExpensesMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesApi } from '@/app/manager/expenses/expenses_api/ManagerExpensesApi';
import { managerExpensesQueryKeys } from '@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesQueries';
import type { Expense } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

export function useSaveExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Expense>) => {
      const payload: Partial<Expense> = { ...data, amount: data.amount === undefined ? undefined : toManagerMinorUnits(data.amount) };
      if (data.id) {
        return expensesApi.updateExpense(data.id, payload);
      }
      return expensesApi.createExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    } });
}

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => expensesApi.deleteExpense(id, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    } });
}
