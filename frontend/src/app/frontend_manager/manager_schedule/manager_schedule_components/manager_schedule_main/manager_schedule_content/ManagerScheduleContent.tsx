// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { Search, LayoutGrid, Table2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerScheduleKPIs from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_kpis/ManagerScheduleKPIs';
import ManagerScheduleShiftModal from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_shift_modal/ManagerScheduleShiftModal';
import ManagerScheduleSkeleton from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_skeleton/ManagerScheduleSkeleton';
import ManagerScheduleTrainerCard from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_trainer_card/ManagerScheduleTrainerCard';
import ManagerScheduleWeeklyGrid from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_weekly_grid/ManagerScheduleWeeklyGrid';
import { MANAGER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleConstants';
import { SHIFT_DAYS } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleSharedConstants';
import { useManagerScheduleLogic } from '@/app/frontend_manager/manager_schedule/manager_schedule_hooks/useManagerScheduleLogic';
import type { ShiftDay } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';


/** @description Renders the ManagerScheduleContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (11 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export function ManagerScheduleContent() {
  const t = useTranslations('MANAGER_SCHEDULE');

  const { trainers, toast, hideToast, selectedDay, setSelectedDay, search, setSearch, status, error } = useManagerScheduleLogic();
  const [view, setView] = useState<'grid' | 'cards'>('grid');

  if (status === MANAGER_SCHEDULE_STATUS_VALUES.PENDING) {
    return <ManagerScheduleSkeleton />;
  }

  if (status === MANAGER_SCHEDULE_STATUS_VALUES.ERROR) {
    return (
      <div className="min-h-full pb-10">
        <ManagerHeader data-testid="manager_schedule-managerschedulecontent-managerheader-1" title={t("COPY_TRAINER_SCHEDULE_2")} subtitle={t("COPY_VIEW_TRAINER_AVAILABILITY_SHIFT_TIMINGS_WEEKLY_SCHEDULE")} />
        <div className="p-6 mt-10">
          <div className="max-w-md w-full bg-card border border-danger rounded-xl p-8 text-center space-y-4 mx-auto motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <div data-testid="manager_schedule-manager-schedule-content-status" className="w-12 h-12 bg-danger-bg text-danger rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={18} strokeWidth={2}/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{t("TEXT_GENERIC_ERROR")}</h3>
              <p className="text-sm text-secondary mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_schedule-managerschedulecontent-managerheader-2"
        title={t("COPY_TRAINER_SCHEDULE_1")}
        subtitle={t("COPY_VIEW_TRAINER_AVAILABILITY_SHIFT_TIMINGS_WEEKLY_SCHEDULE")}
      />

      <div className="p-6 space-y-5">
        <ManagerScheduleKPIs />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input data-testid="manager_schedule-manager-schedule-content-input-value"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("COPY_SEARCH_TRAINER")}
              className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Day filter */}
            <div className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button data-testid="manager_schedule-manager-schedule-content-button-action"
                aria-label={t("COPY_ALL")}
                onClick={() => setSelectedDay('All')}
                className={`px-3 py-1 text-xs font-semibold rounded-md motion-safe:transition-all ${selectedDay === 'All' ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`}
              >{t("COPY_ALL")}</button>
              {SHIFT_DAYS.map((day, mapIndex) => (
                <button data-testid={`manager_schedule-schedule-managerschedulecontent-button-all-${day}`}
                  aria-label={day}
                  key={day}
                  onClick={() => setSelectedDay(day as ShiftDay)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md motion-safe:transition-all ${selectedDay === day ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button data-testid="manager_schedule-manager-schedule-content-button-close-1"
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md motion-safe:transition-all ${view === 'grid' ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`}
                aria-label={t("COPY_WEEKLY_GRID_VIEW")}
              >
                <Table2 size={18} strokeWidth={2}/>
              </button>
              <button data-testid="manager_schedule-manager-schedule-content-button-close-2"
                onClick={() => setView('cards')}
                className={`p-1.5 rounded-md motion-safe:transition-all ${view === 'cards' ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`}
                aria-label={t("COPY_TRAINER_CARDS_VIEW")}
              >
                <LayoutGrid size={18} strokeWidth={2}/>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {view === 'grid' ? (
          <ManagerScheduleWeeklyGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {trainers.map(trainer => (
              <ManagerScheduleTrainerCard key={trainer.trainerId} trainer={trainer} />
            ))}
            {trainers.length === 0 && (
              <div className="col-span-full bg-card border border-border rounded-xl p-12 text-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <p className="text-secondary text-sm">{t("COPY_NO_TRAINERS_MATCH_SEARCH")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <ManagerScheduleShiftModal />
      {toast && <ManagerToast data-testid="manager_schedule-managerschedulecontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
