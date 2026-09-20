// RESPONSIBILITY: Renders the ManagerPlansContent sub-view extracted from ManagerPlansMain; owns only this presentation responsibility.
'use client';
// DATA FLOW:  → useManagerPlansLogic → Tabs, Toolbar, Grid, Modal
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerPlansRequestChangeModal from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansRequestChangeModal';
import ManagerPlansTabs from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansTabs';


export function ManagerPlansContent() {
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
