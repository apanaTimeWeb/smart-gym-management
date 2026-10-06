// RESPONSIBILITY: Renders ManagerHrContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerHrKPIs from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_kpis/ManagerHrKPIs';
import ManagerHrPaymentModal from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_payment_modal/ManagerHrPaymentModal';
import ManagerHrPayrollModal from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_payroll_modal/ManagerHrPayrollModal';
import ManagerHrStaffModal from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_staff_modal/ManagerHrStaffModal';
import ManagerHrStaffProfileModal from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_staff_profile_modal/ManagerHrStaffProfileModal';
import ManagerHrTabs from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_tabs/ManagerHrTabs';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';


/** @description Renders the ManagerHrContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerHrContent() {
  const t = useTranslations('MANAGER_HR');

  const { toast, hideToast } = useManagerHrLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_hr-managerhrcontent-managerheader-1" title={t("COPY_TRAINER_MANAGEMENT")} subtitle={t("COPY_MANAGE_GYM_TRAINERS_PERFORMANCE")} />
      <div className="p-6 space-y-5">
        <ManagerHrKPIs />
        <ManagerHrTabs  data-testid="manager_hr-managerhrcontent-hr-tabs-1"/>
      </div>

      <ManagerHrStaffModal />
      <ManagerHrStaffProfileModal />
      <ManagerHrPayrollModal />
      <ManagerHrPaymentModal />

      {toast && <ManagerToast data-testid="manager_hr-managerhrcontent-managertoast-2" message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
