"use client";

import { RefreshCw, Plus, Search } from 'lucide-react';
import { usePlansContext } from '../../plans_context/PlansContext';

export default function PlansToolbar() {
  const { plans, loadPlans, openAdd, search, setSearch, setCurrentPage } = usePlansContext();

  return (
    <div className="bg-[var(--plans-bg-card)] rounded-xl shadow-sm border border-[var(--plans-border)] p-4 flex flex-wrap gap-3 justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-[var(--plans-text-secondary)] hidden sm:block">
          Active Plans: <span className="font-bold text-[var(--plans-text-primary)]">{plans.length}</span>
        </p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
            placeholder="Search plans..." 
            className="pl-9 pr-3 py-2 border border-[var(--plans-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--plans-highlight)] w-48 sm:w-64 bg-[var(--plans-bg-input)] text-[var(--plans-text-primary)]" 
          />
        </div>
      </div>
      <div className="flex gap-2">
 <button 
 onClick={loadPlans} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--plans-border)] rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--plans-text-secondary)] transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--plans-highlight)' }}
 >
 <Plus size={16} /> Create Plan
 </button>
 </div>
 </div>
 );
}
