// RESPONSIBILITY: Provides the implementation for FinanceMain.tsx functionality within its module.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { FinanceProvider, useFinanceContext } from '@/app/admin/finance/finance_context/FinanceContext';
import FinanceKPIs from '@/app/admin/finance/finance_components/FinanceKPIs/FinanceKPIs';
import RevenueByMethod from '@/app/admin/finance/finance_components/RevenueByMethod/RevenueByMethod';
import FinanceTabs from '@/app/admin/finance/finance_components/FinanceTabs/FinanceTabs';
import AddPaymentModal from '@/app/admin/finance/finance_components/AddPaymentModal/AddPaymentModal';
import { FinanceInitialData } from '@/app/admin/finance/finance_types/finance_types';

 function FinanceContent() {
  const { toast, hideToast } = useFinanceContext();

  return (
  <div className="min-h-full pb-10 bg-background text-foreground">
  <AdminHeader title="Finance" subtitle="Track revenue, payments and financial overview" />
 <div className="p-6 space-y-5">
 <FinanceKPIs />
 <RevenueByMethod />
 <FinanceTabs />
 </div>

 <AddPaymentModal />
 
 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function FinanceMain({ initialData }: { initialData?: FinanceInitialData | null }) {
  return (
 <FinanceProvider initialData={initialData}>
 <FinanceContent />
 </FinanceProvider>
 );
}
