// RESPONSIBILITY: Renders the browseable workout-plan card grid and guarded delete actions.
'use client';
// DATA FLOW: URL filters → TanStack Query → plan cards → mutation → query invalidation + backend message.
import { useState } from 'react';
import { Dumbbell, Edit2, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import { useTrainerWorkoutsQuery } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutQuery';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useTrainerConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerConfirm';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import TrainerWorkoutLoadingSkeleton from '@/app/trainer/workout/workout_components/TrainerWorkoutLoadingSkeleton/TrainerWorkoutLoadingSkeleton';
import TrainerWorkoutEmptyState from '@/app/trainer/workout/workout_components/TrainerWorkoutEmptyState/TrainerWorkoutEmptyState';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import { TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import { formatNumber, displayValue } from '@/lib/formatters';

/** Renders one workout plan card with stable async-action dimensions. */
function TrainerWorkoutPlanCard({ plan, onEdit, onDelete, deleting }: { plan: { id: string; name: string; level?: string | null; days?: number | null; exercises?: number | null; duration?: string | null; tags?: unknown; focus?: string | null }; onEdit: () => void; onDelete: () => void; deleting: boolean }) {
  const tags = Array.isArray(plan.tags) ? plan.tags : typeof plan.tags === 'string' ? plan.tags.split(',').filter(Boolean) : [];
  return (
    <article className="border border-border rounded-xl p-4 hover:border-info hover:shadow-card motion-safe:transition-all bg-card">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="min-w-10 min-h-10 bg-info-bg rounded-xl flex items-center justify-center shrink-0"><Dumbbell size={18} className="text-info" /></div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TRAINER_WORKOUT_DIFFICULTY_STYLES[plan.level as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>{displayValue(plan.level)}</span>
      </div>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-primary truncate min-w-0">{displayValue(plan.name)}</h3>
        <div className="flex gap-1 shrink-0">
          <button type="button" onClick={onEdit} aria-label={`Edit workout plan ${plan.name}`} title={`Edit workout plan ${plan.name}`} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Edit2 size={18} strokeWidth={2} aria-hidden="true" /></button>
          <button type="button" onClick={onDelete} disabled={deleting} aria-label={`Delete workout plan ${plan.name}`} title={`Delete workout plan ${plan.name}`} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">{deleting ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Trash2 size={18} strokeWidth={2} aria-hidden="true" />}</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[['Days', plan.days], ['Exercises', plan.exercises], ['Duration', plan.duration]].map(([label, value]) => <div key={String(label)} className="bg-input rounded-lg p-2 text-center border border-border"><p className="text-sm font-bold text-primary">{typeof value === 'number' ? formatNumber(value) : displayValue(value as string | null)}</p><p className="text-xs text-secondary">{label}</p></div>)}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">{tags.map((tag) => <span key={String(tag).trim()} className="text-xs bg-input text-secondary px-2 py-0.5 rounded-full">{String(tag).trim()}</span>)}</div>
      <p className="text-xs text-secondary">Focus: <span className="font-medium text-primary">{displayValue(plan.focus)}</span></p>
    </article>
  );
}

export default function TrainerWorkoutPlansGrid() {
  const { search, category, page, setPage, sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data, status, refetch } = useTrainerWorkoutsQuery(search, category, page, sortBy, sortDirection);
  const { setEditWk, setShowWkModal } = useTrainerWorkoutStore();
  const { deleteWorkout } = useTrainerWorkoutMutations();
  const { confirm } = useTrainerConfirm();
  const { showSuccess, showError } = useTrainerFeedback();
  const actionKeys = useTrainerIdempotencyKey();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const workouts = data?.workouts ?? [];
  const totalWorkouts = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalWorkouts / TRAINER_ITEMS_PER_PAGE));

  if (status === 'pending') return <TrainerWorkoutLoadingSkeleton />;
  if (status === 'error') return <div className="text-center py-16 bg-card rounded-2xl border border-danger" role="alert"><p className="text-danger font-medium">Unable to load workout plans.</p><p className="text-sm mt-1 text-secondary">{getTrainerUserSafeErrorMessage(data)}</p><button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RefreshCw size={18} />Retry</button></div>;

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({ title: 'Delete Plan', message: `Delete the workout plan “${name}”? This action cannot be undone.`, type: 'danger', confirmText: 'Delete', requireTypedConfirmation: true, confirmationPhrase: 'DELETE PLAN' });
    if (!confirmed) { actionKeys.clear(`delete-workout-${id}`); return; }
    const actionId = `delete-workout-${id}`;
    setDeletingId(id);
    try {
      const response = await deleteWorkout.mutateAsync({ id, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
    } catch (error) { showError(error, actionId); }
    finally { setDeletingId(null); }
  };

  return <div className="flex flex-col h-full min-h-96"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">{workouts.map((workout) => <TrainerWorkoutPlanCard key={workout.id} plan={workout} onEdit={() => { setEditWk(workout); setShowWkModal(true); }} onDelete={() => void handleDelete(workout.id, workout.name)} deleting={deletingId === workout.id} />)}{workouts.length === 0 && <div className="col-span-full"><TrainerWorkoutEmptyState onAdd={() => setShowWkModal(true)} /></div>}</div><div className="mt-6"><TrainerPagination currentPage={page} totalPages={totalPages} totalItems={totalWorkouts} itemsPerPage={TRAINER_ITEMS_PER_PAGE} onPageChange={setPage} /></div></div>;
}
