"use client";

import Header from '@/components/Header';
import Toast from '@/components/Toast';
import { HrProvider, useHrContext } from './hr_context/HrContext';
import HrKPIs from './hr_components/HrKPIs/HrKPIs';
import HrTabs from './hr_components/HrTabs/HrTabs';
import StaffModal from './hr_components/StaffModal/StaffModal';
import './hr.css';

function HrContent() {
  const { toast, hideToast } = useHrContext();

  return (
    <div className="min-h-full pb-10 hr-module">
      <Header title="HR Management" subtitle="Manage staff, shifts, and payroll" />
      <div className="p-6 space-y-5">
        <HrKPIs />
        <HrTabs />
      </div>

      <StaffModal />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
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
