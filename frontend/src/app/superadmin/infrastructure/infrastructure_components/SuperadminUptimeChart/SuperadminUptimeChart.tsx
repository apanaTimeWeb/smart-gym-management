// RESPONSIBILITY: Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component.
'use client';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { formatDecimal } from '@/lib/formatters';
import { useSuperadminInfrastructureUptime } from '@/app/superadmin/infrastructure/infrastructure_utils/useSuperadminInfrastructureUptime';
import { CHART_COLORS } from '@/app/superadmin/superadmin_infrastructure/SuperadminChartConstants';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminUptimeChart() {
  const query = useSuperadminInfrastructureUptime();
  const { series, options } = useMemo(() => {
    const points = query.data?.data ?? [];
    return {
      series: [{ name: 'Uptime %', data: points.map((point) => ({ x: new Date(point.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), y: Number(formatDecimal(point.uptimePercent, 2)) })) }],
      options: {
        chart: { type: 'area', height: 250, toolbar: { show: false }, zoom: { enabled: false }, background: 'transparent', fontFamily: 'inherit' },
        colors: [CHART_COLORS.SUCCESS],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { type: 'category', labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } }, axisBorder: { show: false }, axisTicks: { show: false }, tooltip: { enabled: false } },
        yaxis: { min: 95, max: 100, labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => `${value}%` } },
        grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } } },
        theme: { mode: 'dark' },
        tooltip: { theme: 'dark', y: { formatter: (value: number) => `${value}%` } },
      } as ApexCharts.ApexOptions,
    };
  }, [query.data?.data]);
  if (query.isPending) return <div className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-busy="true" />;
  if (query.isError) return <div role="alert" className="rounded-xl border border-danger/30 bg-danger-bg p-6 text-danger">Unable to load historical uptime. <button type="button" onClick={() => void query.refetch()} className="ml-1 underline underline-offset-2">Retry</button></div>;
  return <div className="rounded-xl border border-border bg-card p-6"><div className="mb-4"><h2 className="text-xl font-bold text-primary">Historical Uptime (24h)</h2><p className="mt-1 text-sm text-secondary">Platform availability over the last 24 hours</p></div>{series[0]?.data.length ? <div className="h-64 w-full"><ReactApexChart options={options} series={series} type="area" height="100%" width="100%" /></div> : <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-input text-sm text-secondary">No uptime history available.</div>}</div>;
}
