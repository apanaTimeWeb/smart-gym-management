// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Renders the exercises data table with muscle group, category, and inline edit/delete actions.
'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { useWorkoutContext } from '@/app/trainer/workout/workout_context/WorkoutContext';
import { EXERCISE_TABLE_HEADERS } from '@/app/trainer/workout/workout_utils/WorkoutSharedConstants';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';

export default function TrainerWorkoutExerciseTable() {
  const { exercises, totalExercises, search, currentPage, setCurrentPage, openEditEx, deleteEx } = useWorkoutContext();
  const { confirm } = useConfirm();

  const totalPages = Math.ceil(totalExercises / TRAINER_ITEMS_PER_PAGE) || 1;
  const { fetchState } = useWorkoutContext();

  if (fetchState === 'loading') {
    return (
      <div className="flex justify-center py-10">
        <div className="motion-safe:animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">Failed to load exercises.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-muted">
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
              <tr key={ex.id} className="hover:bg-accent motion-safe:transition-colors cursor-pointer" onClick={() => openEditEx(ex)}>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{ex.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {Array.isArray(ex.muscleGroup) ? ex.muscleGroup.join(', ') : (ex.muscleGroup || (ex as any).muscle || 'N/A')}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">
                    {ex.category || (ex as any).equipment || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    ex.difficulty === 'Beginner' 
                    ? 'bg-success-bg text-success dark:bg-success-bg dark:text-success' 
                    : ex.difficulty === 'Intermediate' 
                    ? 'bg-warning-bg text-warning dark:bg-warning-bg dark:text-warning' 
                    : 'bg-danger-bg text-danger dark:bg-danger-bg dark:text-danger'
                  }`}>
                    {ex.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEditEx(ex); }} 
                      className="text-info hover:text-info dark:hover:text-info p-1 rounded-md hover:bg-info-bg dark:hover:bg-info-bg motion-safe:transition-colors"
                    >
                      <Edit2 size={15} />
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
                          deleteEx(ex.id); 
                        }
                      }} 
                      className="text-danger hover:text-danger dark:hover:text-danger p-1 rounded-md hover:bg-danger-bg dark:hover:bg-danger-bg motion-safe:transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
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
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalExercises} 
        itemsPerPage={TRAINER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

