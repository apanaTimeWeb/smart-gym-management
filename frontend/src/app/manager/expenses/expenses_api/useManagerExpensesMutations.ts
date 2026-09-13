import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesApi } from '@/app/manager/expenses/expenses_api/ManagerExpensesApi';
import { managerExpensesQueryKeys } from '@/app/manager/expenses/expenses_api/useManagerExpensesQueries';
import type { Expense } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';

export function useSaveExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Expense>) => {
      if (data.id) {
        return expensesApi.update(data.id, data);
      }
      return expensesApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    },
  });
}

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => expensesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerExpensesQueryKeys.all });
    },
  });
}
