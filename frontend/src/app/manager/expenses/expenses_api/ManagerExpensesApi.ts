import { apiFetch } from '@/lib/api';
import { managerExpenseSchema, managerExpensesListResponseSchema, managerExpenseStatsSchema, managerExpenseDeleteResponseSchema } from '@/app/manager/expenses/expenses_schemas/ManagerExpensesSchema';
import { ManagerExpensesUrlConfig } from '@/app/manager/expenses/expenses_url_config';
import { managerIdempotencyHeaders } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import type { Expense, ExpenseStats } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import type { ApiResponse } from '@/lib/api';


export const expensesApi = {
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
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: managerIdempotencyHeaders(idempotencyKey), dataSchema: managerExpenseSchema });
  },
  updateExpense: async (id: string, body: Partial<Expense>, idempotencyKey: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: managerIdempotencyHeaders(idempotencyKey), dataSchema: managerExpenseSchema });
  },
  deleteExpense: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseDeleteResponseSchema });
  } };
