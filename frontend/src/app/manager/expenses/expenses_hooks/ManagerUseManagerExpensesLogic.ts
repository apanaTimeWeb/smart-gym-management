"use client";
// RESPONSIBILITY: Expenses feature facade. UI editing state is module-scoped Zustand; server data and mutations are TanStack Query.
/** Coordinates the Manager / feature. */
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ManagerExpensesViewModel, Expense } from "@/app/manager/expenses/expenses_types/ManagerExpensesTypes";
import { showManagerErrorToast, showManagerSuccessToast } from "@/app/manager/manager_infrastructure/ManagerToastService";
import { useSaveExpenseMutation, useDeleteExpenseMutation } from "@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesMutations";
import { useExpensesListQuery } from "@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesQueries";
import { useManagerExpensesUiStore } from "@/app/manager/expenses/expenses_store/ManagerUseManagerExpensesUiStore";
export function useManagerExpensesLogic(): ManagerExpensesViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerExpensesUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || "All"; const currentPage = Number(searchParams.get("page") || "1");
  const setUrlParam = useCallback((key: string, value: string | null) => { const params = new URLSearchParams(searchParams.toString()); if (!value || (key === "status" && value === "All") || (key === "page" && value === "1")) params.delete(key); else params.set(key, value); if (key !== "page") params.delete("page"); router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false }); }, [pathname, router, searchParams]);
  const exportQuery = useExpensesListQuery({ search: "", status: "", page: "1", limit: "1000" });
  const saveMutation = useSaveExpenseMutation(); const deleteMutation = useDeleteExpenseMutation();
  const saveExpense = useCallback(async (data: Partial<Expense>) => { try { const response = await saveMutation.mutateAsync({ ...data, id: ui.editId || undefined }); showManagerSuccessToast(response.message, "manager-expenses-success"); ui.closeModal(); } catch (error: unknown) { showManagerErrorToast(error, "manager-expenses-error"); } }, [saveMutation, ui.closeModal, ui.editId]);
  const deleteExpense = useCallback(async (id: string) => { const response = await deleteMutation.mutateAsync({ id, idempotencyKey: crypto.randomUUID() }); showManagerSuccessToast(response.message, "manager-expenses-success"); }, [deleteMutation]);
  const markAsPaid = useCallback(async (id: string) => { try { const response = await saveMutation.mutateAsync({ id, status: "PAID" }); showManagerSuccessToast(response.message, "manager-expenses-success"); } catch (error: unknown) { showManagerErrorToast(error, "manager-expenses-error"); } }, [saveMutation]);
  const exportExpenses = useCallback(() => { const rows = exportQuery.data?.expenses ?? []; const escapeCsv = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`; const header = ["ID", "Title", "Category", "Amount", "Date", "Status"]; const csv = [header, ...rows.map((item) => [item.id, item.title, item.category, item.amount, item.date, item.status])].map((row) => row.map(escapeCsv).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const href = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = href; anchor.download = "manager-expenses.csv"; anchor.click(); URL.revokeObjectURL(href); }, [exportQuery.data]);
  return useMemo(() => ({ search, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)), showModal: ui.showModal, setShowModal: (show) => { if (show) ui.openAdd(); else ui.closeModal(); }, editId: ui.editId, editData: ui.editData, openAdd: ui.openAdd, openEdit: ui.openEdit, saveExpense, deleteExpense, markAsPaid, exportExpenses, saving: saveMutation.isPending || deleteMutation.isPending }), [currentPage, deleteMutation.isPending, deleteExpense, exportExpenses, markAsPaid, saveExpense, saveMutation.isPending, search, setUrlParam, statusFilter, ui.editData, ui.editId, ui.openAdd, ui.openEdit, ui.closeModal, ui.showModal]);
}
