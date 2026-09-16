'use client';
// DATA FLOW: Manager module state/API data → ManagerExpensesContext → owning Manager UI components.
// RESPONSIBILITY: Provides local UI state (filtering, pagination, modal visibility) for the Expenses module.
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Expense } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { useSaveExpenseMutation, useDeleteExpenseMutation } from '@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesMutations';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { useExpensesListQuery } from '@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesQueries';

interface ExpensesContextValue {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editId: string | null;
  editData: Partial<Expense> | null;
  
  openAdd: () => void;
  openEdit: (e: Expense) => void;
  saveExpense: (data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  exportExpenses: () => void;
  
  saving: boolean;
}

const ManagerExpensesContext = createContext<ExpensesContextValue | undefined>(undefined);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All' && value !== '1') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  }, [searchParams]);

  const setSearch = (v: string) => router.replace(`${pathname}?${createQueryString('search', v)}`);
  const setStatusFilter = (v: string) => router.replace(`${pathname}?${createQueryString('status', v)}`);
  const setCurrentPage = (v: number) => router.replace(`${pathname}?${createQueryString('page', v.toString())}`);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Expense> | null>(null);

  const saveMutation = useSaveExpenseMutation();
  const deleteMutation = useDeleteExpenseMutation();
  const exportQuery = useExpensesListQuery({ search: '', status: '', page: '1' });
  
  const saving = saveMutation.isPending || deleteMutation.isPending;

  const openAdd = () => {
    setEditId(null);
    setEditData({ status: 'PAID', date: new Date().toISOString().split('T')[0] || '' });
    setShowModal(true);
  };

  const openEdit = (e: Expense) => {
    setEditId(e.id);
    setEditData({ ...e, date: e.date.split('T')[0] || '' }); // Format for date input
    setShowModal(true);
  };

  const saveExpense = async (data: Partial<Expense>) => {
    try {
      const response = await saveMutation.mutateAsync({ ...data, id: editId || undefined });
      showManagerSuccessToast(response.message, 'manager-expenses-success');
      setShowModal(false);
    } catch (e: unknown) {
      showManagerErrorToast(e, 'manager-expenses-error');
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const response = await deleteMutation.mutateAsync(id);
      showManagerSuccessToast(response.message, 'manager-expenses-success');
    } catch (e: unknown) {
      showManagerErrorToast(e, 'manager-expenses-error');
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      const response = await saveMutation.mutateAsync({ id, status: 'PAID' });
      showManagerSuccessToast(response.message, 'manager-expenses-success');
    } catch (e: unknown) {
      showManagerErrorToast(e, 'manager-expenses-error');
    }
  };

  const exportExpenses = () => {
    const rows = exportQuery.data?.expenses ?? [];
    const escapeCsv = (value: unknown) => `\"${String(value ?? '').replace(/\"/g, '\"\"')}\"`;
    const header = ['ID', 'Title', 'Category', 'Amount', 'Date', 'Status'];
    const csv = [header, ...rows.map((item) => [item.id, item.title, item.category, item.amount, item.date, item.status])].map((row) => row.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = 'manager-expenses.csv';
    anchor.click();
    URL.revokeObjectURL(href);
  };

  const value = useMemo(() => ({
    search, setSearch,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    showModal, setShowModal,
    editId, editData,
    openAdd, openEdit,
    saveExpense, deleteExpense, markAsPaid, exportExpenses,
    saving
  }), [search, statusFilter, currentPage, showModal, editId, editData, saving, exportQuery.data]);

  return <ManagerExpensesContext.Provider value={value}>{children}</ManagerExpensesContext.Provider>;
}

export const useExpensesContext = () => {
  const context = useContext(ManagerExpensesContext);
  if (!context) throw new Error('useExpensesContext must be used within ExpensesProvider');
  return context;
};
