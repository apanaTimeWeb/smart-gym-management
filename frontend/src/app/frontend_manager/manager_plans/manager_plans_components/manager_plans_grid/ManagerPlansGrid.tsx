// RESPONSIBILITY: Renders ManagerPlansGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerPlansEmptyState from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_empty_state/ManagerPlansEmptyState';
import ManagerPlansPlanCard from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_plan_card/ManagerPlansPlanCard';
import { useManagerPlansLogic } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansLogic';


/** @description Renders the ManagerPlansGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state. */
export default function ManagerPlansGrid() {
  const t = useTranslations('MANAGER_PLANS');
  const { filteredPlans, isPending, isError, errorMessage, search } = useManagerPlansLogic();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={`plan-skeleton-${i}`} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
      </div>
    );
  }

  if (filteredPlans.length === 0) { return <ManagerPlansEmptyState />; }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredPlans.map(plan => (
        <ManagerPlansPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
