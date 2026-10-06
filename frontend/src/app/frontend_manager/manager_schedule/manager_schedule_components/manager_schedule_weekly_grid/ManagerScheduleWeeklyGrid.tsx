// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerTooltip from '@/components/ui/manager_tooltip/ManagerTooltip';
import ManagerScheduleEmptyState from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_weekly_grid/ManagerScheduleEmptyState';
import { MANAGER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleConstants';
import { SHIFT_DAYS, SHIFT_STATUS_STYLES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleSharedConstants';
import { useManagerScheduleLogic } from '@/app/frontend_manager/manager_schedule/manager_schedule_hooks/useManagerScheduleLogic';
import type { ShiftDay, TrainerShift } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';


/** @description Renders the ManagerScheduleWeeklyGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerScheduleWeeklyGrid() {
  const t = useTranslations('MANAGER_SCHEDULE');

  const { trainers, selectedDay, openAddShift, openEditShift, deleteShift } = useManagerScheduleLogic();
  const { confirm } = useConfirm();

  const days: ShiftDay[] = selectedDay === 'All' ? SHIFT_DAYS : [selectedDay];

  const handleDelete = async (shift: TrainerShift) => {
    const ok = await confirm({
      title: t("COPY_REMOVE_SHIFT"),
      message: t("TEXT_REMOVE_SHIFT_MESSAGE", { day: shift.day, value: shift.trainerName }),
      confirmText: t("COPY_REMOVE"),
      type: 'danger' });
    if (ok) await deleteShift(shift.id);
  };

  if (trainers.length === 0) {
    return (
      <ManagerScheduleEmptyState />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <table className="w-full text-left border-collapse min-w-224">
        <thead>
          <tr className="border-b border-border bg-primary-subtle">
            <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider w-44 sticky left-0 bg-primary-subtle z-20">{t("COPY_TRAINER_2")}</th>
            {days.map(day => (
              <th key={day} className="py-3 px-3 text-xs font-semibold text-secondary uppercase tracking-wider text-center">
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {trainers.map((trainer, mapIndex) => (
            <tr key={trainer.trainerId} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
              <td className="py-3 px-4 sticky left-0 bg-card z-20 flex flex-col items-start justify-center gap-0.5">
                <ManagerTooltip content={trainer.trainerName}>
                  <p className="text-sm font-semibold text-primary truncate max-w-40">{trainer.trainerName}</p>
                </ManagerTooltip>
                <ManagerTooltip content={trainer.trainerRole}>
                  <p className="text-xs text-secondary truncate max-w-40">{trainer.trainerRole}</p>
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
                        {shift.status !== MANAGER_SCHEDULE_STATUS_VALUES.OFF && (
                          <p className="text-secondary mt-0.5">{shift.startTime}–{shift.endTime}</p>
                        )}
                        {shift.notes && (
                          <div className="mt-0.5">
                            <ManagerTooltip content={shift.notes}>
                              <p className="text-secondary text-xs truncate max-w-20">{shift.notes}</p>
                            </ManagerTooltip>
                          </div>
                        )}
                        <div className="absolute top-1 right-1 flex gap-1 lg:hidden lg:group-hover:flex">
                          <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-edit-shift`}
                            onClick={e => { e.stopPropagation(); openEditShift(shift); }}
                            className="p-0.5 rounded bg-card hover:bg-card text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                            aria-label={t("COPY_EDIT_SHIFT_1")}
                          >
                            <Pencil size={18} strokeWidth={2}/>
                          </button>
                          <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-delete-shift`}
                            onClick={e => { e.stopPropagation(); void handleDelete(shift); }}
                            className="p-0.5 rounded bg-card hover:bg-card text-secondary hover:text-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                            aria-label={t("COPY_DELETE_SHIFT")}
                          >
                            <Trash2 size={18} strokeWidth={2}/>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-add-shift-for-on`}
                        onClick={() => openAddShift(trainer.trainerId)}
                        className="w-full h-10 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary-subtle flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                        aria-label={t("TEXT_ADD_SHIFT_FOR_TRAINER", { trainer: trainer.trainerName, day })}
                      >
                        <Plus size={18} strokeWidth={2}/>
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
