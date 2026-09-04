// RESPONSIBILITY: Zustand store that manages all async data for the Expenses module.
import { create } from 'zustand';
import { expensesApi } from '@/app/manager/expenses/expenses_api/expenses_api';
import type { Expense, ExpenseStats } from '@/app/manager/expenses/expenses_types/expenses_types';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

interface ExpensesState {
  expenses: Expense[];
  stats: ExpenseStats;
  totalExpenses: number;
  fetchState: FetchState;
  saving: boolean;
  
  loadAll: (params?: Record<string, string>) => Promise<void>;
  saveExpense: (data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpensesStore = create<ExpensesState>((set, get) => ({
  expenses: [],
  stats: { totalAmount: 0, paidAmount: 0, pendingAmount: 0, thisMonthAmount: 0 },
  totalExpenses: 0,
  fetchState: 'idle',
  saving: false,

  loadAll: async (params) => {
    set({ fetchState: 'loading' });
    try {
      const [expRes, statsRes] = await Promise.all([
        expensesApi.getAll(params),
        expensesApi.getStats()
      ]);
      set({
        expenses: expRes.data?.expenses || [],
        totalExpenses: expRes.data?.total || 0,
        stats: statsRes.data || { totalAmount: 0, paidAmount: 0, pendingAmount: 0, thisMonthAmount: 0 },
        fetchState: 'success'
      });
    } catch (e) {
      set({ fetchState: 'error' });
    }
  },

  saveExpense: async (data) => {
    set({ saving: true });
    try {
      if (data.id) {
        await expensesApi.update(data.id, data);
      } else {
        await expensesApi.create(data);
      }
      // Re-fetch after save to keep stats in sync
      await get().loadAll();
    } finally {
      set({ saving: false });
    }
  },

  deleteExpense: async (id) => {
    set({ saving: true });
    try {
      await expensesApi.remove(id);
      await get().loadAll();
    } finally {
      set({ saving: false });
    }
  }
}));
