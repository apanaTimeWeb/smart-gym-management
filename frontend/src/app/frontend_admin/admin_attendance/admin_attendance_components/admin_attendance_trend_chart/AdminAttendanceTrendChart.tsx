"use client";
// RESPONSIBILITY: Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations.
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminAttendanceTrendChart renders the admin attendance trend chart UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceTrendChart: Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations.
 * @dependencies Consumes AdminLayoutChartThemeTokens, useAdminAttendanceLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceTrendChart() {
  const t = useTranslations();

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
      y: { formatter: (val: number) => t('attendance.admin_attendance_trend_chart.tooltip_checkIns', { count: val }) },
    },
  };

  const series = [{ name: t('attendance.admin_attendance_trend_chart.series_checkIns'), data: trend.map((t) => t.count) }];

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-primary">{t('attendance.admin_attendance_trend_chart.text_a70e43d730')}</p>
          <p className="text-xs text-secondary mt-0.5">{t('attendance.admin_attendance_trend_chart.text_7be3443a0f')}</p>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
}