// RESPONSIBILITY: Renders the grid of plans or loading/empty states.
import { IndianRupee } from 'lucide-react';
import ManagerPlanCard from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlanCard';
import { usePlansContext } from '@/app/manager/plans/plans_context/ManagerPlansContext';

export default function ManagerPlansGrid() {
  const { filteredPlans, fetchState, search } = usePlansContext();

  if (fetchState === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={`plan-skeleton-${i}`} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm text-danger font-medium">Failed to load plans</p>
      </div>
    );
  }

  if (filteredPlans.length === 0) {
    return (
      <div className="py-16 text-center space-y-2">
        <IndianRupee size={36} className="mx-auto text-secondary opacity-40" />
        <p className="text-sm text-secondary font-medium">
          {search ? `No plans found for "${search}"` : 'No plans available'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredPlans.map(plan => (
        <ManagerPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
