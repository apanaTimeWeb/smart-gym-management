"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';
import { FinanceProvider, useFinanceContext } from '../../finance_context/FinanceContext';
import FinanceKPIs from '../FinanceKPIs/FinanceKPIs';
import RevenueByMethod from '../RevenueByMethod/RevenueByMethod';
import FinanceTabs from '../FinanceTabs/FinanceTabs';
import AddPaymentModal from '../AddPaymentModal/AddPaymentModal';
import '../../finance.css';

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

export default function FinanceMain() {
  return (
    <FinanceProvider>
      <FinanceContent />
    </FinanceProvider>
  );
}
