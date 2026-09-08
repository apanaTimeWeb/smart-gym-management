// RESPONSIBILITY: Renders the 7-day weekly schedule grid showing all trainer shifts per day column.
'use client';
import { Plus, Pencil, Trash2, CalendarX } from 'lucide-react';
import { useScheduleContext } from '@/app/manager/schedule/schedule_context/ManagerScheduleContext';
import { SHIFT_DAYS, SHIFT_STATUS_STYLES } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import type { ShiftDay, TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import ManagerTooltip from '@/app/manager/manager_components/ManagerFeedback/ManagerTooltip';

export default function ManagerScheduleWeeklyGrid() {
  const { trainers, selectedDay, openAddShift, openEditShift, deleteShift } = useScheduleContext();
  const { confirm } = useConfirm();

  const days: ShiftDay[] = selectedDay === 'All' ? SHIFT_DAYS : [selectedDay];

  const handleDelete = async (shift: TrainerShift) => {
    const ok = await confirm({
      title: 'Remove Shift',
      message: `Remove ${shift.day} shift for ${shift.trainerName}? This cannot be undone.`,
      confirmText: 'Remove',
      type: 'danger',
    });
    if (ok) await deleteShift(shift.id);
  };

  if (trainers.length === 0) {
    return (
      <ManagerEmptyState
        icon={<CalendarX size={32} />}
        title="No trainers found"
        subtitle="Add trainers in the HR module before assigning shifts."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-border bg-primary/5">
            <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider w-44 sticky left-0 bg-primary/5 z-10">
              Trainer
            </th>
            {days.map(day => (
              <th key={day} className="py-3 px-3 text-xs font-semibold text-secondary uppercase tracking-wider text-center">
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {trainers.map(trainer => (
            <tr key={trainer.trainerId} className="hover:bg-primary/5 motion-safe:transition-colors">
              <td className="py-3 px-4 sticky left-0 bg-card z-10 flex flex-col items-start justify-center gap-0.5">
                <ManagerTooltip content={trainer.trainerName}>
                  <p className="text-sm font-semibold text-foreground truncate max-w-[160px]">{trainer.trainerName}</p>
                </ManagerTooltip>
                <ManagerTooltip content={trainer.trainerRole}>
                  <p className="text-xs text-secondary truncate max-w-[160px]">{trainer.trainerRole}</p>
                </ManagerTooltip>
              </td>
              {days.map(day => {
                const shift = trainer.shifts.find(s => s.day === day);
                const styles = shift ? SHIFT_STATUS_STYLES[shift.status] : null;
                return (
                  <td key={day} className="py-2 px-2 text-center align-top">
                    {shift ? (
                      <div className={`rounded-lg px-2 py-1.5 text-xs group relative ${styles!.bg}`}>
                        <p className={`font-semibold ${styles!.text}`}>{shift.status}</p>
                        {shift.status !== 'Off' && (
                          <p className="text-secondary mt-0.5">{shift.startTime}–{shift.endTime}</p>
                        )}
                        {shift.notes && (
                          <div className="mt-0.5">
                            <ManagerTooltip content={shift.notes}>
                              <p className="text-secondary text-[10px] truncate max-w-[80px]">{shift.notes}</p>
                            </ManagerTooltip>
                          </div>
                        )}
                        <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                          <button
                            onClick={e => { e.stopPropagation(); openEditShift(shift); }}
                            className="p-0.5 rounded bg-card/80 hover:bg-card text-secondary hover:text-foreground motion-safe:transition-colors"
                            aria-label="Edit shift"
                          >
                            <Pencil size={11} />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); void handleDelete(shift); }}
                            className="p-0.5 rounded bg-card/80 hover:bg-card text-secondary hover:text-danger motion-safe:transition-colors"
                            aria-label="Delete shift"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => openAddShift(trainer.trainerId)}
                        className="w-full h-10 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors"
                        aria-label={`Add shift for ${trainer.trainerName} on ${day}`}
                      >
                        <Plus size={14} />
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
