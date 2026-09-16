"use client";
import { formatKPI, formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
// and donut (profit share by branch). Code-split via next/dynamic to avoid SSR issues.

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_utils/AdminChartThemeTokens';
import type { BranchPnlRecord } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

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
    colors: [ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.danger],
    dataLabels: { enabled: false },
    xaxis: {
      categories: branchNames,
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        rotate: -20,
      },
      axisBorder: { color: ADMIN_CHART_THEME.border },
      axisTicks: { color: ADMIN_CHART_THEME.border },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        formatter: (val: number) => formatKPI(val * 1000),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => formatKPI(val * 1000) },
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
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.info, ADMIN_CHART_THEME.warning, ADMIN_CHART_THEME.warning],
    labels: profitLabels,
    dataLabels: {
      enabled: true,
      style: { colors: [ADMIN_CHART_THEME.textPrimary], fontSize: '11px', fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    legend: {
      position: 'bottom',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
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
              color: ADMIN_CHART_THEME.textSecondary,
              fontSize: '12px',
              fontFamily: CHART_FONT,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total >= 100000 ? formatKPI(total) : formatCurrency(total);
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
          formatCurrency(val),
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