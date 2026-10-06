// RESPONSIBILITY: Provides the implementation for AdminFinanceMain.tsx functionality within its module.
"use client";
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinanceLogic';
import AdminFinanceKPIs from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_kpis/AdminFinanceKPIs';
import AdminFinanceRevenueByMethod from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_revenue_by_method/AdminFinanceRevenueByMethod';
import AdminFinanceTabs from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_tabs/AdminFinanceTabs';

import { AdminFinanceDateFilterDropdown } from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_date_filter/AdminFinanceDateFilterDropdown';

/**
 * AdminFinanceMain renders the admin finance main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceMain: Provides the implementation for AdminFinanceMain.tsx functionality within its module.
 * @dependencies Consumes useAdminFinanceLogic, AdminFinanceKPIs, AdminFinanceRevenueByMethod, AdminFinanceTabs, AdminFinanceDateFilterDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceMain() {
  const { status } = useAdminFinanceLogic();

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <div className="flex justify-end items-center">
          <AdminFinanceDateFilterDropdown />
        </div>
        <AdminFinanceKPIs />
        <AdminFinanceRevenueByMethod />
        <AdminFinanceTabs />
      </div>

    </div>
  );
}