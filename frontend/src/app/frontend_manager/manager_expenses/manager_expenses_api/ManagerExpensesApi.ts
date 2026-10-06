import { apiFetch } from '@/lib/api';
import { managerExpenseSchema, managerExpensesListResponseSchema, managerExpenseStatsSchema, managerExpenseDeleteResponseSchema } from '@/app/frontend_manager/manager_expenses/manager_expenses_schemas/ManagerExpensesSchema';
import { ManagerExpensesUrlConfig } from '@/app/frontend_manager/manager_expenses/manager_expenses_url_config';
import type { Expense, ExpenseStats } from '@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerExpensesApi implementation for the expenses module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_expenses/manager_expenses_schemas/ManagerExpensesSchema; @/app/frontend_manager/manager_expenses/manager_expenses_url_config; @/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerExpensesApi = {
  fetchExpenses: async (params?: Record<string, string>): Promise<ApiResponse<{ expenses: Expense[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: managerExpensesListResponseSchema });
  },
  fetchExpenseById: async (id: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: managerExpenseSchema });
  },
  fetchExpenseStats: async (params?: Record<string, string>): Promise<ApiResponse<ExpenseStats>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: managerExpenseStatsSchema });
  },
  createExpense: async (body: Partial<Expense>, idempotencyKey: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseSchema });
  },
  updateExpense: async (id: string, body: Partial<Expense>, idempotencyKey: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseSchema });
  },
  deleteExpense: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseDeleteResponseSchema });
  } };
