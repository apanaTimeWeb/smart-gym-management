// RESPONSIBILITY: Renders the toolbar for searching, filtering, and initiating the "Add Member" action.
"use client";

import { Search, RefreshCw, Plus } from 'lucide-react';
import { useMembersContext } from '@/app/erp/members/members_context/MembersContext';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export default function MembersToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, loadAll, openAdd } = useMembersContext();

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-wrap gap-3 items-center justify-between">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search by name or phone..." 
          className="pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page w-64 bg-input text-primary" 
        />
      </div>
      <div className="flex gap-2">
        <SearchableDropdown
          value={statusFilter}
          onChange={(val) => setStatusFilter(String(val))}
          className="w-48"
          options={[
            { label: 'All Status', value: 'All' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Expired', value: 'EXPIRED' }
          ]}
        />
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:opacity-80 text-primary"
 >
 <RefreshCw size={14} /> Refresh
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-opacity"
 >
 <Plus size={16} /> Add Member
 </button>
 </div>
 </div>
 );
}
