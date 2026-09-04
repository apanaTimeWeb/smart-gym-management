"use client";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { useAdminAuditContext } from "@/app/admin/audit/audit_context/AdminAuditContext";
import { ADMIN_AUDIT_MODULES, ADMIN_AUDIT_ACTIONS } from "@/app/admin/audit/audit_utils/AdminAuditSharedConstants";
export default function AdminAuditToolbar() {
  const { search, setSearch, moduleFilter, setModuleFilter, actionFilter, setActionFilter, refresh, handleExport } = useAdminAuditContext();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-card border border-border rounded-xl p-4">
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input id="admin-audit-search" type="search" placeholder="Search by user or detail�" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="pl-9 pr-8 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus appearance-none cursor-pointer">
            {ADMIN_AUDIT_MODULES.map(m => <option key={m} value={m}>{m === "All" ? "All Modules" : m}</option>)}
          </select>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="pl-9 pr-8 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus appearance-none cursor-pointer">
            {ADMIN_AUDIT_ACTIONS.map(a => <option key={a} value={a}>{a === "All" ? "All Actions" : a}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={refresh} className="p-2 border border-border text-text-secondary hover:bg-bg-overlay rounded-lg transition-colors" title="Refresh"><RefreshCw className="w-4 h-4" /></button>
        <button onClick={() => void handleExport()} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-primary text-primary hover:bg-primary/10 rounded-lg transition-colors"><Download className="w-4 h-4" /> Export CSV</button>
      </div>
    </div>
  );
}
