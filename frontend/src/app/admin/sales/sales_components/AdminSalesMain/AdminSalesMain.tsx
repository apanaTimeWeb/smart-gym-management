// RESPONSIBILITY: Provides the implementation for AdminSalesMain.tsx functionality within its module.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { SalesProvider, useSalesContext } from '@/app/admin/sales/sales_context/SalesContext';
import AdminSalesToolbar from '@/app/admin/sales/sales_components/AdminSalesToolbar/AdminSalesToolbar';
import AdminSalesTabs from '@/app/admin/sales/sales_components/AdminSalesTabs/AdminSalesTabs';
import AdminSalesOverview from '@/app/admin/sales/sales_components/AdminSalesOverview/AdminSalesOverview';
import AdminSalesMembershipReport from '@/app/admin/sales/sales_components/AdminSalesMembershipReport/AdminSalesMembershipReport';
import AdminSalesPendingPayments from '@/app/admin/sales/sales_components/AdminSalesPendingPayments/AdminSalesPendingPayments';
import AdminSalesAllMemberships from '@/app/admin/sales/sales_components/AdminSalesAllMemberships/AdminSalesAllMemberships';
import AdminSalesStoreSales from '@/app/admin/sales/sales_components/AdminSalesStoreSales/AdminSalesStoreSales';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { SalesInitialData } from '@/app/admin/sales/sales_types/sales_types';

function SalesContent() {
 const { tab, toast, showToast } = useSalesContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <AdminHeader title="Sales & Reports" subtitle="Monitor membership revenue, track payments and analyze performance" />
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
 
 {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => showToast('', toast.type)} />}
 </div>
 );
}

export default function AdminSalesMain({ initialData }: { initialData?: SalesInitialData | null }) {
 return (
 <SalesProvider initialData={initialData}>
 <SalesContent />
 </SalesProvider>
 );
}
