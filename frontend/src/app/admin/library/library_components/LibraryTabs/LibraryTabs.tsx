// RESPONSIBILITY: Renders the tabbed view switching between Diet Plans and Exercises in the Diet Library.
'use client';

import { RefreshCw, Plus, Search } from 'lucide-react';
import { useLibraryContext } from '@/app/admin/library/library_context/LibraryContext';
import { LIBRARY_TABS } from '@/app/admin/library/library_utils/LibrarySharedConstants';

export default function LibraryTabs() {
  const { tab, setTab, loadAll, openAddEx, openAddDiet, search, setSearch, setCurrentPage } = useLibraryContext();

  return (
    <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center bg-card p-2 sm:p-0">
      <div className="flex overflow-x-auto">
        {LIBRARY_TABS.map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              tab === t 
                ? 'text-primary bg-primary/5 border-primary' 
                : 'border-transparent text-secondary hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
            placeholder={`Search ${tab.toLowerCase()}...`} 
            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-64 bg-input text-foreground" 
          />
        </div>
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 {tab === 'Exercises' && (
 <button 
 onClick={openAddEx} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90" 
 >
 <Plus size={14} /> Add Exercise
 </button>
 )}
 {tab === 'Diet Plans' && (
 <button 
 onClick={openAddDiet} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90" 
 >
 <Plus size={14} /> Add Diet Plan
 </button>
 )}
 </div>
 </div>
 );
}
