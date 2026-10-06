// RESPONSIBILITY: Renders ManagerPlansContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerPlansRequestChangeModal from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_request_change_modal/ManagerPlansRequestChangeModal';
import ManagerPlansTabs from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_tabs/ManagerPlansTabs';


/** @description Renders the ManagerPlansContent component for its owning Manager frontend boundary. @dependencies Data flow: → useManagerPlansLogic → Tabs, Toolbar, Grid, Modal. @edge-case Preserves modal lifecycle. */
export function ManagerPlansContent() {
  const t = useTranslations('MANAGER_PLANS');

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_plans-managerplanscontent-managerheader-1" title={t("COPY_MEMBERSHIP_PLANS")} subtitle={t("COPY_VIEW_MANAGE_AVAILABLE_GYM_MEMBERSHIP_PLANS")} />

      <div className="p-6 space-y-6">
        <ManagerPlansTabs  data-testid="manager_plans-managerplanscontent-plans-tabs-1"/>
      </div>

      <ManagerPlansRequestChangeModal />
    </div>
  );
}
