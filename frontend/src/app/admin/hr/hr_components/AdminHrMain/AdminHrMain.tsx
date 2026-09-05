// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the context provider and handles page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { HrProvider, useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import AdminHrKPIs from '@/app/admin/hr/hr_components/AdminHrKPIs/AdminHrKPIs';
import AdminHrTabs from '@/app/admin/hr/hr_components/AdminHrTabs/AdminHrTabs';
import AdminHrStaffModal from '@/app/admin/hr/hr_components/AdminHrStaffModal/AdminHrStaffModal';
import AdminHrPayrollModal from '@/app/admin/hr/hr_components/AdminHrPayrollModal/AdminHrPayrollModal';
import type { HrInitialData } from '@/app/admin/hr/hr_types/AdminHrTypes';

function HrContent() {
 const { toast, hideToast } = useHrContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <AdminHeader title="HR & Payroll" subtitle="Manage gym staff, trainers, salaries and payroll" />
 <div className="p-6 space-y-5">
 <AdminHrKPIs />
 <AdminHrTabs />
 </div>

 <AdminHrStaffModal />
 <AdminHrPayrollModal />
 
 {toast && <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />}
 </div>
 );
}

export default function AdminHrMain({ initialData }: { initialData?: HrInitialData | null }) {
 return (
 <HrProvider initialData={initialData}>
 <HrContent />
 </HrProvider>
 );
}
