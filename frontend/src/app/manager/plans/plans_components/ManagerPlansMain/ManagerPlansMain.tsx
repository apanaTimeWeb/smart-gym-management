// RESPONSIBILITY: Orchestrator for the Plans module.
// DATA FLOW: PlansProvider → usePlansContext → Tabs, Toolbar, Grid, Modal
'use client';

import { PlansProvider } from '@/app/manager/plans/plans_context/ManagerPlansContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerPlansTabs from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansTabs';
import ManagerPlansRequestChangeModal from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansRequestChangeModal';

function PlansInner() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Membership / Plans" subtitle="View and manage available gym membership plans" />

      <div className="p-6 space-y-6">
        <ManagerPlansTabs />
      </div>

      <ManagerPlansRequestChangeModal />
    </div>
  );
}

export default function ManagerPlansMain() {
  return (
    <PlansProvider>
      <PlansInner />
    </PlansProvider>
  );
}
