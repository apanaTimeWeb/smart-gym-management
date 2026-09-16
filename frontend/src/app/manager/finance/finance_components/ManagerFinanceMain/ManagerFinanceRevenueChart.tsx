'use client';
// RESPONSIBILITY: Renders the Manager FinanceRevenueChart presentation layer for the Manager module.
import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useFinanceContext } from '@/app/manager/finance/finance_context/ManagerFinanceContext';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" /></div>,
});

import { formatCurrency, formatKPI } from '@/lib/formatters';

const METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI:        { bg: 'bg-primary/10',   text: 'text-primary'   },
  Cash:       { bg: 'bg-success/10',   text: 'text-success'   },
  Card:       { bg: 'bg-warning/10',   text: 'text-warning'   },
  NetBanking: { bg: 'bg-secondary/10', text: 'text-secondary' },
};

function RevenueExpenseChart({ data }: { data: { month: string; revenue: number; expenses?: number }[] }) {
  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--warning)', 'var(--danger)'],
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: data.map(d => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { enabled: false },
  };
  
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-sm font-semibold text-foreground mb-2">Revenue vs Expenses</p>
      <Chart
        type="bar"
        height={280}
        options={options}
        series={[
          { name: 'Revenue',  data: data.map(d => d.revenue) },
          { name: 'Expenses', data: data.map(d => d.expenses ?? 0) },
        ]}
      />
    </div>
  );
}

function MethodBreakdown({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <p className="text-sm font-semibold text-foreground">Revenue by Method</p>
      {Object.entries(data).map(([method, amount]) => {
        const pct = Math.round((amount / total) * 100);
        const s = METHOD_STYLES[method] ?? { bg: 'bg-input', text: 'text-secondary' };
        return (
          <div key={method} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className={`font-semibold ${s.text}`}>{method}</span>
              <span className="text-secondary">{formatCurrency(amount)} ({pct}%)</span>
            </div>
            <div className="h-2 bg-input rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.bg.replace('/10', '')} motion-safe:transition-all motion-safe:duration-500`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ManagerFinanceRevenueChart() {
  const { summary } = useFinanceContext();

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-7 h-7 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <RevenueExpenseChart data={summary.monthlyData ?? []} />
      <MethodBreakdown data={summary.revenueByMethod} />
    </>
  );
}
