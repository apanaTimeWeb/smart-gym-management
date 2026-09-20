// RESPONSIBILITY: Renders Diet Library search, goal filtering, and refresh controls; does not own server data.
'use client';
import { RefreshCw, Search } from 'lucide-react';
import { GOALS } from '@/app/trainer/library/library_utils/TrainerLibrarySharedConstants';
import type { TrainerLibraryFilterGoal } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import type { TrainerLibraryTabsProps } from '@/app/trainer/library/library_types/TrainerLibraryTabsProps';



export default function TrainerLibraryTabs({ search, setSearch, filterGoal, setFilterGoal, onRefresh }: TrainerLibraryTabsProps) {
  return (
    <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center bg-card p-2 sm:p-0">
      <h2 className="px-5 py-3.5 text-lg font-bold text-primary whitespace-nowrap">Diet Plans</h2>
      <div className="px-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search diet plans..."
            aria-label="Search diet plans"
            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-64 bg-input text-primary"
          />
        </div>
        <select
          value={filterGoal}
          onChange={(event) => setFilterGoal(event.target.value as TrainerLibraryFilterGoal)}
          aria-label="Filter diet plans by goal"
          className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
        >
          <option value="All">All Goals</option>
          {GOALS.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
        </select>
        <button
          type="button"
          onClick={() => void onRefresh()}
          aria-label="Refresh diet plans"
          title="Refresh diet plans"
          className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
