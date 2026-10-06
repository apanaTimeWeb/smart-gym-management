// RESPONSIBILITY: Renders ManagerWorkoutToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useManagerDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/useManagerDebouncedValueCommit';
import { Search, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { WORKOUT_LEVEL_FILTER_OPTIONS, WORKOUT_TAB_OPTIONS } from '@/app/frontend_manager/manager_workout/manager_workout_constants/ManagerWorkoutSharedConstants';
import { useManagerWorkoutLogic } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutLogic';


/** @description Renders the ManagerWorkoutToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerWorkoutToolbar() {
  const t = useTranslations('MANAGER_WORKOUT');

  const { tab, setTab, search, setSearch, levelFilter, setLevelFilter, setCurrentPage, openAddWk, openAddEx } = useManagerWorkoutLogic();
  const [localSearch, setLocalSearch] = useState(search);

  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">
      <div className="flex overflow-x-auto">
        {WORKOUT_TAB_OPTIONS.map((t, mapIndex) => (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-3 text-sm font-semibold border-b-2 motion-safe:transition-all whitespace-nowrap ${tab === t ? 'text-primary border-primary' : 'text-secondary border-transparent hover:text-primary hover:border-border'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkouttoolbar-button-primary-${mapIndex}`} 
            key={t} 
            onClick={() => { setTab(t);  setSearch(''); }}
            
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-3 items-center">
        <div className="relative hidden sm:block">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning w-36 lg:w-48 bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_workout-manager-workout-toolbar-input-value" 
            value={localSearch} 
            onChange={e => setLocalSearch(e.target.value)}  
            placeholder={t("COPY_SEARCH")} 
             
          />
        </div>
        {tab === 'Workout Plans' && (
          <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "hidden sm:block px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_workout-manager-workout-toolbar-select-option"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            
          >
            {WORKOUT_LEVEL_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_workout-managerworkouttoolbar-interactive">{t(option.labelKey)}</option>)}
          </select>
        )}
        <button data-testid="manager_workout-manager-workout-toolbar-tab" 
          onClick={tab === 'Workout Plans' ? openAddWk : openAddEx}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
        >
          <Plus size={18} strokeWidth={2}/> <span className="hidden sm:inline">{t("COPY_ADD")}</span>
        </button>
      </div>
    </div>
  );
}
