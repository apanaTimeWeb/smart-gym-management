"use client";
// RESPONSIBILITY: Renders dynamic charts visualizing staff performance metrics (sessions, additions).

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_utils/AdminChartThemeTokens';
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
        style: { colors: ADMIN_CHART_THEME.textSecondary },
      },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textPrimary, fontWeight: 600 },
      },
    },
    colors: [ADMIN_CHART_THEME.primary],
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    theme: { mode: 'dark' },
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
      <div className="h-64 w-full">
        <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
      </div>
    </div>
  );
}