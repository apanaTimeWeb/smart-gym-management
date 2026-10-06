// RESPONSIBILITY: Entry component for the HR module. Delegates UI composition to the module content view while business state stays in Zustand and TanStack Query hooks.
"use client";
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import AdminHrKPIs from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_kpis/AdminHrKPIs';
import AdminHrTabs from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_tabs/AdminHrTabs';
import AdminHrStaffModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_modal/AdminHrStaffModal';
import AdminHrStaffProfileModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_profile_modal/AdminHrStaffProfileModal';
import AdminHrPayrollModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payroll_modal/AdminHrPayrollModal';
import AdminHrPaymentModal from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payment_modal/AdminHrPaymentModal';
import AdminHrContent from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_main/AdminHrContent';

/**
 * AdminHrMain renders the admin hr main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrMain: Entry component for the HR module. Delegates UI composition to the module content view while business state stays in Zustand and TanStack Query hooks.
 * @dependencies Consumes AdminHrContent and module-local state/query hooks through its child view tree.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrMain() {
 return <AdminHrContent />;
}