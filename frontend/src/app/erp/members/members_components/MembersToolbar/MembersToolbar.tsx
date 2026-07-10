"use client";

import { Search, RefreshCw, Plus } from 'lucide-react';
import { useMembersContext } from '@/app/erp/members/members_context/MembersContext';

export default function MembersToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, loadAll, openAdd, setCurrentPage } = useMembersContext();

  return (
    <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] p-4 flex flex-wrap gap-3 items-center justify-between">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input 
          value={search} 
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
          placeholder="Search by name or phone..." 
          className="pl-9 pr-3 py-2.5 border border-[var(--members-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] w-64 bg-[var(--members-bg-input)] text-[var(--members-text-primary)]" 
        />
      </div>
      <div className="flex gap-2">
        <select 
          value={statusFilter} 
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} 
          className="border border-[var(--members-border)] rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--members-bg-input)] text-[var(--members-text-primary)]"
        >
 <option value="All">All Status</option>
 <option value="ACTIVE">Active</option>
 <option value="PENDING">Pending</option>
 <option value="EXPIRED">Expired</option>
 </select>
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2.5 text-sm border border-[var(--members-border)] rounded-xl hover:opacity-80 text-[var(--members-text-primary)]"
 >
 <RefreshCw size={14} /> Refresh
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--members-highlight)' }}
 >
 <Plus size={16} /> Add Member
 </button>
 </div>
 </div>
 );
}
