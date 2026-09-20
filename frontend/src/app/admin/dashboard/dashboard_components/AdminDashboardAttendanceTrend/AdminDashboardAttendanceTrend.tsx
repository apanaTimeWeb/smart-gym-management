"use client";
// RESPONSIBILITY: Renders the cross-branch daily attendance trend chart using ApexCharts.

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_layout/admin_utils/AdminChartThemeTokens';
import { CalendarCheck } from 'lucide-react';
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboardAttendanceTrend() {
  const { stats } = useAdminDashboardLogic();
  const attendance = stats?.attendanceTrend ?? [];
  const labels = attendance.map((item) => new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short' }));
  const values = attendance.map((item) => item.count);
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
    },
    colors: [ADMIN_CHART_THEME.primary],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '55%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: labels,
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' },
        formatter: (v) => String(Math.round(v)),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (v) => `${v} check-ins` },
    },
  };

  const series = [{ name: 'Check-ins', data: values }];
  const total = values.reduce((sum: number, value: number) => sum + value, 0);
  const avg = values.length ? Math.round(total / values.length) : 0;

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-info-bg rounded-xl">
            <CalendarCheck size={18} strokeWidth={2} className="text-info" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">Weekly Attendance</h2>
            <p className="text-xs text-secondary">Cross-branch daily check-ins</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{total.toLocaleString('en-IN')}</p>
          <p className="text-xs text-secondary">Avg {avg}/day</p>
        </div>
      </div>
      {values.length > 0 ? <ReactApexChart options={options} series={series} type="bar" height={220} /> : <div className="h-56 flex items-center justify-center text-sm text-secondary">No attendance trend data available.</div>}
    </div>
  );
}