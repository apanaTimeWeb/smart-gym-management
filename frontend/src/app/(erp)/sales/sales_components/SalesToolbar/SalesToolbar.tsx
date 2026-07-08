"use client";

import { Download, Filter } from 'lucide-react';
import { useSalesContext } from '../../sales_context/SalesContext';
import { DATE_FILTERS } from '../../sales_utils/SalesSharedConstants';

export default function SalesToolbar() {
  const { dateFilter, setDateFilter } = useSalesContext();

  return (
    <div className="bg-[var(--sales-bg-card)] rounded-xl shadow-sm border border-[var(--sales-border)] p-4 flex flex-wrap gap-3 items-center justify-between mb-5">
      <div className="flex gap-2 flex-wrap">
        {DATE_FILTERS.map(d => (
          <button 
            key={d} 
            onClick={() => setDateFilter(d)}
            className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors"
            style={dateFilter === d 
              ? { background: 'var(--sales-highlight)', color: 'white' } 
              : { border: '1px solid var(--sales-border)', color: 'var(--sales-text-secondary)' }
            }
          >
            {d}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[var(--sales-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--sales-text-secondary)] transition-colors">
          <Filter size={13} /> Filter by Name
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[var(--sales-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--sales-text-secondary)] transition-colors">
          <Download size={13} /> Export
        </button>
      </div>
    </div>
  );
}
