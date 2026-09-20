// RESPONSIBILITY: Renders the browseable exercise table with server-side search/filter/sort/pagination and accessible row actions.
'use client';
import { Fragment, useState } from 'react';
import { Edit2, Trash2, ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from 'lucide-react';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import { useTrainerExercisesQuery } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutQuery';
import { EXERCISE_TABLE_HEADERS, TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import { TRAINER_WORKOUT_SORT_FIELDS, type TrainerWorkoutSortField, type TrainerWorkoutSortDirection } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSortConstants';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import TrainerTableSkeleton from '@/app/trainer/trainer_components/TrainerShared/TrainerTableSkeleton';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useTrainerConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerConfirm';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { displayValue } from '@/lib/formatters';

/** Returns an accessible description for the next sort action. */
const sortLabel = (field: TrainerWorkoutSortField, active: TrainerWorkoutSortField, direction: TrainerWorkoutSortDirection) => {
  if (field !== active) return 'Sort ascending';
  return direction === 'asc' ? 'Sort descending' : 'Sort ascending';
};

export default function TrainerWorkoutExerciseTable() {
  const { search, category, page, setPage, sortBy, sortDirection, setSort } = useTrainerWorkoutFilters();
  const { data, isPending, isError, error, refetch } = useTrainerExercisesQuery(search, category, page, sortBy, sortDirection);
  const { setEditEx, setShowExModal } = useTrainerWorkoutStore();
  const { deleteExercise } = useTrainerWorkoutMutations();
  const { confirm } = useTrainerConfirm();
  const { showSuccess, showError } = useTrainerFeedback();
  const deleteKey = useTrainerIdempotencyKey();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const exercises = data?.exercises ?? [];
  const totalExercises = data?.total ?? 0;
  const totalPages = Math.ceil(totalExercises / TRAINER_ITEMS_PER_PAGE) || 1;

  const handleSort = (field: TrainerWorkoutSortField) => {
    setSort(field);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise? This action cannot be undone.', type: 'danger', confirmText: 'Delete', requireTypedConfirmation: true, confirmationPhrase: 'DELETE EXERCISE' });
    if (!confirmed) return;
    const actionId = `delete-exercise-${id}`;
    const key = deleteKey.begin(actionId);
    try {
      const response = await deleteExercise.mutateAsync({ id, idempotencyKey: key });
      showSuccess(response.message, actionId);
      deleteKey.clear(actionId);
    } catch (deleteError) {
      showError(deleteError, actionId);
    }
  };

  if (isPending) return <TrainerTableSkeleton rows={6} columns={EXERCISE_TABLE_HEADERS.length} />;
  if (isError) return <div role="alert" className="text-center py-16 bg-card rounded-2xl border border-danger"><p className="text-danger font-medium">Unable to load exercises right now.</p><button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button><p className="text-xs mt-2 text-secondary">{getTrainerUserSafeErrorMessage(error)}</p></div>;

  const headers: Array<{ label: string; field?: TrainerWorkoutSortField }> = [
    { label: EXERCISE_TABLE_HEADERS[0], field: TRAINER_WORKOUT_SORT_FIELDS.NAME },
    { label: EXERCISE_TABLE_HEADERS[1], field: TRAINER_WORKOUT_SORT_FIELDS.CATEGORY },
    { label: EXERCISE_TABLE_HEADERS[2] },
    { label: EXERCISE_TABLE_HEADERS[3], field: TRAINER_WORKOUT_SORT_FIELDS.DIFFICULTY },
    { label: EXERCISE_TABLE_HEADERS[4] },
  ];

  return <div className="flex flex-col h-full min-h-96">
    <div className="overflow-x-auto flex-1">
      <table className="w-full"><thead className="bg-surface-highlight"><tr>{headers.map((header) => <th key={header.label} scope="col" className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">{header.field ? <button type="button" onClick={() => handleSort(header.field!)} aria-label={`${header.label}: ${sortLabel(header.field, sortBy, sortDirection)}`} className="inline-flex items-center gap-1 min-h-11 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{header.label}{sortBy === header.field ? (sortDirection === 'asc' ? <ArrowUp size={18} aria-hidden="true" /> : <ArrowDown size={18} aria-hidden="true" />) : <ArrowUpDown size={18} aria-hidden="true" className="text-secondary" />}</button> : header.label}</th>)}</tr></thead>
        <tbody className="divide-y divide-border">{exercises.map((ex) => { const expanded = expandedId === ex.id; return <Fragment key={ex.id}><tr tabIndex={0} aria-expanded={expanded} onClick={() => setExpandedId((current) => current === ex.id ? null : ex.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedId((current) => current === ex.id ? null : ex.id); } }} className="cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base"><td className="px-4 py-3 text-sm font-medium text-primary truncate max-w-xs">{displayValue(ex.name)}</td><td className="px-4 py-3 text-sm text-secondary">{Array.isArray(ex.muscleGroup) ? displayValue(ex.muscleGroup.join(', ')) : displayValue(ex.muscleGroup)}</td><td className="px-4 py-3"><span className="text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">{displayValue(ex.category)}</span></td><td className="px-4 py-3"><span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[ex.difficulty as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>{displayValue(ex.difficulty)}</span></td><td className="px-4 py-3"><div className="flex gap-1"><button type="button" aria-label={`Edit exercise ${ex.name}`} title={`Edit exercise ${ex.name}`} onClick={(event) => { event.stopPropagation(); setEditEx(ex); setShowExModal(true); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Edit2 size={18} strokeWidth={2} aria-hidden="true" /></button><button type="button" aria-label={`Delete exercise ${ex.name}`} title={`Delete exercise ${ex.name}`} onClick={(event) => { event.stopPropagation(); void handleDelete(ex.id); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Trash2 size={18} strokeWidth={2} aria-hidden="true" /></button></div></td></tr>{expanded && <tr className="bg-surface-highlight"><td colSpan={EXERCISE_TABLE_HEADERS.length} className="px-4 py-3 text-sm text-secondary">Muscle group: {Array.isArray(ex.muscleGroup) ? displayValue(ex.muscleGroup.join(', ')) : displayValue(ex.muscleGroup)}</td></tr>}</Fragment>; })}
          {exercises.length === 0 && <tr><td colSpan={EXERCISE_TABLE_HEADERS.length} className="text-center py-8 text-secondary">No exercises found matching &quot;{search}&quot;.</td></tr>}
        </tbody></table>
    </div><TrainerPagination currentPage={page} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={TRAINER_ITEMS_PER_PAGE} onPageChange={setPage} />
  </div>;
}
