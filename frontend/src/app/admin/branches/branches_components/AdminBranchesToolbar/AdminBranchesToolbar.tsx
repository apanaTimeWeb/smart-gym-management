"use client";
import { Calendar, ShieldCheck } from "lucide-react";
import { useAdminBranchesContext } from "@/app/admin/branches/branches_context/AdminBranchesContext";
import type { TimeRange } from "@/app/admin/dashboard/dashboard_types/dashboard_types";

export default function AdminBranchesToolbar() {
  const { timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate } = useAdminBranchesContext();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 border border-border rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Calendar className="w-5 h-5 text-primary" /></div>
        <div>
          <h2 className="text-base font-bold text-text-primary">Branch Analytics</h2>
          <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5"><ShieldCheck size={12} className="text-success" /> Read-only � Click any metric to see details</span>
        </div>
      </div>
      <div className="flex justify-end gap-3 items-center flex-wrap">
        {timeRange === "custom" && (
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-text-secondary">From:</label>
            <input type="date" className="bg-bg-input border border-border text-sm rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-border-focus" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label className="text-sm font-medium text-text-secondary">To:</label>
            <input type="date" className="bg-bg-input border border-border text-sm rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-border-focus" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate} />
          </div>
        )}
        <select value={timeRange} onChange={e => { setTimeRange(e.target.value as TimeRange); if (e.target.value !== "custom") { setStartDate(""); setEndDate(""); } }} className="bg-bg-input border border-border text-sm rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-border-focus cursor-pointer">
          <option value="weekly">This Week</option><option value="monthly">This Month</option><option value="yearly">This Year</option><option value="custom">Custom Range</option>
        </select>
      </div>
    </div>
  );
}
