// RESPONSIBILITY: HrMain.tsx handles the logic and UI for its corresponding feature.
'use client';

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { HrProvider, useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import HrKPIs from '@/app/erp/hr/hr_components/HrKPIs/HrKPIs';
import HrTabs from '@/app/erp/hr/hr_components/HrTabs/HrTabs';
import StaffModal from '@/app/erp/hr/hr_components/StaffModal/StaffModal';
import PayrollModal from '@/app/erp/hr/hr_components/PayrollModal/PayrollModal';
import { HrInitialData } from '@/app/erp/hr/hr_types/hr_types';

function HrContent() {
 const { toast, hideToast } = useHrContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ErpHeader title="HR & Payroll" subtitle="Manage gym staff, trainers, salaries and payroll" />
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

export default function HrMain({ initialData }: { initialData?: HrInitialData | null }) {
 return (
 <HrProvider initialData={initialData}>
 <HrContent />
 </HrProvider>
 );
}
