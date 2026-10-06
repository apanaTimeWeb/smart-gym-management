// RESPONSIBILITY: Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal.
"use client";
import AdminCouponsKPIs from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_kpis/AdminCouponsKPIs';
import AdminCouponsToolbar from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_toolbar/AdminCouponsToolbar';
import AdminCouponsTable from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_table/AdminCouponsTable';
import AdminCouponsModal from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_modal/AdminCouponsModal';

/**
 * AdminCouponsMain renders the admin coupons main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCouponsMain: Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal.
 * @dependencies Consumes AdminCouponsKPIs, AdminCouponsToolbar, AdminCouponsTable, AdminCouponsModal.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCouponsMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminCouponsKPIs />
        <AdminCouponsToolbar />
        <AdminCouponsTable />
      </div>
      <AdminCouponsModal />
    </div>
  );
}