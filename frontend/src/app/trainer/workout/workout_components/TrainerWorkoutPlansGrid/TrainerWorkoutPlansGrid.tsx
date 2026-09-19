'use client';
// RESPONSIBILITY: Renders the grid of workout plan cards with exercises count and action buttons.
import { Dumbbell } from 'lucide-react';
import { TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import { useTrainerWorkoutsQuery } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutQuery';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { Edit2, Trash2 } from 'lucide-react';

export default function TrainerWorkoutPlansGrid() {
  const { search, category, page, setPage } = useTrainerWorkoutFilters();
  const { data, status } = useTrainerWorkoutsQuery(search, category, page);
  const { setEditWk, setShowWkModal } = useTrainerWorkoutStore();
  const { deleteWorkout } = useTrainerWorkoutMutations();
  const { confirm } = useConfirm();

  const workouts = data?.workouts ?? [];
  const totalWorkouts = data?.total ?? 0;

  const totalPages = Math.ceil(totalWorkouts / TRAINER_ITEMS_PER_PAGE) || 1;

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
        <p className="text-danger font-medium">Unable to load workout plans right now. Please retry.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {workouts.map(w => (
          <div 
            key={w.id} 
            className="border border-border rounded-xl p-4 hover:border-info hover:border-info hover:shadow-card motion-safe:transition-all bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-info-bg dark:bg-info-bg rounded-xl flex items-center justify-center">
                <Dumbbell size={17} className="text-info dark:text-info" />
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TRAINER_WORKOUT_DIFFICULTY_STYLES[w.level as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>
                  {w.level}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-primary truncate mr-2">{w.name}</h3>
              <div className="flex gap-1 shrink-0">
                <button type="button" onClick={() => { setEditWk(w); setShowWkModal(true); }} className="p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors motion-safe:duration-base">
                  <Edit2 size={14} />
                </button>
                <button type="button" onClick={async () => {
                  const ok = await confirm({ title: 'Delete Plan', message: 'Delete this plan?', type: 'danger', confirmText: 'Delete' });
                  if (ok) deleteWorkout.mutate(w.id);
                }} className="p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors motion-safe:duration-base">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: 'Days', v: w.days }, 
                { l: 'Exercises', v: w.exercises }, 
                { l: 'Duration', v: w.duration }
              ].map(s => (
                <div key={s.l} className="bg-input rounded-lg p-2 text-center border border-border">
                  <p className="text-sm font-bold text-primary">{s.v}</p>
                  <p className="text-xs text-secondary">{s.l}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {(Array.isArray(w.tags) ? w.tags : (typeof w.tags === 'string' ? (w.tags as string).split(',').filter(Boolean) : [])).map((tag: string) => (
                <span key={tag.trim()} className="text-xs bg-input text-secondary px-2 py-0.5 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
            
            <p className="text-xs text-secondary">
              Focus: <span className="font-medium text-primary">{w.focus}</span>
            </p>
          </div>
        ))}
        {workouts.length === 0 && (
          <div className="col-span-full text-center py-10 text-secondary">
            No workout plans found matching &quot;{search}&quot;.
          </div>
        )}
      </div>
      <div className="mt-6">
        <TrainerPagination 
          currentPage={page} 
          totalPages={totalPages} 
          totalItems={totalWorkouts} 
          itemsPerPage={TRAINER_ITEMS_PER_PAGE} 
          onPageChange={setPage} 
        />
      </div>
    </div>
  );
}

