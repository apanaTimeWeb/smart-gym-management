"use client";
// RESPONSIBILITY: Search + filter toolbar for the Blacklist module.

import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAdminBlacklistStore } from '@/app/admin/blacklist/blacklist_store/useAdminBlacklistStore';
import { useAdminBlacklistLogic } from '@/app/admin/blacklist/blacklist_context/useAdminBlacklistLogic';
import { BLACKLIST_SCOPE_OPTIONS, BLACKLIST_GYM_OPTIONS } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';

export default function AdminBlacklistToolbar() {
  const { scopeFilter, setScopeFilter, gymFilter, setGymFilter, setSearch } = useAdminBlacklistStore();
  const { openAdd } = useAdminBlacklistLogic();
  const [localSearch, setLocalSearch] = useState('');

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={15} className="text-secondary" /></span>
          <input
            type="text"
            placeholder="Search by name, ID, or phone..."
            value={localSearch}
            onChange={(e) => { setLocalSearch(e.target.value); setSearch(e.target.value); }}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-64"
          />
        </div>
        <div className="w-40"><AdminSearchableDropdown options={BLACKLIST_SCOPE_OPTIONS} value={scopeFilter} onChange={(v) => setScopeFilter(v as string)} placeholder="All Scopes" /></div>
        <div className="w-40"><AdminSearchableDropdown options={BLACKLIST_GYM_OPTIONS} value={gymFilter} onChange={(v) => setGymFilter(v as string)} placeholder="All Gyms" /></div>
      </div>
      <button
        onClick={openAdd}
        className="flex items-center gap-2 px-4 py-2 bg-danger text-on-danger rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity motion-safe:active:scale-95 whitespace-nowrap motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        <Plus size={16} />
        Blacklist Member
      </button>
    </div>
  );
}