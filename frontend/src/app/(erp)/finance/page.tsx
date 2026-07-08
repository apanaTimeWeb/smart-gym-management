"use client";

import Header from '@/components/Header';
import Toast from '@/components/Toast';
import { FinanceProvider, useFinanceContext } from './finance_context/FinanceContext';
import FinanceKPIs from './finance_components/FinanceKPIs/FinanceKPIs';
import RevenueByMethod from './finance_components/RevenueByMethod/RevenueByMethod';
import FinanceTabs from './finance_components/FinanceTabs/FinanceTabs';
import AddPaymentModal from './finance_components/AddPaymentModal/AddPaymentModal';
import './finance.css';

function FinanceContent() {
  const { toast, hideToast } = useFinanceContext();

  return (
    <div className="min-h-full pb-10 finance-module">
      <Header title="Finance" subtitle="Track revenue, payments and financial overview" />
      <div className="p-6 space-y-5">
        <FinanceKPIs />
        <RevenueByMethod />
        <FinanceTabs />
      </div>

      <AddPaymentModal />
      
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default function Finance() {
  return (
    <FinanceProvider>
      <FinanceContent />
    </FinanceProvider>
  );
}
