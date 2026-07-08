"use client";

import { Search, Plus } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

export default function WorkoutToolbar() {
 const { tab, setTab, search, setSearch, openAddWk, openAddEx } = useWorkoutContext();

 return (
 <div className="border-b border-[var(--workout-border)] flex justify-between items-center bg-[var(--workout-bg-card)]">
 <div className="flex overflow-x-auto">
 {['Workout Plans', 'Exercise Library'].map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-[var(--workout-highlight)] bg-[var(--workout-highlight-subtle)]' 
 : 'border-transparent text-[var(--workout-text-secondary)] hover:text-[var(--workout-text-primary)]'
 }`}
 style={tab === t ? { borderBottomColor: 'var(--workout-highlight)' } : {}}
 >
 {t}
 </button>
 ))}
 </div>
 <div className="px-4 flex gap-3 items-center">
 <div className="relative hidden sm:block">
 <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--workout-text-secondary)]" />
 <input 
 value={search} 
 onChange={e => setSearch(e.target.value)} 
 placeholder="Search..." 
 className="pl-8 pr-3 py-2 text-sm border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] w-36 lg:w-48 bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)] transition-all" 
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
