"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminAuditApi } from "@/app/admin/audit/audit_api/admin_audit_api";
import type { AdminAuditLog } from "@/app/admin/audit/audit_types/admin_audit_types";
import { logger } from "@/lib/logger"; import toast from "react-hot-toast";

interface Ctx {
  logs: AdminAuditLog[]; loading: boolean;
  search: string; setSearch: (s: string) => void;
  moduleFilter: string; setModuleFilter: (s: string) => void;
  actionFilter: string; setActionFilter: (s: string) => void;
  refresh: () => void; handleExport: () => Promise<void>;
}
const Ctx = createContext<Ctx | null>(null);

export function AdminAuditProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAuditApi.getAll();
      if (res.success) setLogs(res.data.logs);
    } catch (e) { logger.error("[AdminAudit] load:", e); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const handleExport = async () => {
    try {
      toast.success("Preparing export...");
      const blob = await adminAuditApi.exportCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); window.URL.revokeObjectURL(url);
    } catch (e) { logger.error("[AdminAudit] export:", e); toast.error("Export failed"); }
  };
  return <Ctx.Provider value={{ logs, loading, search, setSearch, moduleFilter, setModuleFilter, actionFilter, setActionFilter, refresh: load, handleExport }}>{children}</Ctx.Provider>;
}
export function useAdminAuditContext() { const ctx = useContext(Ctx); if (!ctx) throw new Error("useAdminAuditContext must be within AdminAuditProvider"); return ctx; }
