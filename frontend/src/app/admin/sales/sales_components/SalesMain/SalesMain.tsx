// RESPONSIBILITY: Provides the implementation for SalesMain.tsx functionality within its module.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { SalesProvider, useSalesContext } from '@/app/admin/sales/sales_context/SalesContext';
import SalesToolbar from '@/app/admin/sales/sales_components/SalesToolbar/SalesToolbar';
import SalesTabs from '@/app/admin/sales/sales_components/SalesTabs/SalesTabs';
import SalesOverview from '@/app/admin/sales/sales_components/SalesOverview/SalesOverview';
import MembershipReport from '@/app/admin/sales/sales_components/MembershipReport/MembershipReport';
import PendingPayments from '@/app/admin/sales/sales_components/PendingPayments/PendingPayments';
import AllMemberships from '@/app/admin/sales/sales_components/AllMemberships/AllMemberships';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { SalesInitialData } from '@/app/admin/sales/sales_types/sales_types';

function SalesContent() {
 const { tab, toast, showToast } = useSalesContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <AdminHeader title="Sales & Reports" subtitle="Monitor membership revenue, track payments and analyze performance" />
 <div className="p-6 space-y-5">
 <SalesToolbar />

 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
 <SalesTabs />

 <div className="p-5">
 {tab === 'Overview' && <SalesOverview />}
 {tab === 'Membership Report' && <MembershipReport />}
 {tab === 'Pending Payments' && <PendingPayments />}
 {tab === 'All Memberships' && <AllMemberships />}
 </div>
 </div>
 </div>
 
 {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => showToast('', toast.type)} />}
 </div>
 );
}

export default function SalesMain({ initialData }: { initialData?: SalesInitialData | null }) {
 return (
 <SalesProvider initialData={initialData}>
 <SalesContent />
 </SalesProvider>
 );
}
