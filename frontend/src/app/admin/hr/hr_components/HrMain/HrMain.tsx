// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the context provider and handles page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { HrProvider, useHrContext } from '@/app/admin/hr/hr_context/HrContext';
import HrKPIs from '@/app/admin/hr/hr_components/HrKPIs/HrKPIs';
import HrTabs from '@/app/admin/hr/hr_components/HrTabs/HrTabs';
import StaffModal from '@/app/admin/hr/hr_components/StaffModal/StaffModal';
import PayrollModal from '@/app/admin/hr/hr_components/PayrollModal/PayrollModal';
import { HrInitialData } from '@/app/admin/hr/hr_types/hr_types';

function HrContent() {
 const { toast, hideToast } = useHrContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <AdminHeader title="HR & Payroll" subtitle="Manage gym staff, trainers, salaries and payroll" />
 <div className="p-6 space-y-5">
 <HrKPIs />
 <HrTabs />
 </div>

 <StaffModal />
 <PayrollModal />
 
 {toast && <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />}
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
