// RESPONSIBILITY: Provides the implementation for AdminFinanceMain.tsx functionality within its module.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { FinanceProvider, useFinanceContext } from '@/app/admin/finance/finance_context/FinanceContext';
import AdminFinanceKPIs from '@/app/admin/finance/finance_components/AdminFinanceKPIs/AdminFinanceKPIs';
import AdminFinanceRevenueByMethod from '@/app/admin/finance/finance_components/AdminFinanceRevenueByMethod/AdminFinanceRevenueByMethod';
import AdminFinanceTabs from '@/app/admin/finance/finance_components/AdminFinanceTabs/AdminFinanceTabs';
import AdminFinanceAddPaymentModal from '@/app/admin/finance/finance_components/AdminFinanceAddPaymentModal/AdminFinanceAddPaymentModal';
import type { FinanceInitialData } from '@/app/admin/finance/finance_types/finance_types';

 function FinanceContent() {
  const { toast, hideToast } = useFinanceContext();

  return (
  <div className="min-h-full pb-10 bg-background text-foreground">
  <AdminHeader title="Finance" subtitle="Track revenue, payments and financial overview" />
 <div className="p-6 space-y-5">
 <AdminFinanceKPIs />
 <AdminFinanceRevenueByMethod />
 <AdminFinanceTabs />
 </div>

 <AdminFinanceAddPaymentModal />
 
 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function AdminFinanceMain({ initialData }: { initialData?: FinanceInitialData | null }) {
  return (
 <FinanceProvider initialData={initialData}>
 <FinanceContent />
 </FinanceProvider>
 );
}
