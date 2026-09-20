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
  const exportQuery = useExpensesListQuery({ search: "", status: "", page: "1", limit: "1000" });
  const saveMutation = useSaveExpenseMutation(); const deleteMutation = useDeleteExpenseMutation();
  const saveExpense = useCallback(async (data: Partial<Expense>, idempotencyKey?: string) => { try { const response = await saveMutation.mutateAsync({ ...data, id: ui.editId || undefined, idempotencyKey: idempotencyKey || '' }); showManagerSuccessToast(response.message, `manager-expense-${ui.editId ?? 'new'}-save`); ui.closeModal(); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${ui.editId ?? 'new'}-save-error`); throw error; } }, [saveMutation, ui.closeModal, ui.editId]);
  const deleteExpense = useCallback(async (id: string) => { const response = await deleteMutation.mutateAsync({ id, idempotencyKey: createManagerIdempotencyKey() }); showManagerSuccessToast(response.message, `manager-expense-${id}-delete`); }, [deleteMutation]);
  const markAsPaid = useCallback(async (id: string) => { try { const response = await saveMutation.mutateAsync({ id, status: "PAID", idempotencyKey: createManagerIdempotencyKey() }); showManagerSuccessToast(response.message, `manager-expense-${id}-paid`); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${id}-paid-error`); } }, [saveMutation]);
  const exportExpenses = useCallback(() => { const rows = exportQuery.data?.expenses ?? []; const escapeCsv = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`; const header = ["ID", "Title", "Category", "Amount", "Date", "Status"]; const csv = [header, ...rows.map((item) => [item.id, item.title, item.category, item.amount, item.date, item.status])].map((row) => row.map(escapeCsv).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const href = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = href; anchor.download = "manager-expenses.csv"; anchor.click(); URL.revokeObjectURL(href); }, [exportQuery.data]);
  return useMemo(() => ({ search, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)), showModal: ui.showModal, setShowModal: (show) => { if (show) ui.openAdd(); else ui.closeModal(); }, editId: ui.editId, editData: ui.editData, openAdd: ui.openAdd, openEdit: ui.openEdit, saveExpense, deleteExpense, markAsPaid, exportExpenses, saving: saveMutation.isPending || deleteMutation.isPending }), [currentPage, deleteMutation.isPending, deleteExpense, exportExpenses, markAsPaid, saveExpense, saveMutation.isPending, search, setUrlParam, statusFilter, ui.editData, ui.editId, ui.openAdd, ui.openEdit, ui.closeModal, ui.showModal]);
}
