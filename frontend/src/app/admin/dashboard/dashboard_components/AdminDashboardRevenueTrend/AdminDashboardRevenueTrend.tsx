"use client";
import { formatCurrency, formatKPI } from '@/lib/formatters';
// RESPONSIBILITY: Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62).

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_layout/admin_utils/AdminChartThemeTokens';
import { BarChart3 } from 'lucide-react';
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboardRevenueTrend() {
  const { stats } = useAdminDashboardLogic();
  if (!stats?.revenueTrend) return null;

  const months = stats.revenueTrend.map((d) => d.month);
  const revenues = stats.revenueTrend.map((d) => d.revenue);
  const profits = stats.revenueTrend.map((d) => d.profit);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0.02,
        stops: [0, 95],
      },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' },
        formatter: (v) => formatKPI(v),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (v) =>
          formatCurrency(v),
      },
    },
    legend: {
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      position: 'top',
      horizontalAlign: 'right',
    },
  };

  const series = [
    { name: 'Total Revenue', data: revenues },
    { name: 'Net Profit', data: profits },
  ];

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-success text-on-success rounded-xl">
          <BarChart3 size={18} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-primary">Revenue & Profit Trend</h2>
          <p className="text-xs text-secondary">6-month trailing performance</p>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </div>
  );
}