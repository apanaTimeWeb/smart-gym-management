// RESPONSIBILITY: Provides the implementation for PlansToolbar.tsx functionality within its module.
"use client";

import { RefreshCw, Plus, Search } from 'lucide-react';
import { usePlansContext } from '@/app/erp/plans/plans_context/PlansContext';

export default function PlansToolbar() {
  const { plans, loadPlans, openAdd, search, setSearch, setCurrentPage } = usePlansContext();

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-wrap gap-3 justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-secondary hidden sm:block">
          Active Plans: <span className="font-bold text-foreground">{plans.length}</span>
        </p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
            placeholder="Search plans..." 
            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-48 sm:w-64 bg-input text-foreground" 
          />
        </div>
      </div>
      <div className="flex gap-2">
 <button 
 onClick={loadPlans} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90" 
 >
 <Plus size={16} /> Create Plan
 </button>
 </div>
 </div>
 );
}
