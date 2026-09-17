'use client';
// RESPONSIBILITY: Renders the diet plan cards grid with macronutrient info and action buttons.
import { useLibraryContext } from '@/app/manager/library/library_context/ManagerLibraryContext';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { Apple, Edit2, Trash2, Flame, Loader2 } from 'lucide-react';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';

export default function ManagerLibraryDietGrid() {
  const { confirm } = useConfirm();
  const { dietPlans, totalDietPlans, isLoading, isError, debouncedSearch, currentPage, setCurrentPage, openEditDiet, deleteDietPlan } = useLibraryContext();

  const totalPages = Math.max(1, Math.ceil(totalDietPlans / MANAGER_ITEMS_PER_PAGE));
  const currentData = dietPlans;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="py-12 text-center space-y-3">
        <p className="text-sm font-semibold text-danger">Unable to load diet plans.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
        {currentData.map(dp => (
          <div 
            key={dp.id} 
            className="rounded-xl border border-border bg-card p-5 hover:shadow-md motion-safe:transition-shadow flex flex-col cursor-pointer"
            onClick={() => openEditDiet(dp)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-success/10 text-success shrink-0">
                <Apple size={20} />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); openEditDiet(dp); }}
                  className="p-1.5 rounded hover:bg-primary/10 motion-safe:transition-colors text-secondary hover:text-primary"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={async (e) => { 
                    e.stopPropagation(); 
                    const ok = await confirm({
                      title: 'Delete Diet Plan',
                      message: `Are you sure you want to delete diet plan "${dp.name}"?`,
                      type: 'danger',
                      confirmText: 'Delete'
                    });
                    if (ok) {
                      deleteDietPlan(dp.id); 
                    }
                  }}
                  className="p-1.5 rounded motion-safe:transition-colors text-danger hover:bg-danger/10"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h4 className="font-bold text-foreground line-clamp-1 mb-1">{dp.name}</h4>
            <p className="text-xs text-secondary mb-3">{dp.goal}</p>
            
            <div className="mt-auto pt-3 border-t border-border space-y-1">
              {dp.calories && (
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <Flame size={14} className="text-warning" />
                  <span>{dp.calories} kcal/day</span>
                </div>
              )}
              {dp.protein && (
                <p className="text-xs text-secondary">🥩 Protein: {dp.protein}g · Carbs: {dp.carbs}g · Fats: {dp.fats}g</p>
              )}
            </div>
          </div>
        ))}
        {currentData.length === 0 && (
          <div className="col-span-full py-10 text-center text-secondary text-sm">
            No diet plans found for the current search.
          </div>
        )}
      </div>

      <div className="mt-6">
          <ManagerPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalDietPlans} 
            itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </div>
    </div>
  );
}
