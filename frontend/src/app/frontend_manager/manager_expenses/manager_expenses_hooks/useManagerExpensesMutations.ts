'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerExpensesApi } from '@/app/frontend_manager/manager_expenses/manager_expenses_api/ManagerExpensesApi';
import { ManagerExpensesQueryKeys } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesQueryKeys';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import type { Expense } from '@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useSaveExpenseMutation.
 * @dependencies Uses ManagerExpensesApi, useManagerExpensesQueries, ManagerMoney, ManagerExpensesTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useSaveExpenseMutation owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useSaveExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Expense> & { idempotencyKey: string }) => {
      const { idempotencyKey, ...rest } = data;
      const payload: Partial<Expense> = { ...rest, amount: rest.amount === undefined ? undefined : toManagerMinorUnits(rest.amount) };
      if (rest.id) {
        return ManagerExpensesApi.updateExpense(rest.id, payload, idempotencyKey);
      }
      return ManagerExpensesApi.createExpense(payload, idempotencyKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ManagerExpensesQueryKeys.all });
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useDeleteExpenseMutation coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerExpensesApi.deleteExpense(id, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ManagerExpensesQueryKeys.all });
    } });
}
