"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast, { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { HrProvider, useHrContext } from './hr_context/HrContext';
import HrKPIs from './hr_components/HrKPIs/HrKPIs';
import HrTabs from './hr_components/HrTabs/HrTabs';
import StaffModal from './hr_components/StaffModal/StaffModal';
import './hr.css';

function HrContent() {
  const { toast, hideToast } = useHrContext();

  return (
    <div className="min-h-full pb-10 hr-module">
      <ErpHeader title="HR Management" subtitle="Manage staff, shifts, and payroll" />
      <div className="p-6 space-y-5">
        <HrKPIs />
        <HrTabs />
      </div>

      <StaffModal />
      
      {toast && <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

export default function HR() {
  return (
    <HrProvider>
      <HrContent />
    </HrProvider>
  );
}
