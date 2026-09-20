'use client';
// RESPONSIBILITY: Renders the exercises data table with muscle group, category, and inline edit/delete actions.
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerWorkoutLogic } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutLogic';
import { EXERCISE_TABLE_HEADERS } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';
import { useExercisesQuery } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutQueries';
import { useDeleteExerciseMutation } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutMutations';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';

import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';

export default function ManagerWorkoutExerciseTable() {
  const { search, currentPage, setCurrentPage, openEditEx } = useManagerWorkoutLogic();
  const { confirm } = useConfirm();

  const { data, isLoading } = useExercisesQuery({
    search,
    page: currentPage.toString()
  });

  const deleteMutation = useDeleteExerciseMutation();

  const exercises = data?.exercises || [];
  const totalExercises = data?.total || 0;

  const totalPages = Math.ceil(totalExercises / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 flex-1 h-full min-h-96">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
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
            {exercises.map(ex => (
              <tr
                key={ex.id}
                className="hover:bg-primary-subtle motion-safe:transition-colors cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`Edit exercise ${ex.name}`}
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
                    {ex.category || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    ex.difficulty === 'Beginner' 
                    ? 'bg-success text-on-primary dark:bg-success dark:text-on-primary' 
                    : ex.difficulty === 'Intermediate' 
                    ? 'bg-warning text-on-primary dark:bg-warning dark:text-on-primary' 
                    : 'bg-danger text-on-primary dark:bg-danger dark:text-on-primary'
                  }`}>
                    {ex.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEditEx(ex); }} 
                      className="text-on-info hover:text-on-info dark:hover:text-on-info p-1 rounded-md hover:bg-info dark:hover:bg-info motion-safe:transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={async (e) => { 
                        e.stopPropagation(); 
                        const ok = await confirm({
                          title: 'Delete Exercise',
                          message: `Are you sure you want to delete exercise "${ex.name}"?`,
                          type: 'danger',
                          confirmText: 'Delete'
                        });
                        if (ok) {
                          try {
                            const response = await deleteMutation.mutateAsync({ id: ex.id, idempotencyKey: crypto.randomUUID() });
                            showManagerSuccessToast(response.message, 'manager-workout-exercise-table-success');
                          } catch (err: unknown) {
                            showManagerErrorToast(err, 'manager-workout-exercise-table-error');
                          }
                        }
                      }}
                      className="text-on-primary hover:text-on-primary dark:hover:text-on-primary p-1 rounded-md hover:bg-danger dark:hover:bg-danger motion-safe:transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {exercises.length === 0 && (
              <tr>
                <td colSpan={EXERCISE_TABLE_HEADERS.length} className="text-center py-8 text-secondary">
                  No exercises found matching &quot;{search}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden flex-1 overflow-y-auto divide-y divide-border">
        {exercises.map((ex) => (
          <article key={`mobile-exercise-${ex.id}`} className="p-4 bg-card space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="font-semibold text-primary truncate">{ex.name}</p><p className="text-xs text-secondary truncate">{ex.muscleGroup?.join(', ') || '—'}</p></div>
              <span className="shrink-0 text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">{ex.category || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between gap-3"><span className="text-xs text-secondary">Difficulty</span><span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-input text-primary">{ex.difficulty}</span></div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => openEditEx(ex)} className="min-h-11 min-w-11 p-2 rounded-md text-on-info hover:bg-info motion-safe:transition-colors" aria-label={`Edit exercise ${ex.name}`}><Edit2 size={18} /></button>
              <button type="button" onClick={async () => { const ok = await confirm({ title: 'Delete Exercise', message: `Are you sure you want to delete exercise "${ex.name}"?`, type: 'danger', confirmText: 'Delete' }); if (!ok) return; try { const response = await deleteMutation.mutateAsync({ id: ex.id, idempotencyKey: crypto.randomUUID() }); showManagerSuccessToast(response.message, 'manager-workout-exercise-table-success'); } catch (err: unknown) { showManagerErrorToast(err, 'manager-workout-exercise-table-error'); } }} className="min-h-11 min-w-11 p-2 rounded-md text-on-primary hover:bg-danger motion-safe:transition-colors" aria-label={`Delete exercise ${ex.name}`}><Trash2 size={18} /></button>
            </div>
          </article>
        ))}
        {exercises.length === 0 && <div className="p-8 text-center text-secondary">No exercises found matching &quot;{search}&quot;.</div>}
      </div>
      <ManagerPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalExercises} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
