"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useAdminGlobalStore } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { Branch } from "@/app/admin/admin_store/useAdminGlobalStore";
import type { TimeRange } from "@/app/admin/dashboard/dashboard_types/dashboard_types";

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
  const { branches } = useAdminGlobalStore();
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [detailView, setDetailView] = useState<DetailView | null>(null);

  const getMultiplier = (tr: TimeRange) => { if (tr === "weekly") return 0.25; if (tr === "yearly") return 12; if (tr === "custom") return 0.5; return 1; };
  const multiplier = getMultiplier(timeRange);

  const openDetail = (b: Branch, v: DetailView) => { setSelectedBranch(b); setDetailView(v); };
  const closeDetail = () => { setSelectedBranch(null); setDetailView(null); };

  return <Ctx.Provider value={{ branches, timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate, selectedBranch, detailView, openDetail, closeDetail, multiplier }}>{children}</Ctx.Provider>;
}
export function useAdminBranchesContext() { const ctx = useContext(Ctx); if (!ctx) throw new Error("useAdminBranchesContext required"); return ctx; }
