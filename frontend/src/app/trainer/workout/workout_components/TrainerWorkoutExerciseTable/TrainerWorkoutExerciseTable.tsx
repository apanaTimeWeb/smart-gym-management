'use client';
// RESPONSIBILITY: Renders the exercises data table with muscle group, category, and inline edit/delete actions.
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import { useTrainerExercisesQuery } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutQuery';
import { EXERCISE_TABLE_HEADERS, TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { Edit2, Trash2 } from 'lucide-react';

export default function TrainerWorkoutExerciseTable() {
  const { search, category, page, setPage } = useTrainerWorkoutFilters();
  const { data, status } = useTrainerExercisesQuery(search, category, page);
  const { setEditEx, setShowExModal } = useTrainerWorkoutStore();
  const { deleteExercise } = useTrainerWorkoutMutations();
  const { confirm } = useConfirm();

  const exercises = data?.exercises ?? [];
  const totalExercises = data?.total ?? 0;

  const totalPages = Math.ceil(totalExercises / TRAINER_ITEMS_PER_PAGE) || 1;

  if (status === 'pending') {
    return (
      <div className="flex justify-center py-10">
        <div className="motion-safe:animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger">
        <p className="text-danger font-medium">Unable to load exercises right now. Please retry.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-surface-highlight">
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
              <tr key={ex.id} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                <td className="px-4 py-3 text-sm font-medium text-primary">{ex.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {Array.isArray(ex.muscleGroup) ? ex.muscleGroup.join(', ') : (ex.muscleGroup || 'N/A')}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">
                    {ex.category || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[ex.difficulty as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>
                    {ex.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-1">
                  <button type="button" onClick={() => { setEditEx(ex); setShowExModal(true); }} className="p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors motion-safe:duration-base">
                    <Edit2 size={18} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={async () => {
                    const ok = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', type: 'danger', confirmText: 'Delete' });
                    if (ok) deleteExercise.mutate(ex.id);
                  }} className="p-1.5 text-secondary hover:text-on-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors motion-safe:duration-base">
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
            {exercises.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-secondary">
                  No exercises found matching &quot;{search}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TrainerPagination 
        currentPage={page} 
        totalPages={totalPages} 
        totalItems={totalExercises} 
        itemsPerPage={TRAINER_ITEMS_PER_PAGE} 
        onPageChange={setPage} 
      />
    </div>
  );
}

