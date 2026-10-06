/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { create } from "zustand";
import { EXPENSE_PAID_STATUS } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import type { Expense } from "@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes";

interface ManagerExpensesUiState { showModal: boolean; editId: string | null; editData: Partial<Expense> | null; openAdd: () => void; openEdit: (expense: Expense) => void; closeModal: () => void; }
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useManagerExpensesUiStore.
 * @dependencies Uses ManagerExpensesTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerExpensesUiStore = create<ManagerExpensesUiState>((set) => ({
  showModal: false, editId: null, editData: null,
  openAdd: () => set({ showModal: true, editId: null, editData: { status: EXPENSE_PAID_STATUS, date: new Date().toISOString().split("T")[0] || "" } }),
  openEdit: (expense) => set({ showModal: true, editId: expense.id, editData: { ...expense, date: expense.date.split("T")[0] || "" } }),
  closeModal: () => set({ showModal: false }) }));
