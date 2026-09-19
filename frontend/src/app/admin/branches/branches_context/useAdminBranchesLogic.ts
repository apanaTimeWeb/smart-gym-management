"use client";
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { useAdminBranchesStore } from "@/app/admin/branches/branches_store/useAdminBranchesStore";
import { useAdminBranchesQueries } from "@/app/admin/branches/branches_context/useAdminBranchesQueries";
import type { Branch } from "@/app/admin/branches/branches_types/AdminBranchesTypes";

export type DetailView = "revenue" | "expenses" | "staff" | "students";

export function useAdminBranchesLogic() {
  const { data: branches = [], isLoading, isError } = useAdminBranchesQueries();
  const {
    timeRange, setTimeRange, startDate, setStartDate,
    endDate, setEndDate,
    selectedBranch, setSelectedBranch,
    detailView, setDetailView
  } = useAdminBranchesStore();

  const getMultiplier = (tr: AdminBranchesTimeRange) => {
    if ((tr as string) === "weekly") return 0.25;
    if (tr === "yearly") return 12;
    if (tr === "custom") return 0.5;
    return 1;
  };
  const multiplier = getMultiplier(timeRange);

  const openDetail = (b: Branch, v: DetailView) => {
    setSelectedBranch(b);
    setDetailView(v);
  };
  const closeDetail = () => {
    setSelectedBranch(null);
    setDetailView(null);
  };

  return {
    branches,
    isLoading,
    isError,
    timeRange,
    setTimeRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedBranch,
    detailView,
    openDetail,
    closeDetail,
    multiplier,
  };
}