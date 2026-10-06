// RESPONSIBILITY: Renders the HR module's main content surface inside HrProvider.
"use client";
import AdminHrKPIs from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_kpis/AdminHrKPIs';
import AdminHrTabs from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_tabs/AdminHrTabs';
import AdminHrStaffModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_modal/AdminHrStaffModal';
import AdminHrStaffProfileModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_profile_modal/AdminHrStaffProfileModal';
import AdminHrPayrollModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payroll_modal/AdminHrPayrollModal';
import AdminHrPaymentModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payment_modal/AdminHrPaymentModal';

/**
 * AdminHrContent renders the admin hr content UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrContent: Renders the HR module's main content surface inside HrProvider.
 * @dependencies Consumes AdminHrKPIs, AdminHrTabs, AdminHrStaffModal, AdminHrStaffProfileModal, AdminHrPayrollModal.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
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
