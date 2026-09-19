// RESPONSIBILITY: Renders the grid of plans or loading/empty states.
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import ManagerPlansEmptyState from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansEmptyState';
import ManagerPlanCard from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlanCard';
import { useManagerPlansLogic } from '@/app/manager/plans/plans_hooks/ManagerUseManagerPlansLogic';

export default function ManagerPlansGrid() {
  const { filteredPlans, isPending, isError, errorMessage, search } = useManagerPlansLogic();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={`plan-skeleton-${i}`} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
      </div>
    );
  }

  if (filteredPlans.length === 0) { return <ManagerPlansEmptyState />; }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredPlans.map(plan => (
        <ManagerPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
