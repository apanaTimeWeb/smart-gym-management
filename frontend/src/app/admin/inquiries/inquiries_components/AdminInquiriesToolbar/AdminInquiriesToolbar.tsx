"use client";
import { Search, PlusCircle, Filter } from "lucide-react";
import { useAdminInquiriesContext } from "@/app/admin/inquiries/inquiries_context/AdminInquiriesContext";
import { ADMIN_INQUIRY_FILTER_OPTIONS } from "@/app/admin/inquiries/inquiries_utils/AdminInquiriesSharedConstants";
export default function AdminInquiriesToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, openAdd } = useAdminInquiriesContext();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input id="admin-inquiries-search" type="search" placeholder="Search by name or phone�" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <select id="admin-inquiries-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-9 pr-8 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus appearance-none cursor-pointer">
            {ADMIN_INQUIRY_FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <button id="admin-inquiries-add-btn" onClick={openAdd} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
        <PlusCircle className="w-4 h-4" /> New Inquiry
      </button>
    </div>
  );
}
