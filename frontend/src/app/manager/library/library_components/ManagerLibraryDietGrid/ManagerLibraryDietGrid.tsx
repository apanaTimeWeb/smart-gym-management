'use client';
// RESPONSIBILITY: Renders the Diet Plan collection cards and delegates edit/delete behavior to the Library hook.
import { Apple, Edit2, Flame, Trash2 } from 'lucide-react';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import ManagerLibraryEmptyState from '@/app/manager/library/library_components/ManagerLibraryEmptyState/ManagerLibraryEmptyState';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';

export default function ManagerLibraryDietGrid() {
  const { dietPlans, totalDietPlans, isLoading, isError, errorMessage, currentPage, setCurrentPage, openAddDiet, openEditDiet, deleteDietPlan, loadAll } = useManagerLibraryLogic();
  const totalPages = Math.max(1, Math.ceil(totalDietPlans / MANAGER_ITEMS_PER_PAGE));
  if (isLoading) return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading diet plans">{['diet-a', 'diet-b', 'diet-c', 'diet-d', 'diet-e', 'diet-f'].map((id) => <div key={id} className="h-48 rounded-xl border border-border bg-skeleton-base p-5 motion-safe:animate-pulse"><div className="h-10 w-10 rounded-xl bg-skeleton-highlight" /><div className="mt-4 h-4 w-3/4 rounded bg-skeleton-highlight" /><div className="mt-2 h-3 w-1/2 rounded bg-skeleton-highlight" /><div className="mt-8 h-3 w-full rounded bg-skeleton-highlight" /></div>)}</div>;
  if (isError) return <div role="alert" className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-danger bg-danger-bg p-6 text-center"><p className="text-sm font-semibold text-danger">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p><button type="button" onClick={() => void loadAll()} className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  if (dietPlans.length === 0) return <div className="space-y-5"><ManagerLibraryEmptyState view="diet" onAdd={openAddDiet} /><ManagerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} /></div>;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dietPlans.map((diet) => (
          <article key={diet.id} className="flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1" tabIndex={0} onClick={() => openEditDiet(diet)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditDiet(diet); } }}>
            <div className="mb-3 flex items-start justify-between gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-bg text-success"><Apple size={18} aria-hidden="true" /></div><div className="flex gap-1">
              <button type="button" onClick={(event) => { event.stopPropagation(); openEditDiet(diet); }} aria-label={`Edit ${diet.name}`} className="min-h-11 min-w-11 rounded-lg text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base"><Edit2 size={18} className="mx-auto" aria-hidden="true" /></button>
              <button type="button" onClick={(event) => { event.stopPropagation(); void deleteDietPlan(diet.id); }} aria-label={`Delete ${diet.name}`} className="min-h-11 min-w-11 rounded-lg text-danger hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger motion-safe:transition-all motion-safe:duration-base"><Trash2 size={18} className="mx-auto" aria-hidden="true" /></button>
            </div></div>
            <h3 className="truncate text-sm font-bold text-primary" title={diet.name}>{diet.name}</h3>
            <p className="mt-1 text-xs text-secondary">{diet.goal}</p>
            <div className="mt-auto space-y-1 border-t border-border pt-3">
              <div className="flex items-center gap-2 text-xs text-secondary"><Flame size={18} className="text-warning" aria-hidden="true" /><span>{diet.calories ?? '—'} kcal/day</span></div>
              <p className="text-xs text-secondary">Protein {diet.protein ?? '—'}g · Carbs {diet.carbs ?? '—'}g · Fats {diet.fats ?? '—'}g</p>
            </div>
          </article>
        ))}
      </div>
      <ManagerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
