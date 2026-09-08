// RESPONSIBILITY: Renders the revenue distribution donut chart for Plans.
'use client';

import dynamic from 'next/dynamic';
import type { PlanRevenueRecord } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminPlansRevenueCharts({ data }: { data: PlanRevenueRecord[] }) {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      background: 'transparent',
    },
    labels: data.map((d) => d.planName),
    dataLabels: { enabled: false },
    stroke: { show: false },
    theme: { mode: 'dark' }, // Fallback to theme handling if needed
    legend: { position: 'right' },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString('en-IN')}`,
      },
    },
  };

  const chartSeries = data.map((d) => d.totalRevenue);

  if (data.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
        Revenue Distribution by Plan
      </h3>
      <div className="h-[250px] w-full flex justify-center">
        <Chart options={chartOptions} series={chartSeries} type="donut" height="100%" />
      </div>
    </div>
  );
}
