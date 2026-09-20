// RESPONSIBILITY: Renders the ManagerSalesContent sub-view extracted from ManagerSalesMain; owns only this presentation responsibility.
'use client';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerSalesAllMemberships from '@/app/manager/sales/sales_components/ManagerSalesAllMemberships/ManagerSalesAllMemberships';
import ManagerSalesMembershipReport from '@/app/manager/sales/sales_components/ManagerSalesMembershipReport/ManagerSalesMembershipReport';
import ManagerSalesOverview from '@/app/manager/sales/sales_components/ManagerSalesOverview/ManagerSalesOverview';
import ManagerSalesPendingPayments from '@/app/manager/sales/sales_components/ManagerSalesPendingPayments/ManagerSalesPendingPayments';
import ManagerSalesTabs from '@/app/manager/sales/sales_components/ManagerSalesTabs/ManagerSalesTabs';
import ManagerSalesToolbar from '@/app/manager/sales/sales_components/ManagerSalesToolbar/ManagerSalesToolbar';
import { useManagerSalesLogic  } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';


export function ManagerSalesContent() {
  const { tab, toast, showToast } = useManagerSalesLogic();

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <ManagerHeader title="Payment & Billing" subtitle="Manage all payments, dues, and receipts" />
      
      <div className="p-6 space-y-5">
        <ManagerSalesToolbar />

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <ManagerSalesTabs />

          <div className="p-5">
            {tab === 'Revenue Overview' && <ManagerSalesOverview />}
            {tab === 'Membership Report' && <ManagerSalesMembershipReport />}
            {tab === 'Pending Payments' && <ManagerSalesPendingPayments />}
            {tab === 'All Memberships' && <ManagerSalesAllMemberships />}
          </div>
        </div>
      </div>
      
      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={() => showToast('', toast.type)} />}
    </div>
  );
}
