// RESPONSIBILITY: Renders dynamic charts visualizing staff performance metrics (sessions, additions).
'use client';

import dynamic from 'next/dynamic';
import type { StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

// Rule 15: Lazy loading heavy chart libraries
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AdminHrPerformanceChartsProps {
  data: StaffPerformanceRecord[];
}

export default function AdminHrPerformanceCharts({ data }: AdminHrPerformanceChartsProps) {
  // Aggregate Top 5 Trainers by Sessions
  const topTrainers = [...data]
    .filter((s) => s.role === 'Trainer')
    .sort((a, b) => b.sessionsTaken - a.sessionsTaken)
    .slice(0, 5);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: topTrainers.map((t) => t.name),
      labels: {
        style: { colors: 'var(--text-secondary)' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-foreground)', fontWeight: 600 },
      },
    },
    colors: ['var(--primary)'],
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    theme: {
      mode: 'dark', // Assuming dark theme based on UI context, or let CSS variables handle it
    },
  };

  const chartSeries = [
    {
      name: 'Sessions Taken',
      data: topTrainers.map((t) => t.sessionsTaken),
    },
  ];

  if (topTrainers.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
        Top Trainers by Sessions
      </h3>
      <div className="h-[250px] w-full">
        <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
      </div>
    </div>
  );
}
