"use client";
// RESPONSIBILITY: Provides the implementation for AdminSalesMain.tsx functionality within its module.
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import { useAdminSalesStore } from '@/app/admin/sales/sales_store/useAdminSalesStore';
import AdminSalesToolbar from '@/app/admin/sales/sales_components/AdminSalesToolbar/AdminSalesToolbar';
import AdminSalesTabs from '@/app/admin/sales/sales_components/AdminSalesTabs/AdminSalesTabs';
import AdminSalesOverview from '@/app/admin/sales/sales_components/AdminSalesOverview/AdminSalesOverview';
import AdminSalesMembershipReport from '@/app/admin/sales/sales_components/AdminSalesMembershipReport/AdminSalesMembershipReport';
import AdminSalesPendingPayments from '@/app/admin/sales/sales_components/AdminSalesPendingPayments/AdminSalesPendingPayments';
import AdminSalesAllMemberships from '@/app/admin/sales/sales_components/AdminSalesAllMemberships/AdminSalesAllMemberships';
import AdminSalesStoreSales from '@/app/admin/sales/sales_components/AdminSalesStoreSales/AdminSalesStoreSales';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import type { SalesInitialData } from '@/app/admin/sales/sales_types/AdminSalesTypes';

export default function AdminSalesMain({ initialData }: { initialData?: SalesInitialData | null }) {
  const { tab } = useAdminSalesLogic(initialData);


  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
      <div className="p-6 space-y-5">
        <AdminSalesToolbar />

        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <AdminSalesTabs />

          <div className="p-5">
            {tab === 'Overview' && <AdminSalesOverview />}
            {tab === 'Membership Report' && <AdminSalesMembershipReport />}
            {tab === 'Pending Payments' && <AdminSalesPendingPayments />}
            {tab === 'All Memberships' && <AdminSalesAllMemberships />}
            {tab === 'Store Sales' && <AdminSalesStoreSales />}
          </div>
        </div>
      </div>
      

    </div>
  );
}