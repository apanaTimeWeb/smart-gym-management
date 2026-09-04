"use client";
// RESPONSIBILITY: Search, filter, and action bar for the Admin Members list.
// DATA FLOW: useAdminMembersContext ? toolbar state ? members list filters
import { Search, UserPlus, Filter } from "lucide-react";
import { ADMIN_MEMBER_STATUS_OPTIONS } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";
import { useAdminMembersContext } from "@/app/admin/members/members_context/AdminMembersContext";

export default function AdminMembersToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, openAdd } = useAdminMembersContext();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            id="admin-members-search"
            type="search"
            placeholder="Search by name or phone�"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-border-focus transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <select
            id="admin-members-status-filter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus appearance-none cursor-pointer"
          >
            {ADMIN_MEMBER_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        id="admin-members-add-btn"
        onClick={openAdd}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm flex-shrink-0"
      >
        <UserPlus className="w-4 h-4" />
        Add Member
      </button>
    </div>
  );
}
