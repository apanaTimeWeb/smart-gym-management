// RESPONSIBILITY: Renders the Exercise collection cards and delegates edit/delete behavior to the Library hook.
'use client';
import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import ManagerLibraryEmptyState from '@/app/manager/library/library_components/ManagerLibraryEmptyState/ManagerLibraryEmptyState';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';


const EXERCISE_SKELETON_IDS = ['exercise-a', 'exercise-b', 'exercise-c', 'exercise-d', 'exercise-e', 'exercise-f'] as const;

export default function ManagerLibraryExerciseGrid() {
  const { exercises, totalExercises, isPending, isError, errorMessage, currentPage, setCurrentPage, openAddExercise, openEditExercise, deleteExercise, loadAll } = useManagerLibraryLogic();
  const totalPages = Math.max(1, Math.ceil(totalExercises / MANAGER_ITEMS_PER_PAGE));
  if (isPending) return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading exercises">{EXERCISE_SKELETON_IDS.map((id) => <div key={id} className="h-48 rounded-xl border border-border bg-skeleton-base p-5 motion-safe:animate-pulse"><div className="h-10 w-10 rounded-xl bg-skeleton-highlight" /><div className="mt-4 h-4 w-3/4 rounded bg-skeleton-highlight" /><div className="mt-2 h-3 w-1/2 rounded bg-skeleton-highlight" /><div className="mt-8 h-3 w-full rounded bg-skeleton-highlight" /></div>)}</div>;
  if (isError) return <div role="alert" className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-danger bg-danger-bg p-6 text-center"><p className="text-sm font-semibold text-danger">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p><button type="button" onClick={() => void loadAll()} className="min-h-11 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  if (exercises.length === 0) return <div className="space-y-5"><ManagerLibraryEmptyState view="exercises" onAdd={openAddExercise} /><ManagerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} /></div>;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <article key={exercise.id} className="flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1" tabIndex={0} onClick={() => openEditExercise(exercise)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditExercise(exercise); } }}>
            <div className="mb-3 flex items-start justify-between gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info-bg text-info"><Dumbbell size={18} aria-hidden="true" /></div><div className="flex gap-1">
              <button type="button" onClick={(event) => { event.stopPropagation(); openEditExercise(exercise); }} aria-label={`Edit ${exercise.name}`} className="min-h-11 min-w-11 rounded-lg text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base"><Edit2 size={18} className="mx-auto" aria-hidden="true" /></button>
              <button type="button" onClick={(event) => { event.stopPropagation(); void deleteExercise(exercise.id); }} aria-label={`Delete ${exercise.name}`} className="min-h-11 min-w-11 rounded-lg text-danger hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger motion-safe:transition-all motion-safe:duration-base"><Trash2 size={18} className="mx-auto" aria-hidden="true" /></button>
            </div></div>
            <h3 className="truncate text-sm font-bold text-primary" title={exercise.name}>{exercise.name}</h3>
            <p className="mt-1 truncate text-xs text-secondary" title={exercise.category}>{exercise.category}</p>
            <p className="mt-2 text-xs text-secondary">{exercise.muscleGroup?.join(', ') || '—'}</p>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3"><span className="rounded-full bg-info-bg px-2.5 py-1 text-badge font-semibold text-info">{exercise.difficulty}</span><span className="text-xs text-secondary">{exercise.duration ? `${exercise.duration} min` : `${exercise.sets ?? '—'} sets · ${exercise.reps ?? '—'} reps`}</span></div>
          </article>
        ))}
      </div>
      <ManagerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
