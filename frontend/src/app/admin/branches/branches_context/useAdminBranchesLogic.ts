"use client";
import { useState } from "react";
import { useAdminGlobalStore } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { Branch } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { TimeRange } from "@/app/admin/dashboard/dashboard_types/dashboard_types";

export type DetailView = "revenue" | "expenses" | "staff" | "students";

export function useAdminBranchesLogic() {
  const { branches } = useAdminGlobalStore();
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [detailView, setDetailView] = useState<DetailView | null>(null);

  const getMultiplier = (tr: TimeRange) => {
    if (tr === "weekly") return 0.25;
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
