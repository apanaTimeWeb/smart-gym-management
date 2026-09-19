'use client';
// RESPONSIBILITY: Renders the grid of workout plan cards with exercises count and action buttons.
import ManagerWorkoutPlansEmptyState from '@/app/manager/workout/workout_components/ManagerWorkoutPlansGrid/ManagerWorkoutPlansEmptyState';
import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import { useManagerWorkoutLogic } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutLogic';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useWorkoutPlansQuery } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutQueries';
import { useDeleteWorkoutMutation } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutMutations';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';

export default function ManagerWorkoutPlansGrid() {
  const { search, levelFilter, currentPage, setCurrentPage, openEditWk } = useManagerWorkoutLogic();
  const { confirm } = useConfirm();
  
  const { data, isLoading } = useWorkoutPlansQuery({
    search,
    level: levelFilter !== 'ALL' ? levelFilter : '',
    page: currentPage.toString()
  });

  const deleteMutation = useDeleteWorkoutMutation();

  const workouts = data?.workouts || [];
  const totalWorkouts = data?.total || 0;

  const totalPages = Math.ceil(totalWorkouts / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isLoading) {
    return <ManagerTableSkeleton rows={6} />;
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {workouts.map(w => (
          <div 
            key={w.id} 
            className="border border-border rounded-xl p-4 hover:border-info dark:hover:border-info hover:shadow-card motion-safe:transition-all bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-info dark:bg-info rounded-xl flex items-center justify-center">
                <Dumbbell size={18} className="text-info dark:text-info" />
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  w.level === 'Beginner' 
                    ? 'bg-success text-success dark:bg-success dark:text-success' 
                    : w.level === 'Intermediate' 
                    ? 'bg-warning text-warning dark:bg-warning dark:text-warning' 
                    : 'bg-danger text-danger dark:bg-danger dark:text-danger'
                }`}>
                  {w.level}
                </span>
                <button 
                  onClick={() => openEditWk(w)} 
                  className="p-1.5 text-info hover:text-info hover:bg-info dark:hover:bg-info rounded-lg motion-safe:transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={async () => {
                    const ok = await confirm({
                      title: 'Delete Workout Plan',
                      message: `Are you sure you want to delete workout plan "${w.name}"?`,
                      type: 'danger',
                      confirmText: 'Delete'
                    });
                    if (ok) {
                      try {
                        const response = await deleteMutation.mutateAsync({ id: w.id, idempotencyKey: crypto.randomUUID() });
                        showManagerSuccessToast(response.message, 'manager-workout-plan-success');
                      } catch (e: unknown) {
                        showManagerErrorToast(e, 'manager-workout-plan-error');
                      }
                    }
                  }}
                  className="p-1.5 text-danger hover:text-danger hover:bg-danger dark:hover:bg-danger rounded-lg motion-safe:transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-primary mb-3">{w.name}</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: 'Days', v: w.days }, 
                { l: 'Exercises', v: w.exercises }, 
                { l: 'Duration', v: w.duration }
              ].map(s => (
                <div key={s.l} className="bg-input rounded-lg p-2 text-center border border-border">
                  <p className="text-sm font-bold text-primary">{Array.isArray(s.v) ? s.v.length : s.v}</p>
                  <p className="text-xs text-secondary">{s.l}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {w.tags?.map((tag: string) => (
                <span key={tag} className="text-xs bg-input text-secondary px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs text-secondary">
              Focus: <span className="font-medium text-primary">{w.focus}</span>
            </p>
          </div>
        ))}
        {workouts.length === 0 && <ManagerWorkoutPlansEmptyState />}
      </div>
      <div className="mt-6">
        <ManagerPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalWorkouts} 
          itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
