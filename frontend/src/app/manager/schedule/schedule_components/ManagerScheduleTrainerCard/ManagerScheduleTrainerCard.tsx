// RESPONSIBILITY: Renders a single trainer's availability summary card — total shifts, hours, and per-day status dots.
'use client';
import { Clock, CalendarDays, Plus } from 'lucide-react';
import { useManagerScheduleLogic } from '@/app/manager/schedule/schedule_hooks/ManagerUseManagerScheduleLogic';
import { SHIFT_DAYS, SHIFT_STATUS_STYLES } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import type { ManagerScheduleTrainerCardProps } from '@/app/manager/schedule/schedule_types/ManagerScheduleTrainerCardTypes';




export default function ManagerScheduleTrainerCard({ trainer }: ManagerScheduleTrainerCardProps) {
  const { openAddShift } = useManagerScheduleLogic();

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-primary motion-safe:transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-primary">{trainer.trainerName}</p>
          <p className="text-xs text-secondary">{trainer.trainerRole}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trainer.isActive ? 'bg-success-bg text-success' : 'bg-input text-secondary'}`}>
          {trainer.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-secondary">
        <span className="flex items-center gap-1"><CalendarDays size={18} />{trainer.totalShiftsPerWeek} shifts/wk</span>
        <span className="flex items-center gap-1"><Clock size={18} />{trainer.totalHoursPerWeek}h/wk</span>
      </div>

      {/* Day dots */}
      <div className="flex gap-1.5">
        {SHIFT_DAYS.map(day => {
          const shift = trainer.shifts.find(s => s.day === day);
          const styles = shift ? SHIFT_STATUS_STYLES[shift.status] : null;
          return (
            <div
              key={day}
              title={shift ? `${day}: ${shift.startTime}–${shift.endTime} (${shift.status})` : `${day}: No shift`}
              className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold cursor-default ${
                styles ? `${styles.bg} ${styles.text}` : 'bg-input text-secondary'
              }`}
            >
              {day[0]}
            </div>
          );
        })}
      </div>

      {/* Add shift CTA */}
      <button
        onClick={() => openAddShift(trainer.trainerId)}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-secondary border border-dashed border-border rounded-lg hover:border-primary hover:text-primary motion-safe:transition-colors"
      >
        <Plus size={18} /> Add Shift
      </button>
    </div>
  );
}
