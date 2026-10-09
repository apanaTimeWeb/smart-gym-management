"use client";
// RESPONSIBILITY: Renders the Trainer Workout tab switcher, search input, category filter, and add-action control.
// DATA FLOW: TrainerWorkoutToolbar controls -> URL-backed filter state -> useTrainerWorkoutQuery
import { useState, useEffect } from 'react';

import { Search } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_searchable_dropdown/TrainerInfrastructureSearchableDropdown';

import { TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS, TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_constants/TrainerWorkoutConstants';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutFilters';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_workout/trainer_workout_store/useTrainerWorkoutStore';










/**
 * @description Renders the Trainer Workout tab switcher, search input, category filter, and add-action control.
 * @dependencies TrainerWorkoutToolbar controls -> URL-backed filter state -> useTrainerWorkoutQuery.
 * @edge-case Preserves documented filter and tab state while keeping add actions inside the owning module.
 */
/**
 * @description Renders the workout feature's filtering and control surface, preserving URL/query state and accessible interaction semantics.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutToolbar() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { tab, setTab, search, setSearch, category, setCategory } = useTrainerWorkoutFilters();
  const { setEditWorkoutId, setShowWkModal, setEditExerciseId, setShowExModal } = useTrainerWorkoutStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Sync local search back to context if the URL resets it externally (tab switch resets URL).
  // WHY: tab changes clear the URL ?search= param, so localSearch must follow.
// Effect contract: debounce the local search input and reconcile it with URL-backed query state.
  useEffect(() => { setTimeout(() => setLocalSearch(search), 0); }, [search]);

  // Debounce search → only flush to URL after 300 ms of inactivity (Rule 15).
  // WHY: search is in deps because we only push when the debounced value diverges from the URL.
// Effect contract: debounce the local search input and reconcile it with URL-backed query state.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch]);

  // Category options change dynamically based on active tab.
  const categoryOptions = tab === TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value ? TRAINER_WORKOUT_CATEGORY_OPTIONS.WORKOUT : TRAINER_WORKOUT_CATEGORY_OPTIONS.EXERCISE;

  const handleAdd = () => {
    if (tab === TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value) {
      setEditWorkoutId(null);
      setShowWkModal(true);
      return;
    }
    setEditExerciseId(null);
    setShowExModal(true);
  };

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">
      <div className="flex overflow-x-auto">
        {TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS.map((tabOption) => (
          <button type="button"
            key={tabOption.value}
            onClick={() => setTab(tabOption.value)}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
              tab === tabOption.value
                ? 'text-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid={`trainer_workout-workout-toolbar-tab-${tabOption.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
            {t(tabOption.labelKey)}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-3 items-center">
        <button type="button" 
          onClick={handleAdd}
          className="min-h-11 bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg text-sm font-semibold motion-safe:transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-workout-toolbar_add">
          {t('TEXT_ADD')}{tab === TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value ? t('TEXT_PLAN') : t('TEXT_EXERCISE')}
        </button>
        <div className="relative hidden sm:block">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary"  strokeWidth={2}/>
          <label htmlFor="trainer-workout-toolbar-search" className="sr-only">{t("TEXT_SEARCH")}</label>
          <input
            id="trainer-workout-toolbar-search"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder={t("TEXT_SEARCH")}
            className="ps-8 pe-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-36 lg:w-48 bg-input text-primary motion-safe:transition-all motion-safe:duration-base" data-testid="trainer_workout-workout-toolbar_search"/>
        </div>
        <TrainerInfrastructureSearchableDropdown
          options={categoryOptions.map((option) => ({ value: option.value, label: option.labelKey.startsWith('TEXT_') ? t(option.labelKey) : option.labelKey }))}
          value={category}
          onChange={(val: string | number) => setCategory(String(val))}
          placeholder={t("TEXT_ALL_CATEGORIES")}
          ariaLabel={t("TEXT_CATEGORY")}
          className="w-44"
         testId="trainer-workout-workout-toolbar-all-categories"/>
      </div>
    </div>
  );
}
