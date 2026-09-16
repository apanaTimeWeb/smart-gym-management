import { ManagerExpensesUrlConfig } from '@/app/manager/expenses/expenses_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Expense, ExpenseStats } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import { managerExpenseSchema, managerExpensesListResponseSchema, managerExpenseStatsSchema, managerExpenseDeleteResponseSchema } from '@/app/manager/expenses/expenses_types/ManagerExpensesSchema';

export const expensesApi = {
  fetchExpenses: async (params?: Record<string, string>): Promise<ApiResponse<{ expenses: Expense[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: managerExpensesListResponseSchema });
  },
  fetchExpenseById: async (id: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: managerExpenseSchema });
  },
  fetchExpenseStats: async (params?: Record<string, string>): Promise<ApiResponse<ExpenseStats>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/stats${query ? `?${query}` : ''}`, { dataSchema: managerExpenseStatsSchema });
  },
  createExpense: async (body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerExpenseSchema });
  },
  updateExpense: async (id: string, body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerExpenseSchema });
  },
  deleteExpense: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: managerExpenseDeleteResponseSchema });
  },
};
