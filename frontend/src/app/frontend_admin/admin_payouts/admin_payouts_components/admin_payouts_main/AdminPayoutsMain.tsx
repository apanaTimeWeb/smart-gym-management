// RESPONSIBILITY: Main entry point for the Payouts module.
"use client";
import AdminPayoutsKPIs from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_kpis/AdminPayoutsKPIs';
import AdminPayoutsTabs from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_tabs/AdminPayoutsTabs';
import AdminPayoutsSummaryTable from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_summary_table/AdminPayoutsSummaryTable';
import AdminPayoutsPnLStatement from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_pnl_statement/AdminPayoutsPnLStatement';
import { PAYOUT_TAB_OPTIONS } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';

/**
 * AdminPayoutsMain renders the admin payouts main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsMain: Main entry point for the Payouts module.
 * @dependencies Consumes AdminPayoutsKPIs, AdminPayoutsTabs, AdminPayoutsSummaryTable, AdminPayoutsPnLStatement, useAdminPayoutsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsMain() {
  const { activeTab } = useAdminPayoutsLogic();
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminPayoutsKPIs />
        <AdminPayoutsTabs />
        {activeTab === PAYOUT_TAB_OPTIONS[0].id ? <AdminPayoutsSummaryTable /> : <AdminPayoutsPnLStatement />}
      </div>
    </div>
  );
}