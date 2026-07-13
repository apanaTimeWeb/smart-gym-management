// RESPONSIBILITY: SalesToolbar.tsx handles the logic and UI for its corresponding feature.
"use client";

import { Download, Filter, Search } from 'lucide-react';
import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import { DATE_FILTERS } from '@/app/erp/sales/sales_utils/SalesSharedConstants';

export default function SalesToolbar() {
  const { dateFilter, setDateFilter, search, setSearch, setCurrentPage } = useSalesContext();

 return (
 <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-wrap gap-3 items-center justify-between mb-5">
 <div className="flex gap-2 flex-wrap">
 {DATE_FILTERS.map(d => (
 <button 
 key={d} 
 onClick={() => setDateFilter(d)}
 className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors border ${
  dateFilter === d 
  ? 'bg-primary text-primary-foreground border-transparent' 
  : 'border-border text-secondary hover:text-foreground'
 }`}
 >
 {d}
 </button>
 ))}
 </div>
 <div className="flex gap-2">
  <div className="relative">
    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
    <input 
      value={search} 
      onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
      placeholder="Search..." 
      className="pl-9 pr-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-64 bg-input text-foreground"
    />
  </div>
 <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors">
 <Download size={13} /> Export
 </button>
 </div>
 </div>
 );
}
