'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MANAGER_EXPENSE_STATUS_PAID } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesConstants';
import { EXPENSE_ALL_STATUS_FILTER } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import { useSaveExpenseMutation, useDeleteExpenseMutation } from "@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesMutations";
import { useExpensesListQuery } from "@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesQueries";
import { useManagerExpensesUiStore } from "@/app/frontend_manager/manager_expenses/manager_expenses_store/useManagerExpensesUiStore";
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from "@/app/frontend_manager/manager_infrastructure/ManagerToastService";
import type { ManagerExpensesViewModel, Expense } from "@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes";

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useManagerExpensesLogic.
 * @dependencies Uses useManagerExpensesMutations, useManagerExpensesQueries, useManagerExpensesUiStore, ManagerIdempotency.
 * @edge-case preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerExpensesLogic owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerExpensesLogic(): ManagerExpensesViewModel {
  const saveIntentKeyRef = useRef<string | null>(null);
  const mutationIntentKeysRef = useRef(new Map<string, string>());
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerExpensesUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || EXPENSE_ALL_STATUS_FILTER; const currentPage = Number(searchParams.get("page") || "1");
  const setUrlParam = useCallback((key: string, value: string | null) => { const params = new URLSearchParams(searchParams.toString()); if (!value || (key === "status" && value === "All") || (key === "page" && value === "1")) params.delete(key); else params.set(key, value); if (key !== "page") params.delete("page"); router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false }); }, [pathname, router, searchParams]);
  const exportQuery = useExpensesListQuery({ search: "", status: "", page: "1", limit: "1000" });
  const saveMutation = useSaveExpenseMutation(); const deleteMutation = useDeleteExpenseMutation();
  const saveExpense = useCallback(async (data: Partial<Expense>) => { try { const response = await saveMutation.mutateAsync({ ...data, id: ui.editId || undefined, idempotencyKey: (saveIntentKeyRef.current ??= createManagerIdempotencyKey()) }); showManagerSuccessToast(response.message, `manager-expense-${ui.editId ?? 'new'}-save`); ui.closeModal(); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${ui.editId ?? 'new'}-save-error`); throw error; } }, [saveMutation, ui.closeModal, ui.editId]);
  const deleteExpense = useCallback(async (id: string) => { const idempotencyKey = mutationIntentKeysRef.current.get(`delete:${id}`) ?? createManagerIdempotencyKey(); mutationIntentKeysRef.current.set(`delete:${id}`, idempotencyKey); const response = await deleteMutation.mutateAsync({ id, idempotencyKey }); mutationIntentKeysRef.current.delete(`delete:${id}`); showManagerSuccessToast(response.message, `manager-expense-${id}-delete`); }, [deleteMutation]);
  const markAsPaid = useCallback(async (id: string) => { try { const idempotencyKey = mutationIntentKeysRef.current.get(`paid:${id}`) ?? createManagerIdempotencyKey(); mutationIntentKeysRef.current.set(`paid:${id}`, idempotencyKey); const response = await saveMutation.mutateAsync({ id, status: MANAGER_EXPENSE_STATUS_PAID, idempotencyKey }); mutationIntentKeysRef.current.delete(`paid:${id}`); showManagerSuccessToast(response.message, `manager-expense-${id}-paid`); } catch (error: unknown) { showManagerErrorToast(error, `manager-expense-${id}-paid-error`); } }, [saveMutation]);
  const exportExpenses = useCallback(() => { const rows = exportQuery.data?.expenses ?? []; const escapeCsv = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`; const header = ["ID", "Title", "Category", "Amount", "Date", "Status"]; const csv = [header, ...rows.map((item) => [item.id, item.title, item.category, item.amount, item.date, item.status])].map((row) => row.map(escapeCsv).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const href = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = href; anchor.download = "manager-expenses.csv"; anchor.click(); URL.revokeObjectURL(href); }, [exportQuery.data]);
  return useMemo(() => ({ search, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)), showModal: ui.showModal, setShowModal: (show) => { if (show) ui.openAdd(); else ui.closeModal(); }, editId: ui.editId, editData: ui.editData, openAdd: ui.openAdd, openEdit: ui.openEdit, saveExpense, deleteExpense, markAsPaid, exportExpenses, saving: saveMutation.isPending || deleteMutation.isPending }), [currentPage, deleteMutation.isPending, deleteExpense, exportExpenses, markAsPaid, saveExpense, saveMutation.isPending, search, setUrlParam, statusFilter, ui.editData, ui.editId, ui.openAdd, ui.openEdit, ui.closeModal, ui.showModal]);
}
