// RESPONSIBILITY: Root client orchestrator for the Schedule module. Owns layout, toolbar, view toggle, and renders sub-components.
'use client';
import { useState } from 'react';
import { Search, LayoutGrid, Table2, AlertCircle } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { ScheduleProvider, useScheduleContext } from '@/app/manager/schedule/schedule_context/ManagerScheduleContext';
import ManagerScheduleKPIs from '@/app/manager/schedule/schedule_components/ManagerScheduleKPIs/ManagerScheduleKPIs';
import ManagerScheduleWeeklyGrid from '@/app/manager/schedule/schedule_components/ManagerScheduleWeeklyGrid/ManagerScheduleWeeklyGrid';
import ManagerScheduleTrainerCard from '@/app/manager/schedule/schedule_components/ManagerScheduleTrainerCard/ManagerScheduleTrainerCard';
import ManagerScheduleShiftModal from '@/app/manager/schedule/schedule_components/ManagerScheduleShiftModal/ManagerScheduleShiftModal';
import ManagerScheduleSkeleton from '@/app/manager/schedule/schedule_components/ManagerScheduleSkeleton/ManagerScheduleSkeleton';
import { SHIFT_DAYS } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import type { ShiftDay } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';

function ScheduleContent() {
  const { trainers, toast, hideToast, selectedDay, setSelectedDay, search, setSearch, fetchState, error } = useScheduleContext();
  const [view, setView] = useState<'grid' | 'cards'>('grid');

  if (fetchState === 'loading') {
    return <ManagerScheduleSkeleton />;
  }

  if (fetchState === 'error') {
    return (
      <div className="min-h-full pb-10">
        <ManagerHeader title="Trainer Schedule" subtitle="View trainer availability, shift timings, and weekly schedule" />
        <div className="p-6 mt-10">
          <div className="max-w-md w-full bg-card border border-danger/20 rounded-xl p-8 text-center space-y-4 mx-auto">
            <div className="w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Failed to load schedule</h3>
              <p className="text-sm text-secondary mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader
        title="Trainer Schedule"
        subtitle="View trainer availability, shift timings, and weekly schedule"
      />

      <div className="p-6 space-y-5">
        <ManagerScheduleKPIs />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search trainer..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-secondary focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Day filter */}
            <div className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button
                onClick={() => setSelectedDay('All')}
                className={`px-3 py-1 text-xs font-semibold rounded-md motion-safe:transition-colors ${selectedDay === 'All' ? 'bg-primary text-black' : 'text-secondary hover:text-foreground'}`}
              >
                All
              </button>
              {SHIFT_DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day as ShiftDay)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md motion-safe:transition-colors ${selectedDay === day ? 'bg-primary text-black' : 'text-secondary hover:text-foreground'}`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md motion-safe:transition-colors ${view === 'grid' ? 'bg-primary text-black' : 'text-secondary hover:text-foreground'}`}
                aria-label="Weekly grid view"
              >
                <Table2 size={15} />
              </button>
              <button
                onClick={() => setView('cards')}
                className={`p-1.5 rounded-md motion-safe:transition-colors ${view === 'cards' ? 'bg-primary text-black' : 'text-secondary hover:text-foreground'}`}
                aria-label="Trainer cards view"
              >
                <LayoutGrid size={15} />
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
              <div className="col-span-full bg-card border border-border rounded-xl p-12 text-center">
                <p className="text-secondary text-sm">No trainers match your search.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <ManagerScheduleShiftModal />
      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

export default function ManagerScheduleMain() {
  return (
    <ScheduleProvider>
      <ScheduleContent />
    </ScheduleProvider>
  );
}
