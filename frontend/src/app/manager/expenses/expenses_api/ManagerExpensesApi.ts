// RESPONSIBILITY: Provides isolated data fetching methods for the expenses module.
import type { ApiResponse } from '@/lib/api';
import type { Expense, ExpenseStats } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import { MOCK_EXPENSES_LIST, MOCK_EXPENSES_STATS } from '@/app/manager/expenses/expenses_api/ManagerExpensesMockData';

export const expensesApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ expenses: Expense[]; total: number; page: number; limit: number }>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let filtered = [...MOCK_EXPENSES_LIST];
    
    if (params?.status && params.status !== 'All') {
      filtered = filtered.filter(e => e.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
      );
    }
    
    return {
      success: true,
      message: 'Fetched expenses',
      data: {
        expenses: filtered,
        total: filtered.length,
        page: 1,
        limit: 10
      }
    };
  },
  getOne: async (id: string): Promise<ApiResponse<Expense>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const expense = MOCK_EXPENSES_LIST.find(e => e.id === id);
    if (!expense) throw new Error('Not found');
    return { success: true, message: 'Fetched expense', data: expense };
  },
  getStats: async (params?: Record<string, string>): Promise<ApiResponse<ExpenseStats>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Fetched stats', data: MOCK_EXPENSES_STATS };
  },
  create: async (body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newExpense = { ...body, id: Math.random().toString(), createdAt: new Date().toISOString() } as Expense;
    return { success: true, message: 'Created expense', data: newExpense };
  },
  update: async (id: string, body: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Updated expense', data: { ...MOCK_EXPENSES_LIST[0], ...body, id } as Expense };
  },
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Deleted expense', data: { id } };
  },
};
