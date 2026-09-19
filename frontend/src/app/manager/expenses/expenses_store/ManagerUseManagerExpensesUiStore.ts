"use client";
/** Coordinates the Manager / feature. */
import { create } from "zustand";
import type { Expense } from "@/app/manager/expenses/expenses_types/ManagerExpensesTypes";
interface ManagerExpensesUiState { showModal: boolean; editId: string | null; editData: Partial<Expense> | null; openAdd: () => void; openEdit: (expense: Expense) => void; closeModal: () => void; }
export const useManagerExpensesUiStore = create<ManagerExpensesUiState>((set) => ({
  showModal: false, editId: null, editData: null,
  openAdd: () => set({ showModal: true, editId: null, editData: { status: "PAID", date: new Date().toISOString().split("T")[0] || "" } }),
  openEdit: (expense) => set({ showModal: true, editId: expense.id, editData: { ...expense, date: expense.date.split("T")[0] || "" } }),
  closeModal: () => set({ showModal: false }) }));
