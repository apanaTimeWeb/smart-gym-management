"use client";
// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the context provider and handles page layout.
import { HrProvider, useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import AdminHrKPIs from '@/app/admin/hr/hr_components/AdminHrKPIs/AdminHrKPIs';
import AdminHrTabs from '@/app/admin/hr/hr_components/AdminHrTabs/AdminHrTabs';
import AdminHrStaffModal from '@/app/admin/hr/hr_components/AdminHrStaffModal/AdminHrStaffModal';
import AdminHrStaffProfileModal from '@/app/admin/hr/hr_components/AdminHrStaffProfileModal/AdminHrStaffProfileModal';
import AdminHrPayrollModal from '@/app/admin/hr/hr_components/AdminHrPayrollModal/AdminHrPayrollModal';
import AdminHrPaymentModal from '@/app/admin/hr/hr_components/AdminHrPaymentModal/AdminHrPaymentModal';
import AdminHrContent from '@/app/admin/hr/hr_components/AdminHrMain/AdminHrContent';
import type { HrInitialData } from '@/app/admin/hr/hr_types/AdminHrTypes';

export default function AdminHrMain({ initialData }: { initialData?: HrInitialData | null }) {
 return (
 <HrProvider initialData={initialData}>
 <AdminHrContent />
 </HrProvider>
 );
}