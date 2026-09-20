"use client";
// RESPONSIBILITY: Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations.

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_layout/admin_utils/AdminChartThemeTokens';
import { useAdminAttendanceLogic } from '@/app/admin/attendance/attendance_context/useAdminAttendanceLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminAttendanceTrendChart() {
  const { trend } = useAdminAttendanceLogic();

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: '55%' },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: trend.map((t) => t.date),
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    colors: [ADMIN_CHART_THEME.primary],
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `${val} check-ins` },
    },
  };

  const series = [{ name: 'Check-Ins', data: trend.map((t) => t.count) }];

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-primary">Weekly Attendance Trend</p>
          <p className="text-xs text-secondary mt-0.5">Daily check-in count for the current week</p>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
}