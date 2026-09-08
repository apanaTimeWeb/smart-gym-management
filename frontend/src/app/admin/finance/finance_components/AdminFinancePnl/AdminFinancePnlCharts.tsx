// RESPONSIBILITY: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
// and donut (profit share by branch). Code-split via next/dynamic to avoid SSR issues.
'use client';

import dynamic from 'next/dynamic';
import type { BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';

// Lazy-load ApexCharts to prevent SSR window-is-not-defined error (Rule 15 — Lazy Loading)
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AdminFinancePnlChartsProps {
  data: BranchPnlRecord[];
}

const CHART_FONT = 'Inter, system-ui, sans-serif';

export default function AdminFinancePnlCharts({ data }: AdminFinancePnlChartsProps) {
  if (data.length === 0) return null;

  const branchNames = data.map((b) => b.branchName.split(' ').slice(0, 2).join(' '));
  const revenues    = data.map((b) => Math.round(b.revenue / 1000));    // in ₹K
  const expenses    = data.map((b) => Math.round(b.expenses / 1000));   // in ₹K
  const profits     = data.filter((b) => b.netProfit > 0).map((b) => b.netProfit);
  const profitLabels = data.filter((b) => b.netProfit > 0).map((b) => b.branchName.split(' ').slice(0, 2).join(' '));

  const barOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      bar: { columnWidth: '55%', borderRadius: 4 },
    },
    colors: ['#22C55E', '#EF4444'],
    dataLabels: { enabled: false },
    xaxis: {
      categories: branchNames,
      labels: {
        style: { colors: '#A1A1AA', fontSize: '11px' },
        rotate: -20,
      },
      axisBorder: { color: '#27272A' },
      axisTicks: { color: '#27272A' },
    },
    yaxis: {
      labels: {
        style: { colors: '#A1A1AA', fontSize: '11px' },
        formatter: (val: number) => `₹${val}K`,
      },
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#A1A1AA' },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `₹${val}K` },
    },
  };

  const barSeries = [
    { name: 'Revenue',  data: revenues  },
    { name: 'Expenses', data: expenses  },
  ];

  const donutOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: CHART_FONT,
    },
    colors: ['#FACC15', '#22C55E', '#3B82F6', '#C084FC', '#F59E0B'],
    labels: profitLabels,
    dataLabels: {
      enabled: true,
      style: { colors: ['#fff'], fontSize: '11px', fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    legend: {
      position: 'bottom',
      labels: { colors: '#A1A1AA' },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Profit',
              color: '#A1A1AA',
              fontSize: '12px',
              fontFamily: CHART_FONT,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total >= 100000 ? `₹${(total / 100000).toFixed(1)}L` : `₹${total.toLocaleString('en-IN')}`;
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          val.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
      },
    },
    stroke: { colors: ['transparent'] },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Grouped Bar Chart — Revenue vs Expenses */}
      <div className="xl:col-span-3 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-foreground mb-4">Revenue vs Expenses by Branch</p>
        <ReactApexChart
          type="bar"
          series={barSeries}
          options={barOptions}
          height={280}
        />
      </div>

      {/* Donut — Profit Share */}
      <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-foreground mb-4">Profit Share by Branch</p>
        {profits.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-sm text-secondary">
            No profitable branches in this period.
          </div>
        ) : (
          <ReactApexChart
            type="donut"
            series={profits}
            options={donutOptions}
            height={280}
          />
        )}
      </div>
    </div>
  );
}
