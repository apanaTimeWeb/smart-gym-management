// RESPONSIBILITY: Renders the tab switcher, search input, and category filter for the Workout Library (view-only; no Add button for trainers).
'use client';
// DATA FLOW: TrainerWorkoutToolbar controls -> URL-backed filter state -> TrainerUseWorkoutQuery
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { WORKOUT_TAB_OPTIONS, WORKOUT_FOCUS_OPTIONS, EXERCISE_MUSCLE_OPTIONS } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';

/** Build SearchableDropdown option arrays from centralized constants (Rule 3B). */
const ALL_CATEGORIES_OPTION = { value: 'All', label: 'All Categories' };

const WORKOUT_CATEGORY_OPTIONS = [
  ALL_CATEGORIES_OPTION,
  ...WORKOUT_FOCUS_OPTIONS.map(o => ({ value: o, label: o })),
];

const EXERCISE_CATEGORY_OPTIONS = [
  ALL_CATEGORIES_OPTION,
  ...EXERCISE_MUSCLE_OPTIONS.map(o => ({ value: o, label: o })),
];

export default function TrainerWorkoutToolbar() {
  const { tab, setTab, search, setSearch, category, setCategory } = useTrainerWorkoutFilters();
  const { setEditWk, setShowWkModal, setEditEx, setShowExModal } = useTrainerWorkoutStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Sync local search back to context if the URL resets it externally (tab switch resets URL).
  // WHY: tab changes clear the URL ?search= param, so localSearch must follow.
  useEffect(() => { setTimeout(() => setLocalSearch(search), 0); }, [search]);

  // Debounce search → only flush to URL after 300 ms of inactivity (Rule 15).
  // WHY: search is in deps because we only push when the debounced value diverges from the URL.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch]);

  // Category options change dynamically based on active tab.
  const categoryOptions = tab === 'Workout Plans' ? WORKOUT_CATEGORY_OPTIONS : EXERCISE_CATEGORY_OPTIONS;

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">
      <div className="flex overflow-x-auto">
        {WORKOUT_TAB_OPTIONS.map(t => (
          <button type="button"
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
              tab === t
                ? 'text-on-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
            
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-3 items-center">
        <button type="button" 
          onClick={() => tab === 'Workout Plans' ? (setEditWk(null), setShowWkModal(true)) : (setEditEx(null), setShowExModal(true))}
          className="bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg text-sm font-semibold motion-safe:transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          Add {tab === 'Workout Plans' ? 'Plan' : 'Exercise'}
        </button>
        <div className="relative hidden sm:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-36 lg:w-48 bg-input text-primary motion-safe:transition-all motion-safe:duration-base"
          />
        </div>
        <TrainerSearchableDropdown
          options={categoryOptions}
          value={category}
          onChange={(val: string | number) => setCategory(String(val))}
          placeholder="All Categories"
          className="w-44"
        />
      </div>
    </div>
  );
}
