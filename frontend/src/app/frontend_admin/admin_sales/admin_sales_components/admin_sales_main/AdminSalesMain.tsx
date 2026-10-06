// RESPONSIBILITY: Provides the implementation for AdminSalesMain.tsx functionality within its module.
"use client";
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';
import AdminSalesToolbar from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_toolbar/AdminSalesToolbar';
import AdminSalesTabs from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_tabs/AdminSalesTabs';
import AdminSalesOverview from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_overview/AdminSalesOverview';
import AdminSalesMembershipReport from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_membership_report/AdminSalesMembershipReport';
import AdminSalesPendingPayments from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_pending_payments/AdminSalesPendingPayments';
import AdminSalesAllMemberships from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_all_memberships/AdminSalesAllMemberships';
import AdminSalesStoreSales from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_store_sales/AdminSalesStoreSales';

/**
 * AdminSalesMain renders the admin sales main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesMain: Provides the implementation for AdminSalesMain.tsx functionality within its module.
 * @dependencies Consumes useAdminSalesLogic, AdminSalesToolbar, AdminSalesTabs, AdminSalesOverview, AdminSalesMembershipReport.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesMain() {
  const { tab } = useAdminSalesLogic();


  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <AdminSalesToolbar />

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <AdminSalesTabs />

          <div className="p-5">
            {tab === 'overview' && <AdminSalesOverview />}
            {tab === 'membership_report' && <AdminSalesMembershipReport />}
            {tab === 'pending_payments' && <AdminSalesPendingPayments />}
            {tab === 'all_memberships' && <AdminSalesAllMemberships />}
            {tab === 'store_sales' && <AdminSalesStoreSales />}
          </div>
        </div>
      </div>
      

    </div>
  );
}