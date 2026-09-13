'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSalesContext } from '@/app/manager/sales/sales_context/ManagerSalesContext';
import { formatCurrency, formatKPI } from '@/lib/formatters';
import { Loader2 } from 'lucide-react';
import type { OverviewDataPoint } from '@/app/manager/sales/sales_types/ManagerSalesTypes';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" /></div>,
});

export default function ManagerSalesOverview() {
  const { overviewData, fetchState } = useSalesContext();

  if (fetchState === 'loading') {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">Failed to load sales overview.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  const revenueOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', stacked: true },
    colors: ['#4F46E5', '#10B981'],
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => formatCurrency(v) } },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: '#A1A1AA', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: '#A1A1AA', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    legend: { labels: { colors: '#A1A1AA' }, position: 'top' as const },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
  };

  const membersOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#F43F5E'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] }
    },
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: '#A1A1AA', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: '#A1A1AA', fontSize: '11px' } } },
    dataLabels: { enabled: false },
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-5 rounded-xl border border-border shadow-lg dark:shadow-none">
        <h3 className="font-bold text-foreground mb-4">Monthly Revenue</h3>
        <Chart
          type="bar"
          height={280}
          options={revenueOptions}
          series={[
            { name: 'Memberships', data: overviewData.map((d: OverviewDataPoint) => d.revenue || 0) },
            { name: 'Store POS', data: overviewData.map((d: OverviewDataPoint) => d.storeRevenue || 0) },
          ]}
        />
      </div>

      <div className="bg-card p-5 rounded-xl border border-border shadow-lg dark:shadow-none col-span-1 md:col-span-2 lg:col-span-3">
        <h3 className="font-bold text-foreground mb-4">New Members Trend</h3>
        <Chart
          type="area"
          height={250}
          options={membersOptions}
          series={[
            { name: 'New Members', data: overviewData.map((d: OverviewDataPoint) => d.newMembers || 0) },
          ]}
        />
      </div>
    </div>
  );
}
