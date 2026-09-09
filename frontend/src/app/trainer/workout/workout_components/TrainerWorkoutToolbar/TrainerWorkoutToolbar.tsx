// RESPONSIBILITY: Renders the tab switcher, search input, and category filter for the Workout Library (view-only; no Add button for trainers).
// DATA FLOW: useWorkoutContext → TrainerWorkoutToolbar → URL params via context setters
'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useWorkoutContext } from '@/app/trainer/workout/workout_context/WorkoutContext';
import { WORKOUT_TAB_OPTIONS, WORKOUT_FOCUS_OPTIONS, EXERCISE_MUSCLE_OPTIONS } from '@/app/trainer/workout/workout_utils/WorkoutSharedConstants';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';

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
  const { tab, setTab, search, setSearch, filterCategory, setFilterCategory, setCurrentPage } = useWorkoutContext();
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
  }, [localSearch, search, setSearch, setCurrentPage]);

  // Category options change dynamically based on active tab.
  const categoryOptions = tab === 'Workout Plans' ? WORKOUT_CATEGORY_OPTIONS : EXERCISE_CATEGORY_OPTIONS;

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">
      <div className="flex overflow-x-auto">
        {WORKOUT_TAB_OPTIONS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
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
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:ring-warning w-36 lg:w-48 bg-input text-foreground motion-safe:transition-all"
          />
        </div>
        {/* SearchableDropdown replaces native <select> to fix dark mode rendering (Rule 20) */}
        <SearchableDropdown
          options={categoryOptions}
          value={filterCategory}
          onChange={(val) => setFilterCategory(String(val))}
          placeholder="All Categories"
          className="w-44"
        />
      </div>
    </div>
  );
}
