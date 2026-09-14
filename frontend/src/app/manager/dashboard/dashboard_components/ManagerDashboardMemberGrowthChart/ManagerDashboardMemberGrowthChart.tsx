'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/useManagerDashboardQueries';
import { useManagerDashboardStore } from '@/app/manager/dashboard/dashboard_store/useManagerDashboardStore';
import { formatKPI } from '@/lib/formatters';
import { Loader2 } from 'lucide-react';
import type { DashboardGrowthChartData } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" /></div>,
});

export default function ManagerDashboardMemberGrowthChart() {
  const { timeRange } = useManagerDashboardStore();
  const { data: stats } = useDashboardStatsQuery(timeRange);
  
  if (!stats?.memberGrowth || stats.memberGrowth.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No member growth data available.</p>
      </div>
    );
  }

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#0ea5e9'],
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: stats.memberGrowth.map((d: DashboardGrowthChartData) => d.month),
      labels: { style: { colors: '#A1A1AA', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: '#A1A1AA', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false },
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-4">Member Growth</h3>
      <div className="flex-1 w-full h-[220px]">
        <Chart
          type="bar"
          height={220}
          options={options}
          series={[
            { name: 'New Members', data: stats.memberGrowth.map((d: DashboardGrowthChartData) => d.count || 0) },
          ]}
        />
      </div>
    </div>
  );
}
