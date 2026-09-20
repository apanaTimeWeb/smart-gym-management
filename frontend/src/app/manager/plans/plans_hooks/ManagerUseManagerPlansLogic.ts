// DATA FLOW: URL → Plans Query → API; UI modal state → Zustand → request mutation.
// RESPONSIBILITY: Plans feature facade. Server data is owned by TanStack Query; request-modal UI state is owned by module-scoped Zustand.
"use client";
/** Coordinates the Manager / feature. */
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useManagerDebounce } from "@/app/manager/manager_infrastructure/ManagerDebounce";
import { showManagerErrorToast, showManagerSuccessToast } from "@/app/manager/manager_infrastructure/ManagerToastService";
import { useFetchPlans, useRequestPlanChange } from "@/app/manager/plans/plans_hooks/ManagerUseManagerPlansQueries";
import { useManagerPlansUiStore } from "@/app/manager/plans/plans_store/ManagerUseManagerPlansUiStore";
import type { Plan, ManagerPlansViewModel } from "@/app/manager/plans/plans_types/ManagerPlansTypes";



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerPlansLogic(): ManagerPlansViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerPlansUiStore();
  const search = searchParams.get("search") || ""; const tierFilter = searchParams.get("tier") || "ALL"; const statusFilter = searchParams.get("status") || "ALL"; const activeTab = searchParams.get("tab") || "View Plans"; const currentPage = Number(searchParams.get("page") || "1"); const debouncedSearch = useManagerDebounce(search, 300);
  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = !value || (key === "tier" && value === "ALL") || (key === "status" && value === "ALL") || (key === "tab" && value === "View Plans") || (key === "page" && value === "1");
    if (isDefault) params.delete(key); else params.set(key, value);
    if (key !== "page") params.delete("page");
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const queryParams = useMemo(() => ({ search: debouncedSearch, tier: tierFilter, status: statusFilter }), [debouncedSearch, statusFilter, tierFilter]);
  const plansQuery = useFetchPlans(queryParams); const requestMutation = useRequestPlanChange(); const plans = plansQuery.data?.plans ?? [];
  const openRequestModal = useCallback((plan: Plan) => ui.setRequestModalPlan(plan), [ui.setRequestModalPlan]);
  const closeRequestModal = useCallback(() => ui.setRequestModalPlan(null), [ui.setRequestModalPlan]);
  const submitChangeRequest = useCallback(async (note: string) => {
    const plan = ui.requestModalPlan; if (!plan) return;
    try { const response = await requestMutation.mutateAsync({ planId: plan.id, note }); showManagerSuccessToast(response.message, "manager-plans-context-success"); ui.setRequestModalPlan(null); }
    catch (error: unknown) { showManagerErrorToast(error, "manager-plans-context-error"); }
  }, [requestMutation, ui.requestModalPlan, ui.setRequestModalPlan]);
  const errorMessage = plansQuery.error instanceof Error ? plansQuery.error.message : '';
  return { plans, isPending: plansQuery.isPending, isError: plansQuery.isError, errorMessage, saving: requestMutation.isPending, search, setSearch: (value) => updateUrl("search", value), currentPage, setCurrentPage: (value) => updateUrl("page", String(value)), tierFilter, setTierFilter: (value) => updateUrl("tier", value), statusFilter, setStatusFilter: (value) => updateUrl("status", value), filteredPlans: plans, requestModalPlan: ui.requestModalPlan, openRequestModal, closeRequestModal, submitChangeRequest, activeTab, setActiveTab: (value) => updateUrl("tab", value) };
}
