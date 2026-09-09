'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TrainerDashboardGoalTrendChart() {
  const { stats } = useDashboardContext();

  if (!stats?.goalCompletionTrend || stats.goalCompletionTrend.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No goal completion data available.</p>
      </div>
    );
  }

  const categories = stats.goalCompletionTrend.map(d => d.month);
  const seriesData = stats.goalCompletionTrend.map(d => d.rate);

  const options: ApexOptions = {
    chart: { type: 'area', toolbar: { show: false }, sparkline: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0, stops: [0, 95] },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: 'hsl(var(--secondary))', fontSize: '11px' } },
    },
    yaxis: {
      labels: {
        formatter: (v) => `${v}%`,
        style: { colors: 'hsl(var(--secondary))', fontSize: '11px' },
      },
    },
    grid: { borderColor: 'hsl(var(--border))', strokeDashArray: 4, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
    colors: ['#3b82f6'],
    tooltip: {
      theme: 'dark',
      y: { formatter: (v) => `${v}%` },
    },
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-2">Goal Completion Trend</h3>
      <Chart
        type="area"
        series={[{ name: 'Completion Rate', data: seriesData }]}
        options={options}
        height={240}
      />
    </div>
  );
}
