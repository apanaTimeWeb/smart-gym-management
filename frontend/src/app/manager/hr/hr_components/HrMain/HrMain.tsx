// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { HrProvider, useHrContext } from '@/app/manager/hr/hr_context/HrContext';
import HrKPIs from '@/app/manager/hr/hr_components/HrKPIs/HrKPIs';
import HrTabs from '@/app/manager/hr/hr_components/HrTabs/HrTabs';
import StaffModal from '@/app/manager/hr/hr_components/StaffModal/StaffModal';
import PayrollModal from '@/app/manager/hr/hr_components/PayrollModal/PayrollModal';
import { HrInitialData } from '@/app/manager/hr/hr_types/hr_types';

function HrContent() {
 const { toast, hideToast } = useHrContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ManagerHeader title="HR & Payroll" subtitle="Manage gym staff, trainers, salaries and payroll" />
 <div className="p-6 space-y-5">
 <HrKPIs />
 <HrTabs />
 </div>

 <StaffModal />
 <PayrollModal />
 
 {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
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
