'use client';
// RESPONSIBILITY: Renders server-filtered and server-paginated Diet Plan records with read-only actions.
import { Apple, Eye, Flame } from 'lucide-react';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import TrainerLibraryEmptyState from '@/app/trainer/library/library_components/TrainerLibraryEmptyState/TrainerLibraryEmptyState';
import type { TrainerLibraryDietGridProps } from '@/app/trainer/library/library_types/TrainerLibraryDietGridProps';



export default function TrainerLibraryDietGrid({
  dietPlans,
  totalDietPlans,
  currentPage,
  isPending,
  isError,
  search,
  onPageChange,
  onViewDiet,
}: TrainerLibraryDietGridProps) {
  const totalPages = Math.max(1, Math.ceil(totalDietPlans / TRAINER_ITEMS_PER_PAGE));

  if (isError) return <div className="rounded-xl border border-danger bg-danger-bg p-5 text-on-danger">Unable to load diet plans. Please retry.</div>;
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {['diet-1','diet-2','diet-3','diet-4','diet-5','diet-6'].map((id) => (
          <div key={id} className="rounded-xl border border-border bg-card p-5 motion-safe:animate-pulse h-48">
            <div className="w-10 h-10 rounded-xl bg-skeleton-base mb-4" />
            <div className="w-3/4 h-5 rounded bg-skeleton-base mb-2" />
            <div className="w-1/2 h-4 rounded bg-skeleton-base mb-4" />
            <div className="w-full h-10 rounded bg-skeleton-base" />
          </div>
        ))}
      </div>
    );
  }
  if (dietPlans.length === 0) return <TrainerLibraryEmptyState search={search} />;

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dietPlans.map((plan) => (
          <button
            type="button"
            key={plan.id}
            onClick={() => onViewDiet(plan)}
            title={plan.name}
            className="text-left rounded-xl border border-border bg-card p-5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-shadow flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-success-bg text-on-success shrink-0">
                <Apple size={18} />
              </div>
              <span className="p-1.5 rounded text-secondary" title="View diet plan" aria-hidden="true"><Eye size={18} /></span>
            </div>
            <h4 className="font-bold text-primary truncate mb-1">{plan.name}</h4>
            <p className="text-xs text-secondary mb-3 truncate">{plan.goal}</p>
            <div className="mt-auto pt-3 border-t border-border space-y-1">
              {plan.calories ? <div className="flex items-center gap-2 text-xs text-secondary"><Flame size={18} className="text-warning" /><span>{plan.calories} kcal/day</span></div> : null}
              {plan.protein ? <p className="text-xs text-secondary">Protein: {plan.protein}g · Carbs: {plan.carbs}g · Fats: {plan.fats}g</p> : null}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <TrainerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={TRAINER_ITEMS_PER_PAGE} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
