// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { HrProvider, useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import ManagerHrKPIs from '@/app/manager/hr/hr_components/ManagerHrKPIs/ManagerHrKPIs';
import ManagerHrTabs from '@/app/manager/hr/hr_components/ManagerHrTabs/ManagerHrTabs';
import ManagerHrStaffModal from '@/app/manager/hr/hr_components/ManagerHrStaffModal/ManagerHrStaffModal';
import ManagerHrPayrollModal from '@/app/manager/hr/hr_components/ManagerHrPayrollModal/ManagerHrPayrollModal';
import type { HrInitialData } from '@/app/manager/hr/hr_types/ManagerHrTypes';

function HrContent() {
 const { toast, hideToast } = useHrContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ManagerHeader title="HR & Payroll" subtitle="Manage gym staff, trainers, salaries and payroll" />
 <div className="p-6 space-y-5">
 <ManagerHrKPIs />
 <ManagerHrTabs />
 </div>

 <ManagerHrStaffModal />
 <ManagerHrPayrollModal />
 
 {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
 </div>
 );
}

export default function ManagerHrMain({ initialData }: { initialData?: HrInitialData | null }) {
 return (
 <HrProvider initialData={initialData}>
 <HrContent />
 </HrProvider>
 );
}
