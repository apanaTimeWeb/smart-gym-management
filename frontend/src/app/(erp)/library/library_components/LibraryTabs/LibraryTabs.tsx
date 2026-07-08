"use client";

import { RefreshCw, Plus } from 'lucide-react';
import { useLibraryContext } from '../../library_context/LibraryContext';
import { LIBRARY_TABS } from '../../library_utils/LibrarySharedConstants';

export default function LibraryTabs() {
  const { tab, setTab, loadAll, openAddEx, openAddDiet } = useLibraryContext();

  return (
    <div className="border-b border-[var(--library-border)] flex justify-between items-center bg-[var(--library-bg-card)]">
      <div className="flex">
        {LIBRARY_TABS.map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
              tab === t 
                ? 'text-[var(--library-highlight)] bg-[var(--library-highlight-subtle)]' 
                : 'border-transparent text-[var(--library-text-secondary)] hover:text-[var(--library-text-primary)]'
            }`}
            style={tab === t ? { borderBottomColor: 'var(--library-highlight)' } : {}}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-2">
        <button 
          onClick={loadAll} 
          className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--library-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--library-text-secondary)] transition-colors"
        >
          <RefreshCw size={14} />
        </button>
        {tab === 'Exercises' && (
          <button 
            onClick={openAddEx}   
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90" 
            style={{ background: 'var(--library-highlight)' }}
          >
            <Plus size={14} /> Add Exercise
          </button>
        )}
        {tab === 'Diet Plans' && (
          <button 
            onClick={openAddDiet} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90" 
            style={{ background: 'var(--library-highlight)' }}
          >
            <Plus size={14} /> Add Diet Plan
          </button>
        )}
      </div>
    </div>
  );
}
