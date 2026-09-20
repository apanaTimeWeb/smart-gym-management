// DATA FLOW: Manager module state/API data → useManagerExpensesMutations → owning Manager UI components.
'use client';
/** Manages UseExpensesMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesApi } from '@/app/manager/expenses/expenses_api/ManagerExpensesApi';
import { managerExpensesQueryKeys } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesQueries';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import type { Expense } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useSaveExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Expense> & { idempotencyKey?: string }) => {
      const { idempotencyKey, ...rest } = data;
      const payload: Partial<Expense> = { ...rest, amount: rest.amount === undefined ? undefined : toManagerMinorUnits(rest.amount) };
      if (rest.id) {
        return expensesApi.updateExpense(rest.id, payload, idempotencyKey || '');
      }
      return expensesApi.createExpense(payload, idempotencyKey || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => expensesApi.deleteExpense(id, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    } });
}
