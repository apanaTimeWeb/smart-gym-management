"use client";
// RESPONSIBILITY: Renders the HR module's main content surface inside HrProvider.
import AdminHrKPIs from '@/app/admin/hr/hr_components/AdminHrKPIs/AdminHrKPIs';
import AdminHrTabs from '@/app/admin/hr/hr_components/AdminHrTabs/AdminHrTabs';
import AdminHrStaffModal from '@/app/admin/hr/hr_components/AdminHrStaffModal/AdminHrStaffModal';
import AdminHrStaffProfileModal from '@/app/admin/hr/hr_components/AdminHrStaffProfileModal/AdminHrStaffProfileModal';
import AdminHrPayrollModal from '@/app/admin/hr/hr_components/AdminHrPayrollModal/AdminHrPayrollModal';
import AdminHrPaymentModal from '@/app/admin/hr/hr_components/AdminHrPaymentModal/AdminHrPaymentModal';

export default function AdminHrContent() {
  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <AdminHrKPIs />
        <AdminHrTabs />
      </div>
      <AdminHrStaffModal />
      <AdminHrStaffProfileModal />
      <AdminHrPayrollModal />
      <AdminHrPaymentModal />
    </div>
  );
}
