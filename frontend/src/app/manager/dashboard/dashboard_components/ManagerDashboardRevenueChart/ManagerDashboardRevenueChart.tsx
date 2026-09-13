'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/useManagerDashboardQueries';
import { useManagerDashboardStore } from '@/app/manager/dashboard/dashboard_store/useManagerDashboardStore';
import { formatCurrency, formatKPI } from '@/lib/formatters';
import { Loader2 } from 'lucide-react';
import type { DashboardRevenueChartData } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" /></div>,
});

export default function ManagerDashboardRevenueChart() {
  const { timeRange } = useManagerDashboardStore();
  const { data: stats } = useDashboardStatsQuery(timeRange);
  
  if (!stats?.revenueChart || stats.revenueChart.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No revenue data available.</p>
      </div>
    );
  }

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#22c55e'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0, stops: [0, 90, 100] }
    },
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => formatCurrency(v) } },
    xaxis: {
      categories: stats.revenueChart.map((d: DashboardRevenueChartData) => d.month),
      labels: { style: { colors: '#A1A1AA', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: '#A1A1AA', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    dataLabels: { enabled: false },
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-4">Revenue Trends</h3>
      <div className="flex-1 w-full h-[220px]">
        <Chart
          type="area"
          height={220}
          options={options}
          series={[
            { name: 'Revenue', data: stats.revenueChart.map((d: DashboardRevenueChartData) => d.revenue || 0) },
          ]}
        />
      </div>
    </div>
  );
}
