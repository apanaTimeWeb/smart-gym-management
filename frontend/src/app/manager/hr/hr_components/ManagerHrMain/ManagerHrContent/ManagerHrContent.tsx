// RESPONSIBILITY: Renders the ManagerHrContent sub-view extracted from ManagerHrMain; owns only this presentation responsibility.
'use client';
import ManagerHrKPIs from '@/app/manager/hr/hr_components/ManagerHrKPIs/ManagerHrKPIs';
import ManagerHrPaymentModal from '@/app/manager/hr/hr_components/ManagerHrPaymentModal/ManagerHrPaymentModal';
import ManagerHrPayrollModal from '@/app/manager/hr/hr_components/ManagerHrPayrollModal/ManagerHrPayrollModal';
import ManagerHrStaffModal from '@/app/manager/hr/hr_components/ManagerHrStaffModal/ManagerHrStaffModal';
import ManagerHrStaffProfileModal from '@/app/manager/hr/hr_components/ManagerHrStaffProfileModal/ManagerHrStaffProfileModal';
import ManagerHrTabs from '@/app/manager/hr/hr_components/ManagerHrTabs/ManagerHrTabs';
import { useManagerHrLogic  } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';


export function ManagerHrContent() {
  const { toast, hideToast } = useManagerHrLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Trainer Management" subtitle="Manage gym trainers and performance" />
      <div className="p-6 space-y-5">
        <ManagerHrKPIs />
        <ManagerHrTabs />
      </div>

      <ManagerHrStaffModal />
      <ManagerHrStaffProfileModal />
      <ManagerHrPayrollModal />
      <ManagerHrPaymentModal />

      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
