import { ManagerExpensesUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Expense, ExpenseStats } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import { managerExpenseSchema, managerExpensesListResponseSchema, managerExpenseStatsSchema, managerExpenseDeleteResponseSchema } from '@/app/manager/expenses/expenses_types/ManagerExpensesSchema';

export const expensesApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ expenses: Expense[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: managerExpensesListResponseSchema });
  },
  getOne: async (id: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: managerExpenseSchema });
  },
  getStats: async (params?: Record<string, string>): Promise<ApiResponse<ExpenseStats>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/stats${query ? `?${query}` : ''}`, { dataSchema: managerExpenseStatsSchema });
  },
  create: async (body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    return apiFetch(ManagerExpensesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerExpenseSchema });
  },
  update: async (id: string, body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerExpenseSchema });
  },
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerExpensesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: managerExpenseDeleteResponseSchema });
  },
};
