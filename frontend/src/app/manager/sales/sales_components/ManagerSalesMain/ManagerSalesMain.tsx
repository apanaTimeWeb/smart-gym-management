// RESPONSIBILITY: Provides the implementation for ManagerSalesMain.tsx functionality within its module.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { SalesProvider, useSalesContext } from '@/app/manager/sales/sales_context/SalesContext';
import ManagerSalesToolbar from '@/app/manager/sales/sales_components/ManagerSalesToolbar/ManagerSalesToolbar';
import ManagerSalesTabs from '@/app/manager/sales/sales_components/ManagerSalesTabs/ManagerSalesTabs';
import ManagerSalesOverview from '@/app/manager/sales/sales_components/ManagerSalesOverview/ManagerSalesOverview';
import ManagerSalesMembershipReport from '@/app/manager/sales/sales_components/ManagerSalesMembershipReport/ManagerSalesMembershipReport';
import ManagerSalesPendingPayments from '@/app/manager/sales/sales_components/ManagerSalesPendingPayments/ManagerSalesPendingPayments';
import ManagerSalesAllMemberships from '@/app/manager/sales/sales_components/ManagerSalesAllMemberships/ManagerSalesAllMemberships';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { SalesInitialData } from '@/app/manager/sales/sales_types/sales_types';

function SalesContent() {
 const { tab, toast, showToast } = useSalesContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ManagerHeader title="Sales & Reports" subtitle="Monitor membership revenue, track payments and analyze performance" />
 <div className="p-6 space-y-5">
 <ManagerSalesToolbar />

 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
 <ManagerSalesTabs />

 <div className="p-5">
 {tab === 'Overview' && <ManagerSalesOverview />}
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

export default function ManagerSalesMain({ initialData }: { initialData?: SalesInitialData | null }) {
 return (
 <SalesProvider initialData={initialData}>
 <SalesContent />
 </SalesProvider>
 );
}
