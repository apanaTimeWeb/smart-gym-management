"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpFeedback/ErpToast';
import { FinanceProvider, useFinanceContext } from '@/app/(erp)/finance/finance_context/FinanceContext';
import FinanceKPIs from '@/app/(erp)/finance/finance_components/FinanceKPIs/FinanceKPIs';
import RevenueByMethod from '@/app/(erp)/finance/finance_components/RevenueByMethod/RevenueByMethod';
import FinanceTabs from '@/app/(erp)/finance/finance_components/FinanceTabs/FinanceTabs';
import AddPaymentModal from '@/app/(erp)/finance/finance_components/AddPaymentModal/AddPaymentModal';
import '@/app/(erp)/finance/finance.css';

function FinanceContent() {
 const { toast, hideToast } = useFinanceContext();

 return (
 <div className="min-h-full pb-10 finance-module">
 <ErpHeader title="Finance" subtitle="Track revenue, payments and financial overview" />
 <div className="p-6 space-y-5">
 <FinanceKPIs />
 <RevenueByMethod />
 <FinanceTabs />
 </div>

 <AddPaymentModal />
 
 {toast && (
 <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function FinanceMain({ initialData }: { initialData?: any }) {
 return (
 <FinanceProvider initialData={initialData}>
 <FinanceContent />
 </FinanceProvider>
 );
}
