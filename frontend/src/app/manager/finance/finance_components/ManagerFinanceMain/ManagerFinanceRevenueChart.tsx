// RESPONSIBILITY: Renders the Manager FinanceRevenueChart presentation layer for the Manager module.
'use client';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ManagerFinanceMethodBreakdown } from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceMethodBreakdown/ManagerFinanceMethodBreakdown';
import { ManagerFinanceRevenueExpenseChart } from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceRevenueExpenseChart/ManagerFinanceRevenueExpenseChart';
import { useManagerFinanceLogic } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });



const METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI:        { bg: "bg-primary-subtle",   text: 'text-primary'   },
  Cash:       { bg: "bg-success-bg",   text: 'text-success'   },
  Card:       { bg: "bg-warning-bg",   text: 'text-warning'   },
  NetBanking: { bg: 'bg-input', text: 'text-secondary' } };

export default function ManagerFinanceRevenueChart() {
  const { summary } = useManagerFinanceLogic();

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-7 h-7 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <ManagerFinanceRevenueExpenseChart data={summary.monthlyData ?? []} />
      <ManagerFinanceMethodBreakdown data={summary.revenueByMethod} />
    </>
  );
}
