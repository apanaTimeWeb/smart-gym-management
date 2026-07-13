"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { HrProvider, useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import HrKPIs from '@/app/erp/hr/hr_components/HrKPIs/HrKPIs';
import HrTabs from '@/app/erp/hr/hr_components/HrTabs/HrTabs';
import StaffModal from '@/app/erp/hr/hr_components/StaffModal/StaffModal';
import PayrollModal from '@/app/erp/hr/hr_components/PayrollModal/PayrollModal';
import '@/app/erp/hr/hr.css';

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
 <PayrollModal />
 
 {toast && <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />}
 </div>
 );
}

export default function HrMain() {
 return (
 <HrProvider>
 <HrContent />
 </HrProvider>
 );
}
