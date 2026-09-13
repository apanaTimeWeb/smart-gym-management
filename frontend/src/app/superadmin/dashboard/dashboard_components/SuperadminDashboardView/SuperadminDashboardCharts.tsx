import dynamic from 'next/dynamic';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import type { SaaSDashboardMetrics, RevenueChartData, GrowthChartData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SuperadminDashboardCharts({
  metrics,
  revenueChartData,
  growthChartData,
  timeMultiplier,
  mrrLabel
}: {
  metrics: SaaSDashboardMetrics;
  revenueChartData: RevenueChartData[];
  growthChartData: GrowthChartData[];
  timeMultiplier: number;
  mrrLabel: string;
}) {
  const chartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: revenueChartData.map((d: RevenueChartData) => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (val: number) => `₹${(val / 1000).toFixed(1)}k`,
      },
    },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const chartSeries = [{
    name: mrrLabel,
    data: revenueChartData.map((d: RevenueChartData) => Math.round(d.mrr * timeMultiplier)),
  }];

  const growthChartOptions = {
    ...chartOptions,
    colors: [CHART_COLORS.INFO],
    xaxis: {
      ...chartOptions.xaxis,
      categories: growthChartData.map((d: GrowthChartData) => d.month),
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (val: number) => val.toFixed(0),
      },
    },
  };

  const growthChartSeries = [{
    name: 'New Gyms',
    data: growthChartData.map((d: GrowthChartData) => d.gyms),
  }];

  const donutOptions = {
    chart: { type: 'donut' as const, background: 'transparent' },
    labels: (metrics.revenueByTier || []).map((t) => t.plan.toUpperCase()),
    colors: [CHART_COLORS.PRIMARY, CHART_COLORS.INFO, CHART_COLORS.WARNING, CHART_COLORS.SUCCESS, CHART_COLORS.DANGER],
    theme: { mode: 'dark' as const },
    stroke: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark' as const,
      y: { formatter: (val: number) => `₹${val.toLocaleString('en-IN')}` },
    },
    legend: { position: 'bottom' as const, labels: { colors: CHART_COLORS.TEXT_SECONDARY } },
  };
  const donutSeries = (metrics.revenueByTier || []).map((t) => Math.round(t.amount * timeMultiplier));

  const geoChartOptions = {
    chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.WARNING],
    plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } },
    dataLabels: {
      enabled: true,
      offsetX: 20,
      style: { fontSize: '12px', colors: [CHART_COLORS.TEXT_SECONDARY] },
      formatter: (val: number) => `₹${(val / 1000).toFixed(1)}k`
    },
    stroke: { show: true, width: 1, colors: ['transparent'] },
    xaxis: {
      categories: (metrics.revenueByGeography || []).map((g) => g.region),
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY }, formatter: (val: number) => `₹${(val / 1000).toFixed(0)}k` },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } } },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const, y: { formatter: (val: number) => `₹${val.toLocaleString('en-IN')}` } },
  };

  const geoChartSeries = [{
    name: 'Revenue',
    data: (metrics.revenueByGeography || []).map((g) => Math.round(g.revenue * timeMultiplier)),
  }];

  return (
    <>
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-foreground">{mrrLabel} Growth</h2>
          {metrics.arrDeltaPercent !== undefined && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${metrics.arrDeltaPercent >= 0 ? 'bg-success-bg text-success border border-success/20' : 'bg-danger-bg text-danger border border-danger/20'}`}>
              ARR Trend: {metrics.arrDeltaPercent > 0 ? '+' : ''}{metrics.arrDeltaPercent}%
            </span>
          )}
        </div>
        <div className="h-80 w-full">
          <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
        </div>
      </div>

      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-foreground mb-6">Gym Growth (New Signups)</h2>
        <div className="h-80 w-full">
          <Chart options={growthChartOptions} series={growthChartSeries} type="bar" height="100%" />
        </div>
      </div>

      <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-foreground mb-6">Revenue by Plan</h2>
        <div className="h-80 w-full flex items-center justify-center">
          {(metrics.revenueByTier?.length || 0) > 0 ? (
            <Chart options={donutOptions} series={donutSeries} type="donut" height="100%" />
          ) : (
            <div className="text-secondary text-sm">No revenue data by tier</div>
          )}
        </div>
      </div>

      <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-sm mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-foreground mb-6">Revenue by Geography</h2>
        <div className="h-80 w-full">
          {(metrics.revenueByGeography?.length || 0) > 0 ? (
            <Chart options={geoChartOptions} series={geoChartSeries} type="bar" height="100%" />
          ) : (
            <div className="flex h-full items-center justify-center text-secondary text-sm">No geographical revenue data available</div>
          )}
        </div>
      </div>
    </>
  );
}
