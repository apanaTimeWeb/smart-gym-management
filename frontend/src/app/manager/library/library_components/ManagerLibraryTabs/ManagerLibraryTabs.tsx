'use client';
// RESPONSIBILITY: Renders Library collection tabs plus search/refresh/create controls; all data actions are delegated to the feature hook.
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';

export default function ManagerLibraryTabs() {
  const { view, setView, loadAll, openAddDiet, openAddExercise, search, setSearch } = useManagerLibraryLogic();
  const isDiet = view === 'diet';
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card p-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex overflow-x-auto" role="tablist" aria-label="Library collections">
        <button type="button" role="tab" aria-selected={isDiet} onClick={() => setView('diet')} className={`min-h-11 whitespace-nowrap border-b-2 px-5 py-3 text-sm font-semibold motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isDiet ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>Diet Plans</button>
        <button type="button" role="tab" aria-selected={!isDiet} onClick={() => setView('exercises')} className={`min-h-11 whitespace-nowrap border-b-2 px-5 py-3 text-sm font-semibold motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!isDiet ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>Exercises</button>
      </div>
      <div className="flex flex-col gap-2 px-2 sm:flex-row sm:flex-wrap sm:items-center sm:px-4">
        <div className="relative min-w-0 sm:w-64">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <label htmlFor="manager-library-search" className="sr-only">Search {isDiet ? 'diet plans' : 'exercises'}</label>
          <input id="manager-library-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${isDiet ? 'diet plans' : 'exercises'}...`} className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </div>
        <button type="button" onClick={() => void loadAll()} aria-label="Refresh library" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-secondary motion-safe:transition-all motion-safe:duration-base hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RefreshCw size={18} aria-hidden="true" /></button>
        <button type="button" onClick={isDiet ? openAddDiet : openAddExercise} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:hover:brightness-95 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><Plus size={18} aria-hidden="true" /> Add {isDiet ? 'Diet Plan' : 'Exercise'}</button>
      </div>
    </div>
  );
}
