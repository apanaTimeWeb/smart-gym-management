"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useAdminGlobalStore } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { Branch } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { TimeRange } from "@/app/admin/dashboard/dashboard_types/dashboard_types";
import { useAdminBranchesLogic } from "./useAdminBranchesLogic";

export type DetailView = "revenue" | "expenses" | "staff" | "students";

interface AdminBranchesContextType {
  branches: Branch[];
  timeRange: TimeRange; setTimeRange: (t: TimeRange) => void;
  startDate: string; setStartDate: (d: string) => void;
  endDate: string; setEndDate: (d: string) => void;
  selectedBranch: Branch | null;
  detailView: DetailView | null;
  openDetail: (b: Branch, v: DetailView) => void;
  closeDetail: () => void;
  multiplier: number;
}
const Ctx = createContext<AdminBranchesContextType | null>(null);

export function AdminBranchesProvider({ children }: { children: ReactNode }) {
  const logic = useAdminBranchesLogic();
  return <Ctx.Provider value={logic}>{children}</Ctx.Provider>;
}
export function useAdminBranchesContext() { const ctx = useContext(Ctx); if (!ctx) throw new Error("useAdminBranchesContext required"); return ctx; }
