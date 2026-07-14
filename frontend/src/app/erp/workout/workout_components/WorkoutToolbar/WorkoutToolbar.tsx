// RESPONSIBILITY: WorkoutToolbar.tsx handles the logic and UI for its corresponding feature.
'use client';

import { Search, Plus } from 'lucide-react';
import { useWorkoutContext } from '@/app/erp/workout/workout_context/WorkoutContext';
import { WORKOUT_TAB_OPTIONS } from '@/app/erp/workout/workout_utils/WorkoutSharedConstants';

export default function WorkoutToolbar() {
  const { tab, setTab, search, setSearch, setCurrentPage, openAddWk, openAddEx } = useWorkoutContext();

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">
      <div className="flex overflow-x-auto">
        {WORKOUT_TAB_OPTIONS.map(t => (
          <button 
            key={t} 
            onClick={() => { setTab(t); setCurrentPage(1); setSearch(''); }}
            className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              tab === t 
                ? 'text-primary bg-primary-subtle' 
                : 'border-transparent text-secondary hover:text-foreground'
            }`}
            style={tab === t ? { borderBottomColor: 'var(--workout-highlight)' } : {}}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-3 items-center">
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}  
 placeholder="Search..." 
 className="pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-warning w-36 lg:w-48 bg-input text-foreground transition-all" 
 />
 </div>
 <button 
 onClick={tab === 'Workout Plans' ? openAddWk : openAddEx}
 className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
 style={{ background: 'var(--workout-highlight)' }}
 >
 <Plus size={15} /> <span className="hidden sm:inline">Add</span>
 </button>
 </div>
 </div>
 );
}
