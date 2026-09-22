// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
// RESPONSIBILITY: Expenses feature facade. UI editing state is module-scoped Zustand; server data and mutations are TanStack Query.
"use client";
/** Coordinates the Manager / feature. */
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSaveExpenseMutation, useDeleteExpenseMutation } from "@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesMutations";
import { useExpensesListQuery } from "@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesQueries";
import { useManagerExpensesUiStore } from "@/app/manager/expenses/expenses_store/ManagerUseManagerExpensesUiStore";
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from "@/app/manager/manager_infrastructure/ManagerToastService";
import type { ManagerExpensesViewModel, Expense } from "@/app/manager/expenses/expenses_types/ManagerExpensesTypes";

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerExpensesLogic(): ManagerExpensesViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerExpensesUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || "All"; const currentPage = Number(searchParams.get("page") || "1");
  const setUrlParam = useCallback((key: string, value: string | null) => { const params = new URLSearchParams(searchParams.toString()); if (!value || (key === "status" && value === "All") || (key === "page" && value === "1")) params.delete(key); else params.set(key, value); if (key !== "page") params.delete("page"); router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false }); }, [pathname, router, searchParams]);
  const expensesQuery = useExpensesListQuery({ search, status: statusFilter === "All" ? "" : statusFilter, page: String(currentPage), limit: "10" });

  const reload = useCallback(() => { expensesQuery.refetch(); }, [expensesQuery]);
  const errorMessage = expensesQuery.error instanceof Error ? expensesQuery.error.message : undefined;
  const saveMutation = useSaveExpenseMutation(); const deleteMutation = useDeleteExpenseMutation();
  const saveExpense = useCallback(async (data: Partial<Expense>, idempotencyKey?: string) => { try { const response = await saveMutation.mutateAsync({ ...data, id: ui.editId || undefined, idempotencyKey: idempotencyKey || '' }); showManagerSuccessToast(response.message, `manager-expense-${ui.editId ?? 'new'}-save`); ui.closeModal(); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${ui.editId ?? 'new'}-save-error`); throw error; } }, [saveMutation, ui.closeModal, ui.editId]);
  const deleteExpense = useCallback(async (id: string) => { const response = await deleteMutation.mutateAsync({ id, idempotencyKey: createManagerIdempotencyKey() }); showManagerSuccessToast(response.message, `manager-expense-${id}-delete`); }, [deleteMutation]);
  const markAsPaid = useCallback(async (id: string) => { try { const response = await saveMutation.mutateAsync({ id, status: "PAID", idempotencyKey: createManagerIdempotencyKey() }); showManagerSuccessToast(response.message, `manager-expense-${id}-paid`); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${id}-paid-error`); } }, [saveMutation]);
  return useMemo(() => ({ search, setSearch: (value: string) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value: string) => setUrlParam("status", value), currentPage, setCurrentPage: (value: number) => setUrlParam("page", String(value)), expenses: expensesQuery.data?.expenses ?? [], totalExpenses: expensesQuery.data?.total ?? 0, isPending: expensesQuery.isPending, isError: expensesQuery.isError, errorMessage, reload, showModal: ui.showModal, setShowModal: (show: boolean) => { if (show) ui.openAdd(); else ui.closeModal(); }, editId: ui.editId, editData: ui.editData, openAdd: ui.openAdd, openEdit: ui.openEdit, saveExpense, deleteExpense, markAsPaid, saving: saveMutation.isPending || deleteMutation.isPending }), [currentPage, deleteMutation.isPending, deleteExpense, expensesQuery.data?.expenses, expensesQuery.data?.total, expensesQuery.isError, expensesQuery.isPending, errorMessage, markAsPaid, reload, saveExpense, saveMutation.isPending, search, setUrlParam, statusFilter, ui.editData, ui.editId, ui.openAdd, ui.openEdit, ui.closeModal, ui.showModal]);
}
