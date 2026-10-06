// RESPONSIBILITY: Renders ManagerWorkoutExerciseTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { EXERCISE_TABLE_HEADERS } from '@/app/frontend_manager/manager_workout/manager_workout_constants/ManagerWorkoutSharedConstants';
import { useManagerWorkoutLogic } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutLogic';
import { useDeleteExerciseMutation } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutMutations';
import { useExercisesQuery } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutQueries';
import { ManagerWorkoutDisplayValue, ManagerWorkoutGetDifficultyLabelKey } from '@/app/frontend_manager/manager_workout/manager_workout_utils/ManagerWorkoutFormatters';


/** @description Renders the ManagerWorkoutExerciseTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves error state, responsive behavior. */
export default function ManagerWorkoutExerciseTable() {
  const t = useTranslations('MANAGER_WORKOUT');

  const { search, currentPage, setCurrentPage, openEditEx } = useManagerWorkoutLogic();
  const { confirm } = useConfirm();
  const deleteKeyByIdRef = useRef(new Map<string, string>());

  const { data, isPending } = useExercisesQuery({
    search,
    page: currentPage.toString()
  });

  const { deleteExercise } = useDeleteExerciseMutation();

  const exercises = data?.exercises || [];
  const totalExercises = data?.total || 0;

  const totalPages = Math.ceil(totalExercises / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isPending) {
    return <ManagerTableSkeleton rows={6} />;
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="hidden lg:block overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-input">
            <tr>
              {EXERCISE_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {exercises.map((ex, mapIndex) => (
              <tr
                data-testid={`manager_workout-workout-managerworkoutexercisetable-row-${ex.id}`}
                key={ex.id}
                className="hover:bg-primary-subtle motion-safe:transition-all cursor-pointer motion-safe:duration-base ease-in-out"
                tabIndex={0}
                role="button"
                aria-label={t("TEXT_EDIT_EXERCISE", { value: ex.name })}
                onClick={() => openEditEx(ex)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openEditEx(ex);
                  }
                }}
              >
                <td className="px-4 py-3 text-sm font-medium text-primary">{ex.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">{ex.muscleGroup?.join(', ')}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">
                    {ex.category || t('COPY_N')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    (() => { if (ex.difficulty === 'BEGINNER') return 'bg-success text-on-success '; return (() => { if (ex.difficulty === 'INTERMEDIATE') return 'bg-warning text-on-warning '; return 'bg-danger text-on-danger '; })(); })()
                  }`} data-testid="manager_workout-managerworkoutexercisetable-status-badge-1">
                    {t(ManagerWorkoutGetDifficultyLabelKey(ex.difficulty))}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-info hover:text-info p-1 rounded-md hover:bg-info-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutexercisetable-button-openeditex-${mapIndex}`} 
                      aria-label={t("TEXT_EDIT_EXERCISE", { value: ex.name })}
                      onClick={(e) => { e.stopPropagation(); openEditEx(ex); }} 
                      
                    >
                      <Edit2 size={18} strokeWidth={2}/>
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-danger hover:text-danger p-1 rounded-md hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutexercisetable-button-delete-exercise-${mapIndex}`} 
                      aria-label={t("TEXT_DELETE_EXERCISE", { value: ex.name })}
                      onClick={async (e) => { 
                        e.stopPropagation(); 
                        const ok = await confirm({
                          title: t("COPY_DELETE_EXERCISE_1"),
                          message: t("TEXT_DELETE_EXERCISE_CONFIRM_MESSAGE", { value: ex.name }),
                          type: 'danger',
                          confirmText: t("COPY_DELETE_1")
                        });
                        if (ok) {
                          try {
                            const idempotencyKey = deleteKeyByIdRef.current.get(ex.id) ?? createManagerIdempotencyKey(); deleteKeyByIdRef.current.set(ex.id, idempotencyKey); const response = await deleteExercise({ id: ex.id, idempotencyKey }); deleteKeyByIdRef.current.delete(ex.id);
                            showManagerSuccessToast(response.message, 'manager-workout-exercise-table-success');
                          } catch (err: unknown) {
                            showManagerErrorToast(err, 'manager-workout-exercise-table-error');
                          }
                        }
                      }}
                      
                    >
                      <Trash2 size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {exercises.length === 0 && (
              <tr>
                <td colSpan={EXERCISE_TABLE_HEADERS.length} className="text-center py-8 text-secondary">{t("COPY_NO_EXERCISES_FOUND_MATCHING_QUOT_2")}{search}{t("COPY_QUOT_2")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden flex-1 overflow-y-auto divide-y divide-border">
        {exercises.map((ex, mapIndex) => (
          <article key={`mobile-exercise-${ex.id}`} className="p-4 bg-card space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="font-semibold text-primary truncate">{ex.name}</p><p className="text-xs text-secondary truncate">{ManagerWorkoutDisplayValue(ex.muscleGroup?.join(', '))}</p></div>
              <span className="shrink-0 text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">{ex.category || t('COPY_N')}</span>
            </div>
            <div className="flex items-center justify-between gap-3"><span className="text-xs text-secondary">{t("COPY_DIFFICULTY_1")}</span><span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-input text-primary">{t(ManagerWorkoutGetDifficultyLabelKey(ex.difficulty))}</span></div>
            <div className="flex justify-end gap-2">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-info hover:bg-info-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutexercisetable-button-difficulty-${mapIndex}`} type="button" onClick={() => openEditEx(ex)}  aria-label={t("TEXT_EDIT_EXERCISE", { value: ex.name })}><Edit2 size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutexercisetable-button-edit-exercise-${mapIndex}`} type="button" onClick={async () => { const ok = await confirm({ title: t("COPY_DELETE_EXERCISE_2"), message: t("TEXT_DELETE_EXERCISE_CONFIRM_MESSAGE", { value: ex.name }), type: 'danger', confirmText: t("COPY_DELETE_2") }); if (!ok) return; try { const idempotencyKey = deleteKeyByIdRef.current.get(ex.id) ?? createManagerIdempotencyKey(); deleteKeyByIdRef.current.set(ex.id, idempotencyKey); const response = await deleteExercise({ id: ex.id, idempotencyKey }); deleteKeyByIdRef.current.delete(ex.id); showManagerSuccessToast(response.message, 'manager-workout-exercise-table-success'); } catch (err: unknown) { showManagerErrorToast(err, 'manager-workout-exercise-table-error'); } }}  aria-label={t("TEXT_DELETE_EXERCISE", { value: ex.name })}><Trash2 size={18} strokeWidth={2}/></button>
            </div>
          </article>
        ))}
        {exercises.length === 0 && <div className="p-8 text-center text-secondary">{t("COPY_NO_EXERCISES_FOUND_MATCHING_QUOT_1")}{search}{t("COPY_QUOT_1")}</div>}
      </div>
      <ManagerPagination data-testid="manager_workout-managerworkoutexercisetable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalExercises} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
