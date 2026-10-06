// RESPONSIBILITY: Renders ManagerSalesContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerSalesAllMemberships from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_all_memberships/ManagerSalesAllMemberships';
import ManagerSalesMembershipReport from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_membership_report/ManagerSalesMembershipReport';
import ManagerSalesOverview from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_overview/ManagerSalesOverview';
import ManagerSalesPendingPayments from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_pending_payments/ManagerSalesPendingPayments';
import ManagerSalesTabs from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_tabs/ManagerSalesTabs';
import ManagerSalesToolbar from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_toolbar/ManagerSalesToolbar';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';


/** @description Renders the ManagerSalesContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerSalesContent() {
  const t = useTranslations('MANAGER_SALES');

  const { tab, toast, showToast } = useManagerSalesLogic();

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <ManagerHeader data-testid="manager_sales-managersalescontent-managerheader-1" title={t("COPY_PAYMENT_BILLING")} subtitle={t("COPY_MANAGE_ALL_PAYMENTS_DUES_RECEIPTS")} />
      
      <div className="p-6 space-y-5">
        <ManagerSalesToolbar />

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <ManagerSalesTabs  data-testid="manager_sales-managersalescontent-sales-tabs-1"/>

          <div className="p-5">
            {tab === 'Revenue Overview' && <ManagerSalesOverview />}
            {tab === 'Membership Report' && <ManagerSalesMembershipReport />}
            {tab === 'Pending Payments' && <ManagerSalesPendingPayments />}
            {tab === 'All Memberships' && <ManagerSalesAllMemberships />}
          </div>
        </div>
      </div>
      
      {toast && <ManagerToast data-testid="manager_sales-managersalescontent-managertoast-2" message={toast.message} type={toast.type} onClose={() => showToast('', toast.type)} />}
    </div>
  );
}
